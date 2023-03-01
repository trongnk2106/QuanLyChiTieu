import React, {useState, useEffect} from 'react'
import {
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Alert, Modal, Pressable, 
  Button, 
  SafeAreaView, 
  FlatList, 
  Keyboard,
  TextInput} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { onChange } from 'react-native-reanimated';
import SwitchButton from "@freakycoder/react-native-switch-button";

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const Categories = ({ navigation }) => {

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {{backgroundColor: '#ffffff', flex:1}}>
      {/* header */}
      <View style = {styles.header}>
        <View style = {{ flexDirection: 'row', margin: 20, marginTop: 25}}>

          <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.navigate('Thêm giao dịch')}}>
            <Ionicons name = 'arrow-back' color = 'white' size={25}/>
          </Pressable>

          <Text style = {{fontSize:18, fontWeight:'bold', color:'white', marginRight:5}}>
              Thêm danh mục
          </Text>
                  
        </View>
      </View>
      {/* end of header */}

      <View style={{
          flexDirection:'row', 
          flexWrap:'wrap', 
          justifyContent:'space-between', 
          alignContent: 'flex-start',
          marginLeft: 10,
          marginTop: 30,
          maxWidth: 360}}>
            
        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/food.png")}
            activeImageSource={require("../../assets/food.png")}
            mainColor="#f1bb7b"
            tintColor="#f1bb7b"
            text="Ăn uống"
            textStyle={{
              color: "#f1bb7b",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            // onPress={(isActive: boolean) => console.log(isActive)}
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
            // onPress={(isActive: boolean) => console.log(isActive)}
        />
        <SwitchButton style={{marginLeft: 20}}
            inactiveImageSource={require("../../assets/food2.png")}
            activeImageSource={require("../../assets/food2.png")}
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
            text="Tạo"
            textStyle={{
              color: "#9A9A9A",
              fontWeight: "600",
              marginLeft: 20,
              marginBottom: 10
            }}
            onPress={() => navigation.navigate("Tạo danh mục")}
        />
      </View>

    </View>

    </TouchableWithoutFeedback>



  )
}

const styles = StyleSheet.create({
    header: {
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },

})


export default Categories;