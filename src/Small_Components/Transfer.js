import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

const Transfer = ({route, navigation}) => {


    const {data} = route.params
    console.log(data)

    const [modalVisible, setModalVisible] = useState(false)
    const [acctionTrigger, setAcctionTrigger] = useState('')
    const [ghichu, setghichu] = useState('')
    const [Tien, setTien] = useState(0)
    const homnay = new Date().getDate()
    const thangnay = new Date().getMonth() + 1
    const namnay = new Date().getFullYear()
    // const fulltime = `Hom nay ${homnay} thang ${thangnay}, ${namnay}`
    const fulltime = `${namnay}-${thangnay}-${homnay}`
    const [Date_s, setdate] = useState(`${fulltime}`)
    return(
        <ScrollView>
            <View style = {styles.header}>
                <Pressable style = {{paddingRight: 30, size: 30, marginTop:20}} onPress={() => {navigation.goBack(null)}}>
                                <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>
                    <Text style = {{color:'white', fontSize: 20, marginTop:20}}> Tao chuyen khoan</Text>
            </View>
            <View>
                <Modal
                transparent = {true}
                visible={modalVisible}
                onRequestClose = {() => setModalVisible(!modalVisible)}
                >
                    {acctionTrigger === 'taikhoanchuyen' ?
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={{margin: 15, marginLeft: 20, fontSize: 20}}>
                            Chọn tài khoản chuyen
                        </Text>
            
                        <View style={styles.row}>
                            <TouchableOpacity 
                                style={styles.doneButton} 
                                onPress = {() => setModalVisible(!modalVisible)}
                            >
                            <Text style={{color:'#FFFFFF'}}>Done</Text>
                            </TouchableOpacity>
                        </View>   
                        </View>
                    </View> 
          
                    : acctionTrigger === 'taikhoannhan' ? 
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={{margin: 15, marginLeft: 20, fontSize: 20}}>
                            Chọn tài khoản Nhan
                        </Text>
            
                        <View style={styles.row}>
                            <TouchableOpacity 
                                style={styles.doneButton} 
                                onPress = {() => setModalVisible(!modalVisible)}
                            >
                            <Text style={{color:'#FFFFFF'}}>Done</Text>
                            </TouchableOpacity>
                        </View>   
                        </View>
                    </View> 
                    :  acctionTrigger === 'calendar' ?

                    <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                        <Calendar style={{borderRadius: 15}}
                            onDayPress={(day) => {
                                setdate(day.dateString)
                            }}
                            onDayLongPress={(day) => console.log('onDayLongPress', day) }
                            onMonthChange={(date) => console.log('onMonthChange', date) }
                            onPressArrowLeft={(goToPreviousMonth) => {
                            console.log('onPressArrowLeft'); goToPreviousMonth();
                            }}
                            onPressArrowRight={(goToNextMonth) => {
                            console.log('onPressArrowRight'); goToNextMonth();
                            }}
                            markedDates={{
                                [Date_s] : {selected: true, marked: true, selectedColor: '#466A8F'}
                            }}
                        />
            
                        <TouchableOpacity 
                            style={styles.doneButton2} 
                            onPress = {() => setModalVisible(!modalVisible)}>
                            <Text style={{color:'#FFFFFF'}}>Done</Text>
                        </TouchableOpacity>
                                         
                      </View>
                    </View>
                    : null
                    
                    }
                </Modal>
                <TouchableOpacity
                    style={styles.selectBtn}
                    onPress={() => {
                    setModalVisible(true);
                    setAcctionTrigger('taikhoanchuyen');
                      
                }}
                >
                    <Text style={styles.title}>Chuyen tu tai khoan</Text>
                    <Text style={{marginLeft: 18, marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>chua chon</Text>   
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.selectBtn}
                    onPress={() => {
                    setModalVisible(true);
                    setAcctionTrigger('taikhoannhan');
                    }}
                >
                    <Text style={styles.title}>Chuyen vao tai khoan</Text>
                    <Text style={{marginLeft: 18, marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>chua chon</Text>   
                </TouchableOpacity>

                <View>
                    <Text style = {styles.title}>
                        So tien chuyen khoan
                    </Text>
                    <View style = {{ 
                        flexDirection: 'row', 
                        // textAlign: 'center',
                        marginLeft: 18,
                        marginTop: 10,
                    }}>


                    <TextInput
                    style={styles.inputText}
                    placeholder='0'
                    keyboardType="numeric"
                    onChangeText={(newMoney) => setTien(newMoney)}/>

                    <Text style={{fontSize: 25, color:'#4CA07C', marginTop:10}}>VNĐ</Text>
                    </View>
                   
                </View>
                <View>
                    <Text style = {[styles.title]}>
                        Ngay
                    </Text>
                    <Pressable
                      onPress={() => {
                        setModalVisible(true);
                        setAcctionTrigger('calendar');
                        }}
                    >
                        <Text style={{marginLeft: 18, marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>
                            {Date_s}
                        </Text>
                    </Pressable>
                   
                </View>
                <View>
                <Text style={styles.title}>Ghi chú</Text>
                <TextInput
                    style = {styles.noteText}
                    placeholder='Add Note (Optional)'
        
                    onChangeText={newghichu => setghichu(newghichu)}
                    />
                </View>
                <View style = {{marginTop:150}}>
                    <TouchableOpacity style={[styles.floatingButton]}>
                        <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Thêm</Text>
                    </TouchableOpacity>
                    
                </View>
                
            </View>
           
                
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    header: {
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        flexDirection:'row'
    },
    inputText: {
      fontSize: 25, 
      borderBottomWidth: 2,
      borderBottomColor:'#4CA07C',
      width: 125,
      marginRight: 5,
      marginBottom: 30,
      textAlign:'center',
    },
    title: {
      marginLeft: 18,
      marginBottom: 5,
      fontSize: 15,
      marginTop: 20
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center",
      backgroundColor: "rgba(0,0,0, 0.4)",
    },
    modalView: {
      backgroundColor: "#fff",
      width: Dimensions.get("screen").width - 40,
      height: Dimensions.get("screen").height - 500,
      borderRadius: 15
    },
    doneButton: {
      backgroundColor: "#54b38a",
      padding: 10,
      width: 100,
      flexDirection: "row",
      justifyContent: 'center',
      borderRadius: 6,
      alignSelf: 'flex-end',
      marginTop: 270,
      marginRight: 18
    },
    doneButton2: {
      backgroundColor: "#466A8F",
      padding: 10,
      width: 100,
      flexDirection: "row",
      justifyContent: 'center',
      borderRadius: 6,
      alignSelf: 'flex-end',
      marginTop: 20,
      marginRight: 16
    },
    selectButton: {
      width: Dimensions.get("screen").width-40,
      borderBottomWidth: 0.8,
      borderBottomColor:'#4CA07C',
      flexDirection: "row",
      justifyContent: "space-between",
      marginLeft: 20,
    },
    noteText: {
      width: Dimensions.get("screen").width-40,
      borderBottomWidth: 0.8,
      borderBottomColor:'#4CA07C',
      marginLeft: 20,
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
export default Transfer;