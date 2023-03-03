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
            <View style = {{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style = {{marginTop:10}}>
                        <Text> {TGian}</Text>
                        <Text> {TKChuyen}</Text>
                        <Ionicons name = 'arrow-down-outline' size = {20} style = {{marginLeft: 40}}></Ionicons>
                        <Text> {TKNhan}</Text>
                    </View>
                    <View >
                        <Text style = {{marginTop:50}}> {sotien}</Text>
                    </View>
                </View>
        )
    }

    return (
       <View style= {{backgroundColor:'#edece8'}}>
            <View style = {styles.header}>
                <Pressable style = {{paddingRight: 30, size: 30, marginTop:20}} onPress={() => {navigation.goBack(null)}}>
                                <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>
                <Text style = {{color:'white', fontSize: 20, marginTop:20}}> Chuyen khoan</Text>
            </View>
            <View style = {styles.showContainerCenter}>
                
                <Display_View/>    
                <Display_View/>    

                <Display_View/>    


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
      },
      showContainerCenter:{
        backgroundColor : 'white',
        // flexDirection:'column',
        // marginTop : Dimensions.get('window').height * 0.2,
        
        width : Dimensions.get('window').width ,
        height : Dimensions.get('window').height * 0.8,
        borderRadius:20,
        marginTop: 20,
        // alignItems: 'center',
        // justifyContent: 'center',
        // alignItems:'center'
    },

})
export default Transfer_History;