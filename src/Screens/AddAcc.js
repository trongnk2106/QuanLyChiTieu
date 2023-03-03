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
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { onChange, Value } from 'react-native-reanimated';
import { Icon, Button } from 'react-native-elements'
import SwitchButton from "@freakycoder/react-native-switch-button";
import { Agenda, Calendar } from 'react-native-calendars';
import Categories from './Categories'


import ColorPicker from 'react-native-wheel-color-picker';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const AddAcc = ({navigation}) => {

    const [money, setMoney] = useState(0)
    const [account, setAccount] = useState('')
    const [iconName, setIconName] = useState('help');
    const [iconColor, setIconColor] = useState('#A8ADAB');
    const [wallet, setWallet] = useState([])

    const onColorChange = iconColor => {
      setIconColor(iconColor);
    };


    const GetWallet = async()=>{
      //Get Danh sách Ví: ID ví, Tên Ví, Tiền ban đầu lúc tạo ví
      await db.transaction(async (tx) =>{
          await tx.executeSql(
            "SELECT * FROM DS_VI",
            [],
            (tx, results) =>{
              // console.log('o trong vi')
              // console.log(results)
              var sum = 0
              var List = []
              var vi = {"ID": '', "Tien": 0, label: '', 'SoDu': 0}
              for (let i = 0; i < results.rows.length; i++){
                  var a = results.rows.item(i)
                  // console.log(a)
                  List.push(a)
                  
                  // console.log(a)
              }
              setWallet(List)
            }
          )
      })
    }

    // console.log(wallet)

    // GetWallet()
    useEffect(() => {
      GetWallet()

    }, [])

    const setData = async () =>{
      if (account.length == 0 || money == 0 ){
          Alert.alert('Vui lòng điền đầy đủ thông tin trước khi thêm giao dịch!!!')
      }
      else {
          // getID()
          var MaVi = new Date().toString()
       
          MaVi =MaVi.replaceAll(' ','')
          MaVi ='VI' + MaVi.replaceAll(':','').slice(6,17)
          var Name_Vi = account
          // var newMoney = Tien
          // if (isIncome == false){
          //   var newMoney = -Tien
          // }
          // console.log(1)
          // console.log(MaVi,Name_Vi,money)
          try{
            await db.transaction(async (tx)=> {
              await tx.executeSql(
              "INSERT INTO DS_VI (MaVi,TenVi,Tien) VALUES(?,?,?)",
              [MaVi,Name_Vi,money],

              
              (tx, results) => {
                // console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Acc'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else alert('Registration Failed');
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






  

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {{backgroundColor: '#ffffff', flex:1}}>
        <ScrollView>
            <View style = {styles.header}>
                <View style = {{flexDirection:'row', marginTop:30, marginLeft:10}}>
                    <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack()}}>
                        <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>
                    <Text style = {{color:'white', fontSize:20}}> Them tai khoan</Text>
                </View>
            </View>
            <View style = {{ 
                flexDirection: 'row', 
                marginLeft: Dimensions.get('window').width/3,
                marginTop:20,
                }}>
                <TextInput
                    style={styles.inputText2}
                    placeholder='0'
                    keyboardType="numeric"
                    onChangeText={(newmoney) => setMoney(newmoney)}
                />

                    <Text style={{fontSize: 15, color:'#4CA07C', marginTop:20}}>VNĐ </Text>
            </View>
            
            <Text style={styles.title}>Ten tai khoan</Text>
            <View style = {{ 
                flexDirection: 'row', 
                marginLeft: 18,
                }}>
                <TextInput
                    style={styles.inputText}
                    placeholder='Nhap ten tai khoan'
                    onChangeText={(newacc) => setAccount(newacc)}

                />

            </View>
          
        <View style = {{marginTop:300}}>
            <TouchableOpacity style={styles.floatingButton}
            onPress = {() => setData()}>
                 <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Tạo</Text>
            </TouchableOpacity>
            </View>  
       
        </ScrollView>
        
       
    </View>

</TouchableWithoutFeedback>
    )


}

const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.15,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
    },
    inputText2: {
        fontSize: 18, 
        borderBottomWidth: 2,
        borderBottomColor:'#94B4A8',
        width: Dimensions.get('window').width - 320,
        marginRight: 5,
        textAlign:'center',
      },

      inputText: {
        fontSize: 18, 
        borderBottomWidth: 2,
        borderBottomColor:'#94B4A8',
        width: Dimensions.get('window').width - 100,
        marginRight: 10,
        marginBottom: 10,
      },

      title: {
        marginLeft: 18,
        fontSize: 15,
        marginTop: 40
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

export default AddAcc;