import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';



const Transfer_History = ({route, navigation}) => {


    // const {TenTk, money} = route.params
    // // console.log(TenTk, money)
    // const [changeMoney, setChangeMoney] = useState(money)
    // const [nameAcc, setNameAcc] = useState(TenTk)

    const {TKChuyen, TKNhan, TGian,sotien} = route.params
    console.log(TKChuyen, TKNhan, TGian, sotien)


    const Display_View = () => {
        return(
            <View style = {{flexDirection:'row', justifyContent:'space-between', marginHorizontal:15, marginTop:10}}>
                    <View style = {{marginTop:10}}>
                        <Text style={{marginBottom:3}}> {TGian}</Text>
                        <View style={{alignItems:'center'}}>
                            <Text style={{color:'black'}}> {TKChuyen}</Text>
                            <Ionicons name = 'arrow-down-outline' size = {20} color='black'></Ionicons>
                            <Text style={{color:'black'}}> {TKNhan}</Text>
                        </View>
                    </View>
                    <View >
                        <Text style = {{marginTop:50, color:'black'}}> {sotien}</Text>
                    </View>
                </View>
        )
    }

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
            <ScrollView 
                style = {styles.showContainerCenter}>
                
                <Display_View/>    
                <Display_View/>    
                <Display_View/>    

            </ScrollView>
       
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
        width : Dimensions.get('window').width - 30,
        height : Dimensions.get('window').height * 0.8,
        borderRadius:20,
        marginTop: 20,
        alignSelf: 'center'
    },

})
export default Transfer_History;