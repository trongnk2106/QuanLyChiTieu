import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ProgressChart } from 'react-native-chart-kit';
import EditAcc from '../Small_Components/EditAcc'




const Acc = ({ route, navigation }) => {

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
                <Pressable style = {{backgroundColor : 'white',height:50, marginTop:5, borderRadius:10}}
                 onPress = {() => {
                    navigation.navigate('EditAcc',{TenTk: 'Hien thi ten tk', money : 10000})
                 }}
                 >
                    <View>
                        <Text> Hien thi tai khoan</Text>
                    </View>
                
                </Pressable>
                
            </View>
           
        
        )
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
                <Text style = {{textAlign:'center', marginTop:20, fontSize:18}}> Tong Cong : </Text>
                <Text style = {{textAlign:'center', fontSize:18, fontWeight:'bold'}}> {sotien} VND</Text>
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
                    <Pressable onPress = {() => navigation.navigate('Transfer', {data : 'list ma vi'})}>
                        <Oct name = 'arrow-switch' size = {40} style = {{marginRight: 60}}/>
                    </Pressable>
                   
                    <Text style = {{paddingRight:20, marginTop:5}}>Chuyen khoan</Text>
                </View>
            </View>

            <View style = {{marginTop:20}}>
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