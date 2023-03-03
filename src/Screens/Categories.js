import React, {useState, useEffect} from 'react'
import {
  Text, 
  View, 
  StyleSheet, 
  Dimensions, 
  TouchableOpacity, 
  TouchableWithoutFeedback,
  Alert, Modal, Pressable, 
  SafeAreaView, 
  FlatList, 
  Keyboard,
  TextInput,
  SectionList} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ScrollView } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { onChange } from 'react-native-reanimated';
import SwitchButton from "@freakycoder/react-native-switch-button";
import { Button, Icon } from 'react-native-elements';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import {ListIncomeCategory, ListExpenseCategory, ListIcon, getItem} from '../Small_Components/Icon';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const Categories = ({ navigation }) => {
  const [isIncome, setIsIncome] = useState(false);
  const [Categories, setCategories] = useState([])
  const GetCategories = async()=>{
    //Get Danh sách Ví: ID ví, Tên Ví, Tiền ban đầu lúc tạo ví
    await db.transaction(async (tx) =>{
        await tx.executeSql(
          "SELECT * FROM DANHMUC",
          [],
          (tx, results) =>{
            var sum = 0
            var List = []
            var vi = {"ID": '', "Tien": 0, label: '', 'SoDu': 0}
            for (let i = 0; i < results.rows.length; i++){
                var a = results.rows.item(i)
                console.log(a)
                List.push(a)
                
                // console.log(a)
            }
            setCategories(List)
          }
        )
    })
}

//   const getIcon =(x) =>{
//     for (let  i = 0; i < ListIcon.length; i++){
//       if (ListIcon[i].key == x)
//         return ListIcon[i].img
//     }
//   }

//   let listItemView = (item) => {
        
//     return (
//         <SwitchButton style={{marginLeft: 40}}
//             inactiveImageSource={getIcon(item.Icon)}
//             activeImageSource={getIcon(item.Icon)}
//             mainColor= {item.Color}
//             tintColor={item.Color}
//             text= {item.TenDanhMuc}
//             textStyle={{
//               color: item.Color,
//               fontWeight: "600",
//               marginLeft: 35,
//               marginBottom: 10
//             }}
//         />
//     );
//   };


// const show = (data)=>{
//         return(
//             <SafeAreaView style={{flex: 1}}>

//                 <View style={{flex: 1}}>
//                     <FlatList
//                         horizontal={false}
//                         numColumns = {4}
//                         data={data}
//                         // ItemSeparatorComponent={listViewItemSeparator}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({item}) =>listItemView(item)}
//                 />
//                  </View>
        
//             </SafeAreaView>
            
//         )
    
        
// }
// const showonRow= () =>{
//   if (Categories.length> 0){
//   const data = [...Categories];
    
//   const newArr = [];
//   while(data.length) newArr.push(data.splice(0,4));
//   console.log(newArr)
//   return(
//     <SafeAreaView style={{flex: 1}}>
//     <View style={{flex: 1}}>
//         <View style={{flex: 1}}>
//             <FlatList
//                 data={newArr}
//                 // ItemSeparatorComponent={listViewItemSeparator}
//                 keyExtractor={(item, index) => index.toString()}
//                 renderItem={({item}) =>show(item)}
//         />
//          </View>

//      </View>
//     </SafeAreaView>
    
// )
//   }
// }

const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            GetCategories()
        }
    }, [isFocused])
let listItemView = (item) => {
  return (
      <View style={{flexDirection:'column', marginHorizontal:8}}>
        <Button
          buttonStyle={{
            backgroundColor: 'transparent',
            width: 80, height: 80,
            borderRadius: 10,
          }}
          icon={
            <Icon
              reverse 
              type={getItem(item.Icon, ListIcon)[0]}
              size={30}
              name={getItem(item.Icon, ListIcon)[1]}
              color={item.Color}
            />
          }
          onPress={() => {
            item.Icon == 'Tao' ? navigation.navigate('CreateCategory') : 
                            navigation.navigate('EditCategory',{iconEdit:item}) 
          }}
        />
        <Text style={{
          textAlign:'center', 
          marginTop: 1,
          marginBottom: 8, 
          color:item.Color,
          fontWeight:'bold'}}>{item.TenDanhMuc}</Text>
      </View>
    );
  };

  const showCate = (isIncome)=>{
  if (Categories.length > 0){
    var data = []
    for (let i = 0; i < Categories.length; i++){
      if (Categories[i].ThuChi == isIncome)
        data.push(Categories[i])
    }
    var x = {"Color": "#C0C0C0", "Icon": "Tao", "MaDanhMuc": "xxx", "TenDanhMuc": "Tạo", "ThuChi": 1}
    data.push(x)
  }  
  return(
          <SafeAreaView style={{flex: 1}}>
              <View style={{flex: 1}}>
                  <FlatList 
                      contentContainerStyle={{justifyContent:'center', alignItems:'flex-start', alignSelf:'center'}}
                      horizontal={false}
                      numColumns = {4}
                      data={data}
                      scrollEnabled= {false}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={({item}) => listItemView(item)}
                  />
               </View>
          </SafeAreaView>
      )
  } 

  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style = {{backgroundColor: '#ffffff', flex:1}}>
        {/* header */}
        <View style = {styles.header}>
          <View style = {{ flexDirection: 'row', margin: 20, marginTop: 25}}>

            <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack()}}>
              <Ionicons name = 'arrow-back' color = 'white' size={25}/>
            </Pressable>

            <Text style = {{fontSize:18, fontWeight:'bold', color:'white', marginRight:5}}>
                Danh mục
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


      {showCate(isIncome)}

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
        marginBottom: 25
    },

})


export default Categories;