import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ProgressChart } from 'react-native-chart-kit';
import EditAcc from '../Small_Components/EditAcc'




const Acc = () => {

    const sotien = Number(10000) //load gia tien cua tong cong cac vi vao

    const [modalAcc, SetModalAccVisible] = useState(false)

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

    const RowDislay = () => {

        
        return (
            <View>
                 <Modal 
                    animationType='slide'
                    transparent={false}
                    visible = {modalAcc}
                    onRequestClose={() => SetModalAccVisible(!modalAcc)}    
                >
                    <View style = {styles.showContainer}>
                        <EditAcc/>
                        <Pressable onPress = {() => {
                            // SetModalViewVisible(!modalView)
                            AlerBottom()
                        
                        }}>
                            <Text style = {{fontSize:15, color:'red', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10}}> XOA </Text>
                        </Pressable>
                        
                    </View>

                    
                </Modal>

                <Pressable
                    onPress={() => SetModalAccVisible(true)}
                >
                    {/* <Ionicons name = 'caret-down-outline' color = 'white' fontSize='20'/> */}
                    <Text style = {styles.Row_view}> Chinh </Text>

                </Pressable>
            </View>
           
        
        )
    }


    return(
        <View>
            <View style = {styles.header}>
                <Text style = {{color : 'white', fontSize: 20, margin:10}}> Tai Khoan</Text>
            </View>
            <View>
                <Text style = {{textAlign:'center', marginTop:20, fontSize:18}}> Tong Cong : </Text>
                <Text style = {{textAlign:'center', fontSize:18, fontWeight:'bold'}}> {sotien} VND</Text>
            </View>
            <View style = {{flexDirection : 'row', justifyContent : 'space-between', marginTop:20}}>
                <View>
                    <Icon name = 'history' size = {40} style = {{marginLeft: 60}}/>
                    <Text style = {{marginLeft:15, marginTop:5}}> Lich su chuyen khoan</Text>
                </View>
                <View>
                    <Oct name = 'arrow-switch' size = {40} style = {{marginRight: 60}}/>
                    <Text style = {{paddingRight:20, marginTop:5}}>Chuyen khoan</Text>
                </View>
            </View>

            <View>
                <ScrollView style = {styles.body}>
                    <RowDislay/>
                    <RowDislay/>
                    <RowDislay/>
                    <RowDislay/>
                    <RowDislay/>
                    <RowDislay/>
                    <RowDislay/>
                    <RowDislay/>
                    <RowDislay/>
                    <RowDislay/>
                </ScrollView>
                
            </View>

            <View style= {{marginTop: Dimensions.get('window').height * 0.1, alignItems : 'center'}}>
                <Ionicons name = 'md-add-circle-sharp' color = 'black' size = {40}/>
            </View>



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
        backgroundColor : '#d4d9d7',
        flexDirection:'column',
        width : Dimensions.get('window').width * 0.9,
        height : Dimensions.get('window').height * 0.4,
        borderRadius:10,
        marginLeft:20,
        marginTop:10,
        marginBottom: 5

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