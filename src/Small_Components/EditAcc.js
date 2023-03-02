import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';



const EditAcc = ({route, navigation}) => {


    const {TenTk, money} = route.params
    console.log(TenTk, money)
    const [changeMoney, setChangeMoney] = useState(money)
    const [nameAcc, setNameAcc] = useState(TenTk)

    return (
        <View style = {{backgroundColor:'white' , flex: 1}}>
            <View style = {styles.header}>
                <Pressable style = {{paddingRight: 30, size: 30, marginTop:20}} onPress={() => {navigation.goBack(null)}}>
                            <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                </Pressable>
                <Text style = {{color:'white', fontSize: 20, marginTop:20}}> {TenTk}</Text>
            </View>

            <View style = {{flexDirection: 'row', justifyContent:'center', marginTop:15}}>
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
            <View style = {{backgroundColor:'white', height: Dimensions.get('window').height * 0.6 }}></View>
            <View>
                <View>
                    <TouchableOpacity style={styles.floatingButton}
                        onPress = {() => Alert.alert('tao accont')}>
                        <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Tạo</Text>
                    </TouchableOpacity>
                </View>  
                <View>
                <TouchableOpacity style={styles.floatingButton_2}
                    onPress = {() => Alert.alert('xoa acc')}>
                    <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Xoa</Text>
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