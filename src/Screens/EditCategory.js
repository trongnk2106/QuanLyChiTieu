import React, {useState, useEffect} from 'react'
import {
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Alert, Modal, Pressable, 
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



const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})

const EditCategory = ({ navigation, route }) => {

  const {iconEdit} = route.params;
  const [iconName, setIconName] = useState('help');
  const [iconColor, setIconColor] = useState('#A8ADAB');
  // const [color, setColor] = useState('');

  const onColorChange = iconColor => {
    setIconColor(iconColor);
  };

  const data = [
    { label: 'Chi phí' },
    { label: 'Thu nhập' }
  ];

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {{backgroundColor: '#ffffff', flex:1}}>

      {/* header */}
      <View style = {styles.header}>
        <View style = {{ flexDirection: 'row', margin: 20, marginTop: 25}}>

          <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.navigate('Danh mục')}}>
            <Ionicons name = 'arrow-back' color = 'white' size={25}/>
          </Pressable>

          <Text style = {{fontSize:18, fontWeight:'bold', color:'white', marginRight:5}}>
              Chỉnh sửa danh mục
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
              //name={iconName}
              name={iconEdit.name}
              type={iconEdit.type}
              color={iconEdit.iconColor}
              size={20}
            />
          <TextInput
            style={styles.inputText}
            defaultValue={iconEdit.title}
            // placeholder='Tên danh mục'
            // onChangeText={}
          />
        </View>

        <View style={{marginLeft: 45}}>
          <RadioButtonRN 
              data={data}
              box={false}
              activeColor='#54b38a'
              // selectedBtn={(e) => console.log(e)}
          />
        </View>
        {/* end of danh muc */}

        {/* ke hoach chi tieu */}
        <Text style={styles.title}>Kế hoạch chi tiêu</Text>
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
        </View>
        {/* end of ke hoach chi tieu */}

        {/* bieu tuong */}
        <Text style={styles.title}>Biểu tượng</Text>
        <View style={{
          flexDirection:'row', 
          flexWrap:'wrap', 
          justifyContent:'space-between', 
          alignContent: 'flex-start',
          marginTop: 10,
          marginHorizontal: 20,
          maxWidth: 360}}>

          <Icon reverse type='ionicon' size={30}
            name='leaf'
            color={iconColor}
            onPress={() => setIconName('leaf')}
          />
          <Icon reverse type='ionicon' size={30}
            name='library'
            color={iconColor}
            onPress={() => setIconName('library')}
          />
          <Icon reverse type='ionicon' size={30}
            name='paw'
            color={iconColor}
            onPress={() => setIconName('paw')}
          />
          <Icon reverse type='ionicon' size={30}
            name='hammer'
            color={iconColor}
            onPress={() => setIconName('hammer')}
          />
          <Icon reverse type='ionicon' size={30}
            name='earth'
            color={iconColor}
            onPress={() => setIconName('earth')}
          />
        </View>
        {/* end of bieu tuong */}

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
      <TouchableOpacity style={styles.floatingButton}>
          <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Lưu</Text>
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


export default EditCategory;