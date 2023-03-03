import React, {useState, useEffect} from 'react'
import {
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Alert, Modal, Pressable, 
  // Button, 
  SafeAreaView, 
  FlatList, 
  Keyboard,
  TextInput} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { onChange } from 'react-native-reanimated';
import { Icon, Button } from 'react-native-elements'
import RadioButtonRN from 'radio-buttons-react-native';
import ColorPicker from 'react-native-wheel-color-picker';
import { ListIcon } from '../Small_Components/Icon';
import Add from './Add';



const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})

const CreateCategory = ({ navigation }) => {

  const [iconName, setIconName] = useState('help');
  const [iconType, setIconType] = useState('ionicon')
  const [iconColor, setIconColor] = useState('#A8ADAB');
  const [icon, setIcon] = useState('KhacThu')
  const [color, setColor] = useState('');
  const [isIncome, setIsIncome] = useState('')
  const [tenDM, setTenDM] = useState('')
  const onColorChange = iconColor => {
    setIconColor(iconColor);
  };

  const data = [
    { label: 'Chi phí', thu: 0 },
    { label: 'Thu nhập', thu: 1 }
  ];
  const AddCate = async () =>{
    if (isIncome == null || tenDM == null){
        Alert.alert('Vui lòng điền đầy đủ thông tin trước khi thêm giao dịch!!!')
    }
    else {
        // getID()
        var MaDM = new Date().toString()
        MaDM =MaDM.replaceAll(' ','')
        MaDM ='DM' + MaDM.replaceAll(':','').slice(0,17)
        console.log(1)
        try{
          await db.transaction(async (tx)=> {
            await tx.executeSql(
            "INSERT INTO DANHMUC (MaDanhMuc, TenDanhMuc, ThuChi, Color, Icon) VALUES(?,?,?,?,?)",
            [MaDM, tenDM, isIncome, iconColor, icon],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'Thêm danh mục thành công',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.navigate('Categories'),
                    },
                  ],
                  {cancelable: false},
                );
              } else Alert.alert('Hệ thống đang xử lý. Vui lòng thử lại sau.');
            },
            )
          })
        }
        catch (error){
          console.log('error')
        }
        
        // setModifine(!modifine)
    }
}
  let listItemView = (item) => {
    return (
        <View style={{flexDirection:'column', marginHorizontal:8}}>
          <Button
            buttonStyle={{
              backgroundColor: 'transparent',
              width: 80, height: 80,
              borderRadius: 10,
            }}
            icon={
              <Icon
                reverse 
                type={item.type}
                size={30}
                name={item.name}
                color={iconColor}
              />
            }
            onPress={() => {setIconName(item.name), setIconType(item.type), setIcon(item.title)}}

          />
        </View>
      );
    };
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {{backgroundColor: '#ffffff', flex:1}}>

      {/* header */}
      <View style = {styles.header}>
        <View style = {{ flexDirection: 'row', margin: 20, marginTop: 25}}>

          <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack()}}>
            <Ionicons name = 'arrow-back' color = 'white' size={25}/>
          </Pressable>

          <Text style = {{fontSize:18, fontWeight:'bold', color:'white', marginRight:5}}>
              Tạo danh mục
          </Text>
                  
        </View>
      </View>
      {/* end of header */}

      <ScrollView>
        {/* danh muc */}
        <View style = {{ 
          flexDirection: 'row', 
          marginTop: 10,
          marginLeft: 5
        }}>

          <Icon
              reverse
              name={iconName}
              type={iconType}
              color={iconColor}
              size={20}
            />
          <TextInput
            style={styles.inputText}
            placeholder='Tên danh mục'
            onChangeText={(newTen)=> setTenDM(newTen)}
          />
        </View>

        <View style={{marginLeft: 45}}>
          <RadioButtonRN 
              data={data}
              box={false}
              activeColor='#54b38a'
              selectedBtn={(e) => setIsIncome(e.thu)}
          />
        </View>
        {/* end of danh muc */}

        {/* ke hoach chi tieu */}
        {/* <Text style={styles.title}>Kế hoạch chi tiêu</Text>
        <View style = {{ 
          flexDirection: 'row', 
          marginLeft: 18,
        }}>
          <TextInput
            style={styles.inputText2}
            placeholder='0'
            keyboardType="numeric"
            // onChangeText={}
          />

          <Text style={{fontSize: 15, color:'#4CA07C', marginTop:10}}>VNĐ mỗi tháng</Text>
        </View> */}
        {/* end of ke hoach chi tieu */}

        {/* bieu tuong */}
        <Text style={styles.title}>Biểu tượng</Text>
        <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <FlatList 
                        contentContainerStyle={{justifyContent:'center', alignItems:'flex-start', alignSelf:'center'}}
                        horizontal={false}
                        numColumns = {4}
                        data={ListIcon}
                        scrollEnabled= {false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => listItemView(item)}
                    />
                 </View>
      </SafeAreaView>

        {/* mau sac */}
        <Text style={styles.title}>Màu sắc</Text>
        <View style={{marginBottom: 70, paddingHorizontal: 30}}>
          <ColorPicker
            color={iconColor}
            onColorChange={(iconColor) => onColorChange(iconColor)}
            // onColorChangeComplete={color => alert(`Color selected: ${color}`)}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
        </View>
        {/* end of mau sac */}

      </ScrollView>
      <TouchableOpacity style={styles.floatingButton} onPress = {()=>AddCate()}>
          <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Tạo</Text>
      </TouchableOpacity>

    </View>

    </TouchableWithoutFeedback>



  )
}

const styles = StyleSheet.create({
    header: {
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    title: {
      marginLeft: 18,
      // marginBottom: 5,
      fontSize: 15,
      marginTop: 40
    },
    inputText: {
      fontSize: 18, 
      borderBottomWidth: 2,
      borderBottomColor:'#94B4A8',
      width: Dimensions.get('window').width - 100,
      marginRight: 10,
      marginBottom: 10,
    },
    inputText2: {
      fontSize: 18, 
      borderBottomWidth: 2,
      borderBottomColor:'#94B4A8',
      width: Dimensions.get('window').width - 320,
      marginRight: 5,
    },
    floatingButton: {
      width: 160,  
      height: 40,   
      borderRadius: 30,            
      backgroundColor: '#54b38a',                                    
      position: 'absolute',        
      flexDirection: "row",                                  
      bottom: 15,               
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    }
})


export default CreateCategory;