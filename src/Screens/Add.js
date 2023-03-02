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
import { onChange } from 'react-native-reanimated';
import { Icon, Button } from 'react-native-elements'
import SwitchButton from "@freakycoder/react-native-switch-button";
import { Agenda, Calendar } from 'react-native-calendars';
import Categories from './Categories'

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const Add = ({ navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalView, SetModalViewVisible] = useState(false)
  const [isIncome, setIsIncome] = useState(false);

  const [Tien, setTien] = useState(0);
  // const [Date, setdate] = useState('');
  // const [Category, setCategory] = useState('');

  // const [activeButton, setActiveButton] = useState(false);
  // const [selected, setSelected] = useState('');
  const [Date_s, setdate] = useState('')
  const [actionTriggered, setActionTriggered] = useState('');

  // const setSelectedCategory = (category) => {
  //   if (category !== selected) setSelected(category);
  //   else setSelected('');
  // };

  const test_ngay = new Date().getDate()

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {{backgroundColor: '#ffffff', flex:1}}>
      {/* header */}
      <View style = {styles.header}>
        <View style = {{ flexDirection: 'row', margin: 20, marginTop: 25}}>

          <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack(null)}}>
            <Ionicons name = 'arrow-back' color = 'white' size={25}/>
          </Pressable>

          <Text style = {{fontSize:18, fontWeight:'bold', color:'white', marginRight:5}}>
              Thêm giao dịch
          </Text>
                  
        </View>

        <View style = {{justifyContent:'space-between', flexDirection:'row', textAlignVertical:'center', paddingTop:5, marginBottom: 10}}>
                <TouchableOpacity
                  style = {{marginLeft:75}}
                  onPress = {() => setIsIncome(false)}
                >
                  { isIncome === false ? <Text style = {{fontSize:18, fontWeight:'bold', color:'white', textDecorationLine : 'underline'}}>CHI PHÍ</Text> 
                    : <Text style = {{color :'#EEEEEE', fontSize:18}}>CHI PHÍ</Text>}
                </TouchableOpacity>  

                <TouchableOpacity
                  style ={{marginRight:75}}   
                  onPress = {() => setIsIncome(true)} 
                >
                  { isIncome === true ? <Text style = {{fontSize:18, fontWeight:'bold', color:'white', textDecorationLine : 'underline',}}>THU NHẬP</Text> 
                    : <Text style = {{color :'#EEEEEE', fontSize:18}}>THU NHẬP</Text>}
                </TouchableOpacity> 
          </View>
      </View>
      {/* end of header */}

      <ScrollView>
      {/* money input */}
      <View style = {{ 
        flexDirection: 'row', 
        textAlign: 'center',
        marginLeft: 95,
        marginTop: 10,
      }}>
        <TextInput
          style={styles.inputText}
          placeholder='0'
          keyboardType="numeric"
          onChangeText={(newMoney) => setTien(newMoney)}/>

        <Text style={{fontSize: 25, color:'#4CA07C', marginTop:10}}>VNĐ</Text>

        <Pressable style = {{marginLeft:15, marginTop:15}} onPress={() => {navigation.navigate("Calculator")}}>
            <Ionicons name = 'calculator' color = '#8B9391' size={30}/>
        </Pressable>
      </View>
      {/* end of money input */}
      
      <TouchableOpacity
        style={styles.selectBtn}
        onPress={() => {
          setModalVisible(true);
          setActionTriggered('taikhoan');}}
      >
        <Text style={styles.title}>Tài khoản</Text>
        <Text style={{marginLeft: 18, marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>Chính</Text>   
      </TouchableOpacity>

      <Text style={styles.title}>Danh mục</Text>
      <View style={{
          flexDirection:'row', 
          flexWrap:'wrap', 
          justifyContent:'space-between', 
          alignContent: 'flex-start',
          marginLeft: 10,
          maxWidth: 360}}>

        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/food.png")}
            activeImageSource={require("../../assets/food.png")}
            mainColor='#f1bb7b'
            originalColor='white'
            tintColor='#f1bb7b'
            text="Ăn uống"
            textStyle={{
              color: "#f1bb7b",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10,
            
            }}
            // isActive={selected === 'food' ? true : false}
            // onPress={() => {setSelectedCategory('food')}}  
        />

        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/family.png")}
            activeImageSource={require("../../assets/family.png")}
            mainColor="#587DB6"
            tintColor="#587DB6"
            text="Gia đình"
            textStyle={{
              color: "#587DB6",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            // onPress={(isActive: boolean) => {isActive='false'; console.log(isActive)}}
        />
        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/coffee.png")}
            activeImageSource={require("../../assets/coffee.png")}
            mainColor="#8F3842"
            tintColor="#8F3842"
            text="Cà phê"
            textStyle={{
              color: "#8F3842",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            // onPress={(isActive: boolean) => console.log(isActive)}
        />
        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/entertainment.png")}
            activeImageSource={require("../../assets/entertainment.png")}
            mainColor="#82B8B4"
            tintColor="#82B8B4"
            text="Giải trí"
            textStyle={{
              color: "#82B8B4",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            // onPress={(isActive: boolean) => console.log(isActive)}
        />
        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/grocery.png")}
            activeImageSource={require("../../assets/grocery.png")}
            mainColor="#D197AE"
            tintColor="#D197AE"
            text="Tạp phẩm"
            textStyle={{
              color: "#D197AE",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            // onPress={(isActive: boolean) => console.log(isActive)}
        />
        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/loan.png")}
            activeImageSource={require("../../assets/loan.png")}
            mainColor="#91C87B"
            tintColor="#91C87B"
            text="Cho vay"
            textStyle={{
              color: "#91C87B",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            // onPress={(isActive: boolean) => console.log(isActive)}
        />
        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/more.png")}
            activeImageSource={require("../../assets/more.png")}
            mainColor="#D0C741"
            tintColor="#D0C741"
            text="Khác"
            textStyle={{
              color: "#D0C741",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            // onPress={(isActive: boolean) => console.log(isActive)}
        />
        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/plus.png")}
            activeImageSource={require("../../assets/plus.png")}
            originalColor='#ffffff'
            mainColor='#9A9A9A'
            tintColor="#9A9A9A"
            text="Thêm"
            textStyle={{
              color: "#9A9A9A",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            onPress={() => navigation.navigate("Thêm danh mục")}
        />
      </View>

      <Text style={styles.title}>Ngày</Text>
      <TouchableOpacity
          style={styles.selectButton}
          onPress={() => {setModalVisible(true);
              setActionTriggered('calendar');}}
      >
          <Text style={{marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>{Date_s != '' ? Date_s : 'Select Date'}</Text>

          <AntDesign
              name="calendar"
              size={30}
              color="#8B9391"
          />
      </TouchableOpacity>

      <Text style={styles.title}>Ghi chú</Text>
      <TextInput
          style = {styles.noteText}
          placeholder='Add Note (Optional)'
          // multiline={true}
          // numberOfLines={15}
          // onChangeText={newghichu => setghichu(newghichu)}
          // defaultValue={ghichu}
      />

      <Text style={styles.title}>Ảnh</Text>


      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
        transparent={true}
      >
        {actionTriggered === 'taikhoan' ?
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{margin: 15, marginLeft: 20, fontSize: 20}}>
              Chọn tài khoản
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

        :  actionTriggered === 'calendar' ?

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
        
        : null }
      
      </Modal>

      </ScrollView>


      <TouchableOpacity style={styles.floatingButton}>
          <Text style={{fontSize:15, fontWeight:'bold', color:'white'}}>Thêm</Text>
      </TouchableOpacity>
      
    </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    header: {
        height : Dimensions.get('window').height * 0.14,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
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


export default Add;