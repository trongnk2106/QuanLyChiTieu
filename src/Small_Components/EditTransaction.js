import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';


const EditTransaction = () => {


    const sotien = Number(50000000)
    const [tranScationType, setTranSactionType] = useState('Chi Phi')
    const [Money, setMoney] = useState(sotien)

    return(
        <View>
            <View style = {styles.header}>
                <View style={{flexDirection:'row', marginTop:20}}>
                    <Ionicons name='md-arrow-back' color='white' size={30} style={{marginLeft:10}}/>
                    <Text style = {{color:'white', fontSize:20, marginLeft:50}}>
                        Chinh sua giao dich
                    </Text>
                </View>
                <View style = {{flexDirection:'row', justifyContent:'space-between', marginLeft:70, marginRight:70, paddingTop:20}}> 
                    <Text style = {styles.Income_s}> Chi phi</Text>
                    <Text style = {styles.Income_s}> Thu Nhap</Text>
                </View>
            </View>
            <View style = {{flexDirection:'row'}}>
                <View style = {styles.Textinput_s}>
                    <TextInput 
                    onChangeText={(newmoney) => setMoney(newmoney)}
                    value={`${Money.toString()}` }
                    />
                    <Text style = {{marginTop: 15}}> VND</Text>

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
        width:Dimensions.get('window').width / 5,
        // justifyContent:'center',
        marginLeft: Dimensions.get('window').width / 3,
        flexDirection:'row',
    },
})


export default EditTransaction;