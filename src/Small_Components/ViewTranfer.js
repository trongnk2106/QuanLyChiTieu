
import React, {useState, useEffect} from 'react'

import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const ViewTranfer = ({route, navigation}) => {

    const [hist, setHist] = useState([])
    const [listvi, setListvi] = useState([])

    const {MaGD, FrAcc, ToAcc, Money, date, ghichu} = route.params
    console.log(MaGD, FrAcc, ToAcc, Money, date, ghichu)
    const GetHistory = async()=>{
        await db.transaction(async (tx) =>{
            await tx.executeSql(
              "SELECT * FROM DS_VI",
              [],
              (tx, results) =>{
                var mapVi = []
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    mapVi.push(a)
                }
                setListvi(mapVi)
              }
            )
        })
    }

    const GetTenVibyMavi = (ID) => {
        for(i of listvi){
            if(i.MaVi === ID){
                return i.TenVi
            }
        }
    }
    
    
    

    const Delete = async () =>{
        // console.log(data1.MaGD)    
        await db.transaction(async (tx) =>{
          await tx.executeSql(
            `DELETE FROM GD_TK WHERE MaGDTK = ?`,
            [MaGD],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Giao dịch đã được xóa',
                    [
                      {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Acc'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  Alert.alert('Hệ thống đang xử lý');
                }
            }
            )
        })
    }

    

    useEffect(() => {
        GetHistory()
    },[])
  


  
    return (
       <View style= {{backgroundColor:'#edece8',flex:1}}>
            <View style = {styles.header}>
                <Pressable style = {{paddingRight: 30, size: 30, marginTop:20}} onPress={() => {navigation.goBack(null)}}>
                                <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>
                <Text style = {{color:'white', fontSize: 20, marginTop:20}}> Chuyen khoan</Text>
                <Pressable style = {{marginTop : 20, size: 30}} onPress={() => navigation.navigate('EditHistory', {MaGD:MaGD, FrAcc:FrAcc, ToAcc:ToAcc, Money:Money, date:date, GhiChu:ghichu})}>
                        <Ionicons name ='md-pencil' color='white' size={30} style={{marginRight:10}}/>
                </Pressable>
            </View>

            <View>
                <Text style = {styles.title}>Chuyen tu tai khoan</Text>
                <Text style = {styles.text_}>{GetTenVibyMavi(FrAcc)}</Text>
                <Text style = {styles.title}> Chuyen vao tai khoan</Text>
                <Text style = {styles.text_}> {GetTenVibyMavi(ToAcc)}</Text>
                <Text style = {styles.title}> So tien chuyen</Text>
                <Text style = {styles.text_}> {new Intl.NumberFormat().format(Money)} VND</Text>
                <Text style = {styles.title}> Ngay </Text>
                <Text style = {styles.text_}> {date}</Text>
            </View>

            <View style = {{marginTop: 40, marginLeft:18}}>
                <Pressable onPress = {() => Delete()}>
                    <Text style ={{fontSize:18, color: 'red'}}> XOA </Text>
                </Pressable>
            </View>

       
       </View>
    )

}


const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        flexDirection:'row',
        justifyContent:'space-between'

    },
    title: {
        color : '#737875',
        marginLeft: 18,
        fontSize: 15,
        marginTop: 40
      },
      text_ :{
        color:'black',
        fontSize:16,
        marginLeft:18
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
        alignSelf: 'flex-end',
      },
      floatingButton_2: {
        width: 160,  
        height: 40,   
        borderRadius: 30,            
        backgroundColor: 'red',                                    
        position: 'absolute',        
        flexDirection: "row",                                  
        bottom: 15,               
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'flex-start',
      },
      showContainerCenter:{
        backgroundColor : 'white',
        // flexDirection:'column',
        // marginTop : Dimensions.get('window').height * 0.2,
        
        width : Dimensions.get('window').width ,
        height : Dimensions.get('window').height * 0.8,
        borderRadius:20,
        marginTop: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignItems:'center'
    },

})
export default ViewTranfer;