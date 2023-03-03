import React, {useState, useEffect} from 'react'
import {
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Alert, Modal, Pressable, 
  // Button, 
  SafeAreaView, 
  FlatList, 
  Keyboard,
  TextInput} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from "react-native-vector-icons/AntDesign";
import { ScrollView } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { onChange, Value } from 'react-native-reanimated';
import { Icon, Button } from 'react-native-elements'
import SwitchButton from "@freakycoder/react-native-switch-button";
import { Agenda, Calendar } from 'react-native-calendars';
import Categories from './Categories'


import ColorPicker from 'react-native-wheel-color-picker';


const AddAcc = ({navigation}) => {

    const [newmoney, setMoney] = useState(0)
    const [account, setAccount] = useState('')
    const [iconName, setIconName] = useState('help');
    const [iconColor, setIconColor] = useState('#A8ADAB');


    const onColorChange = iconColor => {
      setIconColor(iconColor);
    };
  

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style = {{backgroundColor: '#ffffff', flex:1}}>
        <ScrollView>
            <View style = {styles.header}>
                <View style = {{flexDirection:'row', marginTop:30, marginLeft:10}}>
                    <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack()}}>
                        <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>
                    <Text style = {{color:'white', fontSize:20}}> Them tai khoan</Text>
                </View>
            </View>
            <View style = {{ 
                flexDirection: 'row', 
                marginLeft: Dimensions.get('window').width/3,
                marginTop:20,
                }}>
                <TextInput
                    style={styles.inputText2}
                    placeholder='0'
                    keyboardType="numeric"
                    onChangeText={(newmoney) => setMoney(newmoney)}
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
                    placeholder='Nhap ten tai khoan'
                    onChangeText={(newacc) => setAccount(newacc)}

                />

            </View>
            {/* <Text style={styles.title}>Biểu tượng</Text>

            <View style={{
          flexDirection:'row', 
          flexWrap:'wrap', 
          justifyContent:'space-between', 
          alignContent: 'flex-start',
          marginTop: 10,
          marginHorizontal: 20,
          maxWidth: 360}}>

          <Icon reverse type='ionicon' size={30}
            name='leaf'
            color={iconColor}
            onPress={() => setIconName('leaf')}
          />
          <Icon reverse type='ionicon' size={30}
            name='library'
            color={iconColor}
            onPress={() => setIconName('library')}
          />
          <Icon reverse type='ionicon' size={30}
            name='paw'
            color={iconColor}
            onPress={() => setIconName('paw')}
          />
          <Icon reverse type='ionicon' size={30}
            name='hammer'
            color={iconColor}
            onPress={() => setIconName('hammer')}
          />
          <Icon reverse type='ionicon' size={30}
            name='earth'
            color={iconColor}
            onPress={() => setIconName('earth')}
          />
        </View> */}
        {/* end of bieu tuong */}

        {/* mau sac */}
        {/* <Text style={styles.title}>Màu sắc</Text>
        <View style={{marginBottom: 70, paddingHorizontal: 30}}>
          <ColorPicker
            color={iconColor}
            onColorChange={(iconColor) => onColorChange(iconColor)}
            // onColorChangeComplete={color => alert(`Color selected: ${color}`)}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
        </View> */}

        <View style = {{marginTop:300}}>
            <TouchableOpacity style={styles.floatingButton}
            onPress = {() => Alert.alert('tao accont')}>
                 <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Tạo</Text>
            </TouchableOpacity>
            </View>  
       
        </ScrollView>
        
       
    </View>

</TouchableWithoutFeedback>
    )


}

const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.15,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
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

      title: {
        marginLeft: 18,
        fontSize: 15,
        marginTop: 40
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
        alignSelf: 'center',
      }
})

export default AddAcc;