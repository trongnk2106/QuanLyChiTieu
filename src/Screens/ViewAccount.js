import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ProgressChart } from 'react-native-chart-kit';
import EditAcc from '../Small_Components/EditAcc'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import { openDatabase } from 'react-native-sqlite-storage';


const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const Acc = ({ route, navigation }) => {

    // const sotien = Number(10000) //load gia tien cua tong cong cac vi vao

    const [modalAcc, SetModalAccVisible] = useState(false)
    const [sumTien, setSumTien] = useState(0)
    const [listWallet, setListWallet] = useState([])
    // console.log(listWallet)
    const [ListVi, setListVi] = useState([])

    const AlerBottom = () => {
        Alert.alert('Canh bao','Ban co chac chan muon xoa giao dich khong', [
            {
                text: 'Roll Back',
                onPress : () => {
                    SetModalAccVisible(!modalAcc)
                }
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                SetModalAccVisible(!modalAcc)}},
           
          ]);
    }


    const GetListWallet = async()=>{
        var List = [{"MaVi" : 'Vi00','TenVi': 'Ví Tổng' ,label :'Ví tổng', "Tien": 0, "SoDu": 0 }]
        //Get Danh sách Ví: ID ví, Tên Ví, Tiền ban đầu lúc tạo ví
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
                    sum += a["SUM(Tien)"]
                    for (let i = 1; i < List.length; i++){
                        if (List[i].MaVi == a.MaVi)
                            List[i].SoDu = List[i].Tien + a["SUM(Tien)"]
                    }
                }
                List[0].SoDu = List[0].Tien + sum
                // setListVi(List)
                setSumTien(List[0].SoDu)
              }
            )
        })
        await db.transaction(async (tx) =>{
            await tx.executeSql(
                `SELECT * FROM GD_TK`,
                [],
              (tx, results) =>{
                var sum = 0
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    // console.log(a)
                    // sum += a["SUM(Tien)"]
                    // console.log(List[1])
                    for (let i = 1; i < List.length; i++){
                        if (List[i].MaVi == a.FromAcc)
                            List[i].SoDu -=a.Money
                        if (List[i].MaVi == a.ToAcc)
                            List[i].SoDu +=a.Money
                    }
                }
                // List[0].SoDu = List[0].Tien + sum
                setListVi(List)
              }
            )
        })
    }

    // console.log(listWallet)

    // useEffect(() => {
    //     GetListWallet()
    // }, [])

    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            GetListWallet()
        }
    }, [isFocused])
    



    const RowDislay = () => {
        var output = []
        for (let i = 1; i < ListVi.length; i++){
            var setitem = ( 
                <View> 
                    <Pressable style = {{backgroundColor : 'white',height:50, marginTop:5, borderRadius:10}}
                    onPress = {() => {
                        navigation.navigate('EditAcc',{TenTk: ListVi[i].TenVi, money : ListVi[i].Tien, MaVi:ListVi[i].MaVi, SoDu: ListVi[i].SoDu})
                    }}
                    >
                        <View style = {{flexDirection :'row', justifyContent:'space-between'}}>
                            {/* <Text style = {{marginLeft: 10, marginTop:10, fontSize: 18}}>{i.MaVi}</Text>
                             */}
                             {/* {console.log(ListVi[i].MaVi)} */}
                            <Text style = {{marginLeft: 10, marginTop:10, fontSize: 18}}>{ListVi[i].TenVi}</Text>
                            <Text style = {{marginRight:10, marginTop: 10,fontSize: 18}}>{new Intl.NumberFormat().format(ListVi[i].SoDu)} VND</Text>
                        </View>
                    
                    </Pressable>
        
                 </View>
            )
            output.push(setitem)
        }
        
        return output
    }


    return(
        <View style= {{backgroundColor: '#edece8', flex:1}}>
            <View style = {styles.header}>
                <View style = {{ flexDirection: 'row', margin: 20, marginTop: 25}}>

                    <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack()}}>
                        <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>

                    <Text style = {{fontSize:18, fontWeight:'bold', color:'white', marginRight:5}}>
                        TÀI KHOẢN
                    </Text>
                        
                </View>
            </View>
            <View>
                <Text style = {{textAlign:'center', marginTop:20, fontSize:18}}> Tổng cộng : </Text>
                <Text style = {{textAlign:'center', fontSize:18, fontWeight:'bold'}}> {new Intl.NumberFormat().format(sumTien)} VND</Text>
            </View>
            <View style = {{flexDirection : 'row', justifyContent : 'space-between', marginTop:20}}>
                <View>
                <Pressable
                 onPress = {() => {
                    navigation.navigate('Transfer_History',{TKChuyen: 'Ten tk chuyen', TKNhan : 'Ten TK nhan', TGian: 'Thoi gian chuyen', sotien: 10000})
                 }}
                 >
                        <Icon name = 'history' size = {40} style = {{marginLeft: 60}}/>
                    </Pressable>
                  
                    <Text style = {{marginLeft:15, marginTop:5}}> Lich su chuyen khoan</Text>
                </View>
                <View>
                    <Pressable onPress = {() => navigation.navigate('Transfer')}>
                        <Oct name = 'arrow-switch' size = {40} style = {{marginRight: 60}}/>
                    </Pressable>
                   
                    <Text style = {{paddingRight:20, marginTop:5}}>Chuyen khoan</Text>
                </View>
            </View>

            <View style = {{marginTop:20}}>
                <ScrollView style = {styles.body}>
                        <RowDislay/>
                      
                </ScrollView>
               
                
            </View>
                <Pressable style= {{marginTop : 10, alignItems : 'center', flexDirection:'column-reverse'}}
                onPress = {() => navigation.navigate('AddAcc')}
                >
      
                <Ionicons name = 'md-add-circle-sharp' color = 'black' size = {50} style = {{justifyContent:'flex-end'}}/>
      
                </Pressable>
            


        </View>
    )
}


const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },

    body: {
        // backgroundColor : '#edece8',
        // backgroundColor : 'green',
        flexDirection:'column',
        width : Dimensions.get('window').width ,
        height : Dimensions.get('window').height * 0.5,
        borderRadius:10,
        // marginLeft:10,
        // marginTop:10,
        // marginRight: 10,
        paddingLeft:20,
        paddingRight:20,


    },

    Row_view : {
        backgroundColor:'white',
        width : Dimensions.get('window').width * 0.8,
        height : 50,
        borderRadius : 10,
        marginLeft : 20,
        marginTop: 15,
    },
})




export default Acc;