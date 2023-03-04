
import React, {useState, useEffect} from 'react'

import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const Transfer_History = ({route, navigation}) => {

    const [hist, setHist] = useState([])
    const [listvi, setListvi] = useState([])

    // const {TenTk, money} = route.params
    // // console.log(TenTk, money)
    // const [changeMoney, setChangeMoney] = useState(money)
    // const [nameAcc, setNameAcc] = useState(TenTk)

    const GetHistory = async()=>{
       
        await db.transaction(async (tx) =>{
            await tx.executeSql(
              "SELECT * FROM GD_TK",
              [],
              (tx, results) =>{
                var sum = 0
               
                var temp_list= []
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    console.log(a)
                    temp_list.push(a)
             
                }
                setHist(temp_list)
                
              }
            )
        })

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
    
    useEffect(() => {
        GetHistory()
    },[])
    // const {TKChuyen, TKNhan, TGian,sotien} = route.params
    // console.log(TKChuyen, TKNhan, TGian, sotien)


    const Display_View = () => {


        var output=[]

        for(let i of hist){
            const itemview= (
                <View>
                    <Pressable onPress = {() => navigation.navigate('ViewTranfer', {MaGD:i.MaGDTK, 
                    FrAcc : i.FromAcc, ToAcc : i.ToAcc, Money : i.Money, date : i.Date, ghichu : i.GhiChu
                    })}>
                        <View style = {{flexDirection:'row', justifyContent:'space-between', marginHorizontal:15, marginTop:10}}>

                            <View style = {{marginTop:10}}>
                                {console.log(i.MaGDTK)}
                            
                                    <Text style = {{color:'black',marginBottom:3}}> {i.Date}</Text>
                                    <View style={{alignItems:'center'}}>
                                        <Text style = {{color:'red'}}> {GetTenVibyMavi(i.FromAcc)}</Text>
                                        <Ionicons name = 'arrow-down-outline' size = {20} style = {{marginVertical:2}}></Ionicons>
                                        <Text style = {{color:'green'}}> {GetTenVibyMavi(i.ToAcc)}</Text>
                                    </View>
                                
                                
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View >
                                    <Text style = {{marginTop:50}}> {new Intl.NumberFormat().format(i.Money)} </Text>
                                </View>
                                <View>
                                    <Text style = {{marginTop:50}}> VNĐ</Text>
                                </View>
                            </View>
                            
                        </View>
                    </Pressable>    
                </View>
              
            )
            output.push(itemview)
        }


        return output
    }

    //     return(
    //         <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
    //                 <View style = {{marginTop:10}}>
    //                     <Text> {TGian}</Text>
    //                     <Text> {TKChuyen}</Text>
    //                     <Ionicons name = 'arrow-down-outline' size = {20} style = {{marginLeft: 40}}></Ionicons>
    //                     <Text> {TKNhan}</Text>
    //                 </View>
    //                 <View >
    //                     <Text style = {{marginTop:50}}> {sotien}</Text>
    //                 </View>
    //             </View>
    //     )
    // }

    return (
       <View style= {{backgroundColor:'#edece8'}}>
            <View style = {styles.header}>
            <View style = {{flexDirection:'row', marginTop:25, margin:20}}>
                <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack(null)}}>
                    <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                </Pressable>
                    <Text style = {{color:'white', fontSize:18, fontWeight:'bold', marginRight: 5}}>Lịch sử chuyển khoản</Text>
            </View>
            </View>
            <ScrollView  style = {styles.showContainerCenter}>
                <Display_View/>    
            </ScrollView >
       
       </View>
    )

}


const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
    },
    title: {
        marginLeft: 18,
        fontSize: 15,
        marginTop: 40
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
        
        width : Dimensions.get('window').width - 30,
        height : Dimensions.get('window').height * 0.85,
        borderRadius:20,
        marginTop: 20,
        alignSelf: 'center'
    },

})
export default Transfer_History;