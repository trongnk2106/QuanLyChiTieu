import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const EditAcc = ({route, navigation}) => {


    const {TenTk, money, MaVi, SoDu} = route.params
    console.log(TenTk, money, MaVi)
    const [changeMoney, setChangeMoney] = useState(money)
    const [nameAcc, setNameAcc] = useState(TenTk)


    const Delete = async () =>{
        // console.log(data1.MaGD)    
        await db.transaction(async (tx) =>{
          await tx.executeSql(
            `DELETE FROM GIAODICH WHERE MaVi = ?`,
            [MaVi],
          )
          await tx.executeSql(
            `DELETE FROM GD_TK WHERE FromAcc = ? OR ToAcc = ?`,
            [MaVi, MaVi],
          )
          await tx.executeSql(
            `DELETE FROM DS_VI WHERE MaVi = ?`,
            [MaVi],
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

    const UpdateData = async () =>{
        if (nameAcc.length == 0){
            Alert.alert('Vui lòng điền đầy đủ thông tin trước khi thêm giao dịch!!!')
        }
        else {
            // getID()
            // var newMoney = Tien
            // if (isIncome == false){
            //   var newMoney = -Tien
            // }
            // console.log(1)
            var newmavi =  MaVi
            try{
              await db.transaction(async (tx)=> {
                await tx.executeSql(
                "UPDATE DS_VI set TenVi = ? ,Tien= ? WHERE Mavi = ?",
                [nameAcc,changeMoney, newmavi],
                (tx, results) => {
                  console.log('Results', results.rowsAffected);
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




    return (
        <View style = {{backgroundColor:'white' , flex: 1}}>
            <View style = {styles.header}>
                <Pressable style = {{paddingRight: 30, size: 30, marginTop:20}} onPress={() => {navigation.goBack(null)}}>
                            <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                </Pressable>
                <Text style = {{color:'white', fontSize: 20, marginTop:20}}> {TenTk}</Text>
            </View>
            <Text style={{fontSize: 15, color:'#4CA07C', marginTop:20}}>Số dư: </Text>

              <View style = {{flexDirection: 'row', justifyContent:'center',}}>
                <Text style={{fontSize: 15, marginTop:20}}>{SoDu - money + Number(changeMoney)} </Text>
                  <Text style={{fontSize: 15, color:'#4CA07C', marginTop:20}}>VNĐ </Text>
              </View>
            <Text style={{fontSize: 15, color:'#4CA07C', marginTop:20}}> Tiền lúc khởi tạo: </Text>

            <View style = {{flexDirection: 'row', justifyContent:'center',}}>
                <TextInput
                        style={styles.inputText2}
                        // placeholder='0'
                        keyboardType="numeric"
                        onChangeText={(newmoney) => setChangeMoney(newmoney)}
                        value = {changeMoney.toString()}
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
                    onChangeText={(newacc) => setNameAcc(newacc)}
                    value = {nameAcc}
                />

            </View>
            <View style = {{backgroundColor:'white', height: Dimensions.get('window').height * 0.5 }}></View>
            <View>
                <View>
                    <TouchableOpacity style={styles.floatingButton}
                        onPress = {() => UpdateData()}>
                        <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Luu</Text>
                    </TouchableOpacity>
                </View>  
                <View>
                <TouchableOpacity style={styles.floatingButton_2}
                    onPress = {() =>{Alert.alert(
                      'Warning',
                      'Xóa tài khoản sẽ xóa tất cả giao dịch bao gồm các giao dịch chuyển khoản. Vẫn tiếp tục xóa?',
                      [
                        {
                          text: 'Ok',
                          onPress: () => Delete(),
                        },
                        {
                          text: 'Cancel',
                          onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ],
                      {cancelable: true},
                    )}}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Xóa</Text>
                </TouchableOpacity>
                </View>  
            </View>
           
        </View>
    )

}


const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        flexDirection:'row'

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
      }


})
export default EditAcc;