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
  TextInput,} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { onChange } from 'react-native-reanimated';
import { Icon, Button } from 'react-native-elements'
import { Agenda, Calendar } from 'react-native-calendars';
import RadioButtonRN from 'radio-buttons-react-native';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import {ListIcon, getItem} from '../Small_Components/Icon';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const EditTransaction = ({route, navigation }) => {
    const {data} = route.params
    console.log(data)
    // const {DataListVi, MaVi} = route.params
    const [ListVi, setListVi] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalView, SetModalViewVisible] = useState(false)
    const [isIncome, setIsIncome] = useState(data.ThuChi);
    const [Tien, setTien] = useState(data.Tien);
    const [WalletChoose, setWalletChoose] = useState(data.MaVi);
    const [Date_s, setdate] = useState(data.Date)
    const [MaDanhMuc, setMadanhMuc] = useState(data.MaDanhMuc)
    const [GhiChu, setGhiChu] = useState('')
  
  // const [Date, setdate] = useState('');
  // const [Category, setCategory] = useState('');

  // const [activeButton, setActiveButton] = useState(false);
  // const [selected, setSelected] = useState('');
  
  const [actionTriggered, setActionTriggered] = useState('');

  // const setSelectedCategory = (category) => {
  //   if (category !== selected) setSelected(category);
  //   else setSelected('');
  // };
  const [Categories, setCategories] = useState([])
  const GetCategories = async()=>{
    //Get Danh s??ch V??: ID v??, T??n V??, Ti???n ban ?????u l??c t???o v??
    await db.transaction(async (tx) =>{
        await tx.executeSql(
          "SELECT * FROM DANHMUC",
          [],
          (tx, results) =>{
            var sum = 0
            var List = []
            var vi = {"ID": '', "Tien": 0, label: '', 'SoDu': 0}
            for (let i = 0; i < results.rows.length; i++){
                var a = results.rows.item(i)
                List.push(a)
                
                // console.log(a)
            }
            setCategories(List)
          }
        )
    })
  }
  const GetListWallet = async()=>{
    var List = [{"MaVi" : 'Vi00','TenVi': 'V?? T???ng' ,label :'V?? t???ng', "Tien": 0, "SoDu": 0 }]
    //Get Danh s??ch V??: ID v??, T??n V??, Ti???n ban ?????u l??c t???o v??
    await db.transaction(async (tx) =>{
        await tx.executeSql(
          "SELECT * FROM DS_VI",
          [],
          (tx, results) =>{
            var sum = 0
            var vi = {"ID": '', "Tien": 0, label: '', 'SoDu': 0}
            for (let i = 0; i < results.rows.length; i++){
                var a = results.rows.item(i)
                vi.ID = a.MaVi
                a.label = a.TenVi
                vi.Tien = a.Tien
                sum += a.Tien
                a.SoDu = a.Tien
                List.push(a)
            }
            List[0].Tien = sum
            List[0].SoDu = sum
          }
        )
    })
    await db.transaction(async (tx) =>{
        await tx.executeSql(
          "SELECT MaVi, SUM(Tien) FROM GIAODICH GROUP BY MaVi",
          [],
          (tx, results) =>{
            var sum = 0
            for (let i = 0; i < results.rows.length; i++){
                var a = results.rows.item(i)
                console.log(a)
                sum += a["SUM(Tien)"]
                for (let i = 1; i < List.length; i++){
                    if (List[i].MaVi == a.MaVi)
                        List[i].SoDu = List[i].Tien + a["SUM(Tien)"]
                }
            }
            List[0].SoDu = List[0].Tien + sum
            console.log(List)
            setListVi(List)
          }
        )
    })
}
  const GetTenViByMaVi= (ID) =>{
    console.log(ID)
    if (ID == 'Vi00')
      return "Ch??a ch???n"
    if (ListVi.length > 0){
        for( let i = 0; i < ListVi.length; i++){
            if (ListVi[i].MaVi == ID)
                return ListVi[i].TenVi
        }
    }

}
  const getIcon =(x) =>{
    for (let  i = 0; i < ListIcon.length; i++){
      if (ListIcon[i].key == x)
        return ListIcon[i].img
    }
  }
  let listItemView = (item) => {
    return (
        <View style={{flexDirection:'column', marginHorizontal:8}}>
          <Button
            buttonStyle={{
              backgroundColor: MaDanhMuc == item.MaDanhMuc ? item.Color : 'transparent',
              width: 80, height: 80,
              borderRadius: 10,
            }}
            icon={
              <Icon
              reverse 
              type={getItem(item.Icon, ListIcon)[0]}
              size={30}
              name={getItem(item.Icon, ListIcon)[1]}
              color={item.Color}
              />
            }
            onPress={() => {
              // item.title == 'Xem th??m' ? navigation.navigate('ShowMoreCategories',{moneyType:isIncome,cateName:MaDanhMuc}) 
              //               : setMadanhMuc(item.title)
              item.Icon == 'Tao' ? navigation.navigate('CreateCategory') : setMadanhMuc(item.MaDanhMuc)
            }}
          />
          <Text style={{
            textAlign:'center', 
            marginTop: 1,
            marginBottom: 8, 
            color:item.Color,
            fontWeight:'bold'}}>{item.TenDanhMuc}</Text>
        </View>
    );
  };

  const showCate = (isIncome)=>{
    if (Categories.length > 0){
      var data = []
      for (let i = 0; i < Categories.length; i++){
        if (Categories[i].ThuChi == isIncome)
          data.push(Categories[i])
      }
      var x = {"Color": "#C0C0C0", "Icon": "Tao", "MaDanhMuc": "xxx", "TenDanhMuc": "T???o", "ThuChi": 1}
      data.push(x)
    }  
    return(
            <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <FlatList 
                        contentContainerStyle={{justifyContent:'center', alignItems:'flex-start', alignSelf:'center'}}
                        horizontal={false}
                        numColumns = {4}
                        data={data}
                        scrollEnabled= {false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => listItemView(item)}
                    />
                 </View>
            </SafeAreaView>
        )
    } 
  const test = ()=>{
    var x = new Date().toString()
    x =x.replaceAll(' ','')
    x ='GD' + x.replaceAll(':','').slice(0,17)
    console.log(x)
  }
  const UpdateData = async () =>{
    if (Date_s.length == 0 || Tien == 0 || WalletChoose.length == 0 || MaDanhMuc.length == 0 ||WalletChoose == 'Vi00'){
        Alert.alert('Vui l??ng ??i???n ?????y ????? th??ng tin tr?????c khi th??m giao d???ch!!!')
    }
    else {
        // getID()
        var newMoney = Tien
        if (isIncome == false){
          var newMoney = -Math.abs(Tien)
        }
        // console.log(1)
        try{
          await db.transaction(async (tx)=> {
            await tx.executeSql(
            "UPDATE GIAODICH set MaVi= ?, Tien= ?, Date= ?, MaDanhMuc= ?, GhiChu= ? WHERE MaGD = ?",
            [WalletChoose,newMoney,Date_s, MaDanhMuc, GhiChu, data.MaGD],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'You are Registered Successfully',
                  [
                    {
                      text: 'Ok',
                      onPress: () => navigation.goBack(),
                    },
                  ],
                  {cancelable: false},
                );
              } else Alert.alert('H??? th???ng ??ang x??? l??.');
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
  useEffect(()=>{
    // test()
    GetCategories()
    // showCate(true)
  }, [])
  const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            GetListWallet()
        }
    }, [isFocused])
  
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {{backgroundColor: '#ffffff', flex:1}}>
      {/* header */}
      <View style = {styles.header}>
        <View style = {{ flexDirection: 'row', margin: 20, marginTop: 25}}>

          <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack(null)}}>
            <Ionicons name = 'arrow-back' color = 'white' size={25}/>
          </Pressable>

          <Text style = {{fontSize:18, fontWeight:'bold', color:'white', marginRight:5}}>
                Ch???nh s???a giao d???ch   
          </Text>
                  
        </View>

        <View style = {{justifyContent:'space-between', flexDirection:'row', textAlignVertical:'center', paddingTop:5, marginBottom: 10}}>
                <TouchableOpacity
                  style = {{marginLeft:75}}
                  onPress = {() => setIsIncome(false)}
                >
                  { isIncome == false ? <Text style = {{fontSize:18, fontWeight:'bold', color:'white', textDecorationLine : 'underline'}}>CHI PH??</Text> 
                    : <Text style = {{color :'#EEEEEE', fontSize:18}}>CHI PH??</Text>}
                </TouchableOpacity>  

                <TouchableOpacity
                  style ={{marginRight:75}}   
                  onPress = {() => setIsIncome(true)} 
                >
                  { isIncome == true ? <Text style = {{fontSize:18, fontWeight:'bold', color:'white', textDecorationLine : 'underline',}}>THU NH???P</Text> 
                    : <Text style = {{color :'#EEEEEE', fontSize:18}}>THU NH???P</Text>}
                </TouchableOpacity> 
          </View>
      </View>
      {/* end of header */}

      <ScrollView>
      {/* money input */}
      <View style = {{ 
        flexDirection: 'row', 
        textAlign: 'center',
        marginLeft: 95,
        marginTop: 10,
      }}>
        <TextInput
          style={styles.inputText}
          value= {Math.abs(Tien).toString()}
          keyboardType="numeric"
          onChangeText={(newMoney) => setTien(newMoney)}/>

        <Text style={{fontSize: 25, color:'#4CA07C', marginTop:10}}>VN??</Text>

        <Pressable style = {{marginLeft:15, marginTop:15}} onPress={() => {navigation.navigate("Calculator")}}>
            <Ionicons name = 'calculator' color = '#8B9391' size={30}/>
        </Pressable>
      </View>
      {/* end of money input */}
      
      <TouchableOpacity
        style={styles.selectBtn}
        onPress={() => {
          setModalVisible(true);
          setActionTriggered('taikhoan');}}
      >
        <Text style={styles.title}>T??i kho???n</Text>
        <Text style={{marginLeft: 18, marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>{GetTenViByMaVi(WalletChoose)}</Text>   
      </TouchableOpacity>

      <Text style={styles.title}>Danh m???c</Text>
      {showCate(isIncome)}  
  
      <Text style={styles.title}>Ng??y</Text>
      <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {setModalVisible(true);
              setActionTriggered('calendar');}}
      >
          <Text style={{marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>{Date_s}</Text>

          <AntDesign
              name="calendar"
              size={30}
              color="#8B9391"
          />
      </TouchableOpacity>

      <Text style={styles.title}>Ghi ch??</Text>
      <TextInput
          style = {styles.noteText}
          placeholder='Add Note (Optional)'
          // multiline={true}
          // numberOfLines={15}
          onChangeText={newghichu => setGhiChu(newghichu)}
          defaultValue={data.GhiChu}
      />

      {/* <Text style={styles.title}>???nh</Text> */}


      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        transparent={true}
      >
        {actionTriggered === 'taikhoan' ?
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Text style = {{marginLeft : 15, marginTop :10, fontSize:20}}>Chon tai khoan</Text>
            <ScrollView>
                <View>
                    <RadioButtonRN 
                        data = {ListVi}
                        selectedBtn = {(e) => {console.log(e.MaVi)
                        setWalletChoose(e.MaVi)}}
                            />
                </View>
            </ScrollView>
            <Pressable onPress = {() => setModalVisible(!modalVisible)}>
                                            <Text style = {{fontSize:15, color:'green', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10}}> Chon </Text>
                                        </Pressable>              
            {/* <View style={styles.row}>
              <TouchableOpacity 
                  style={styles.doneButton} 
                  onPress = {() => setModalVisible(!modalVisible)}
              >
                <Text style={{color:'#FFFFFF'}}>Done</Text>
              </TouchableOpacity>
            </View>    */}
          </View>
        </View> 

        :  actionTriggered === 'calendar' ?

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Calendar style={{borderRadius: 15}}
                onDayPress={(day) => {
                    setdate(day.dateString)
                }}
                onDayLongPress={(day) => console.log('onDayLongPress', day) }
                onMonthChange={(date) => console.log('onMonthChange', date) }
                onPressArrowLeft={(goToPreviousMonth) => {
                console.log('onPressArrowLeft'); goToPreviousMonth();
                }}
                onPressArrowRight={(goToNextMonth) => {
                console.log('onPressArrowRight'); goToNextMonth();
                }}
                markedDates={{
                    [Date_s] : {selected: true, marked: true, selectedColor: '#466A8F'}
                }}
            />

            <TouchableOpacity 
                style={styles.doneButton2} 
                onPress = {() => setModalVisible(!modalVisible)}>
                <Text style={{color:'#FFFFFF'}}>Done</Text>
            </TouchableOpacity>
                             

          </View>
        </View>
        
        : null }
      
      </Modal>

      </ScrollView>


      <TouchableOpacity style={styles.floatingButton}
      onPress = {()=>UpdateData()}
      >
          <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>L??u</Text>

      </TouchableOpacity>
      
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    header: {
        height : Dimensions.get('window').height * 0.14,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    inputText: {
      fontSize: 25, 
      borderBottomWidth: 2,
      borderBottomColor:'#4CA07C',
      width: 125,
      marginRight: 5,
      marginBottom: 30,
      textAlign:'center',
    },
    title: {
      marginLeft: 18,
      marginBottom: 5,
      fontSize: 15,
      marginTop: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      backgroundColor: "rgba(0,0,0, 0.4)",
    },
    modalView: {
      backgroundColor: "#fff",
      width: Dimensions.get("screen").width - 40,
      height: Dimensions.get("screen").height - 500,
      borderRadius: 15
    },
    doneButton: {
      backgroundColor: "#54b38a",
      padding: 10,
      width: 100,
      flexDirection: "row",
      justifyContent: 'center',
      borderRadius: 6,
      alignSelf: 'flex-end',
      marginTop: 270,
      marginRight: 18
    },
    doneButton2: {
      backgroundColor: "#466A8F",
      padding: 10,
      width: 100,
      flexDirection: "row",
      justifyContent: 'center',
      borderRadius: 6,
      alignSelf: 'flex-end',
      marginTop: 20,
      marginRight: 16
    },
    selectButton: {
      width: Dimensions.get("screen").width-40,
      borderBottomWidth: 0.8,
      borderBottomColor:'#4CA07C',
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: 20,
    },
    noteText: {
      width: Dimensions.get("screen").width-40,
      borderBottomWidth: 0.8,
      borderBottomColor:'#4CA07C',
      marginLeft: 20,
      marginBottom: 85
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


export default EditTransaction;