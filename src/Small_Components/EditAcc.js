import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';



const EditAcc = (props) => {


    const sotien = Number(100000)

    return (
        <View>
            <View style = {styles.header}>

            </View>
            <View style = {{flexDirection: 'row', justifyContent:'center', marginTop:15}}>
                <TextInput
                value={sotien.toString()}
                style = {{textAlign:'center',
                borderBottomColor:'black',
                borderBottomWidth:1,

            }}
                />
                <Text style = {{marginTop:13}}> VND </Text>

            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',

    },
})
export default EditAcc;