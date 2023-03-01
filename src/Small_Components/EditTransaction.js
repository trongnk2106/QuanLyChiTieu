import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


const EditTransaction = ({route, navigation}) => {

    // if(props != null)
    //     console.log(props)
    // const sotien = Number(props.data["SUM(Tien)"])
    const {data0,data1, TenTK} = route.params
    // console.log(data)
    const danhmuccu = 'danh muc duoc load tu database'
    const [tranScationType, setTranSactionType] = useState('Chi Phi')
    const [Money, setMoney] = useState(data1["Tien"])
    const [danhmuc, setDanhmuc] = useState(danhmuccu)
    const [ghichu, setGhichu] = useState('')
 
    return(
        <View>
            <View style = {styles.header}>
                <View style={{flexDirection:'row', marginTop:20}}>
                    <Pressable style = {{paddingRight: 30, size: 30}} 
                        onPress={ () =>{navigation.goBack()} }>
                        <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>
                    <Text style = {{color:'white', fontSize:20, marginLeft:50}}>
                        Chinh sua giao dich
                    </Text>
                </View>
                <View style = {{flexDirection:'row', justifyContent:'space-between', marginLeft:70, marginRight:70, paddingTop:20}}> 
                    <Text style = {styles.Income_s}> Chi phi</Text>
                    <Text style = {styles.Income_s}> Thu Nhap</Text>
                </View>
            </View>
            <View>
                <View style = {styles.Textinput_s}>
                    <TextInput 
                    onChangeText={(newmoney) => setMoney(newmoney)}
                    value={`${Money}` }
                    />
                    <Text style = {{marginTop: 15}}> VND</Text>
                </View>
                <View style = {{marginTop:15, marginBottom:10}}>
                    <Text> Tai khoan </Text>
                    <Text style = {{color:'green', fontSize:15}}> Load loai tai khoan thu database</Text>
                </View>
                <View>
                    <Text> Danh muc</Text>
                    <TextInput
                    onChangeText={(newdanhmuc) => {setDanhmuc(newdanhmuc)}}
                    value={danhmuc}/>
                </View>
                <View>
                    <Text> Ngay thang</Text>
                    <Text> Load ngay thang truoc do tu database</Text>
                    <Text> Create calender</Text>
                </View>
                <View style = {{marginTop:10}}>
                    <Text> Ghi chu</Text>
                    <TextInput
                    onChangeText = {(newghichu) => {setGhichu(newghichu)}}
                    value = {ghichu}
                    placeholder = 'Ghi chu'
                    />
                </View>
            </View>
           




        </View>
      
    )

}


const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.15,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
    Income_s: {
        color :'white',
        fontSize:20,
    },
    Textinput_s : {
        borderBottomWidth:1,
        borderBottomColor:'black',
        width:Dimensions.get('window').width / 3,
        // justifyContent:'center',
        marginLeft: 100,
        flexDirection:'row',
    },
    save_s : {
        textAlign: 'center'
    },
})


export default EditTransaction;