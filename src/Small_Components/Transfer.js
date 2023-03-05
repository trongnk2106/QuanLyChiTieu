import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import Oct from 'react-native-vector-icons/Octicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { openDatabase } from 'react-native-sqlite-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';



const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})



const Transfer = ({navigation}) => {


    // const {data} = route.params
    // console.log(data)

    const [modalVisible, setModalVisible] = useState(false)
    const [acctionTrigger, setAcctionTrigger] = useState('')
    const [ghichu, setghichu] = useState('')
    const [Tien, setTien] = useState(0)
    const [listWallet, setListWallet] = useState([])
    const homnay = new Date().getDate()
    const thangnay = new Date().getMonth() + 1
    const namnay = new Date().getFullYear()
    // const fulltime = `Hom nay ${homnay} thang ${thangnay}, ${namnay}`
    const fulltime = `${namnay}-0${thangnay}-0${homnay}`
    const [Date_s, setdate] = useState(`${fulltime}`)
    const [ListVi, setListVi] = useState([])
    const [WalletChoose_CH, setWalletChoose_CH] = useState('Chưa chọn')
    const [WalletChoose_NH, setWalletChoose_NH] = useState('Chưa chọn')

    const GetListWallet = async()=>{
        var List = []
        //Get Danh sách Ví: ID ví, Tên Ví, Tiền ban đầu lúc tạo ví
        await db.transaction(async (tx) =>{
            await tx.executeSql(
              "SELECT * FROM DS_VI",
              [],
              (tx, results) =>{
                var sum = 0
                var vi = {"ID": '', "Tien": 0, label: '', 'SoDu': 0}
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    vi.ID = a.MaVi
                    a.label = a.TenVi
                    vi.Tien = a.Tien
                    sum += a.Tien
                    a.SoDu = a.Tien
                    List.push(a)
                }
                List[0].Tien = sum
                List[0].SoDu = sum
              }
            )
        })
        await db.transaction(async (tx) =>{
            await tx.executeSql(
              "SELECT MaVi, SUM(Tien) FROM GIAODICH GROUP BY MaVi",
              [],
              (tx, results) =>{
                var sum = 0
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    sum += a["SUM(Tien)"]
                    for (let i = 1; i < List.length; i++){
                        if (List[i].MaVi == a.MaVi)
                            List[i].SoDu = List[i].Tien + a["SUM(Tien)"]
                    }
                }
                List[0].SoDu = List[0].Tien + sum
                setListVi(List)
              }
            )
        })
    }
    // console.log(ListVi)

    const checkViTien = (ID, money_ch) => {
      if (ListVi.length > 0){
        for( let i = 0; i < ListVi.length; i++){
            if (ListVi[i].MaVi == ID)
                {
                  // console.log('check vi',ListVi[i].TenVi, ListVi[i].SoDu, money_ch)
                  if (ListVi[i].SoDu < money_ch)
                  {return false}
                  else {return true}
                }
        }
    }

  }

    const setData = async () =>{
        if (WalletChoose_CH === 'Chưa chọn' || WalletChoose_NH === 'Chưa chọn' || Tien === 0){
            Alert.alert('Vui lòng điền đầy đủ thông tin trước khi thêm giao dịch')
        }
        
        else if (checkViTien(WalletChoose_CH,  Tien) === false) {Alert.alert("Không đủ số dư, vui lòng chọn ví khác")}
        else {
            // getID()
            var MAGDTK = new Date().toString()
         
            MAGDTK =MAGDTK.replaceAll(' ','')
            MAGDTK ='GDTK' + MAGDTK.replaceAll(':','').slice(6,17)
            // var Name_Vi = account
            // var newMoney = Tien
            // if (isIncome == false){
            //   var newMoney = -Tien
            // }
            // console.log(1)
            // console.log(MaVi,Name_Vi,money)
            try{
              await db.transaction(async (tx)=> {
                await tx.executeSql(
                "INSERT INTO GD_TK (MaGDTK,FromAcc,ToAcc,Money, Date, GhiChu) VALUES(?,?,?,?,?,?)",
                [MAGDTK,WalletChoose_CH,WalletChoose_NH, Tien, Date_s, ghichu],
  
                
                (tx, results) => {
                  // console.log('Results', results.rowsAffected);
                  if (results.rowsAffected > 0) {
                    Alert.alert(
                      'Success',
                      'You are Registered Successfully',
                      [
                        {
                          text: 'Ok',
                          onPress: () => navigation.navigate('Acc'),
                        },
                      ],
                      {cancelable: false},
                    );
                  } else alert('Registration Failed');
                },
                )
                
              })
            }
            catch (error){
              console.log('error')
            }
            
            // setModifine(!modifine)
        }
      }
    const GetTenViByMaVi= (ID) =>{
        if (ID === 'Chưa chọn') {
            return 'Chưa chọn'
        }
        if (ListVi.length > 0){
            for( let i = 0; i < ListVi.length; i++){
                if (ListVi[i].MaVi == ID)
                    return ListVi[i].TenVi
            }
        }

    }


       const Get = async()=>{
            await db.transaction(async (tx) =>{
  
                await tx.executeSql(
                  `SELECT * FROM GD_TK`,
                  [],
                  async (tx, results) =>{
                    var sum = 0
                    console.log(results.rows.length)
                    for (let i = 0; i < results.rows.length; i++){
                        var a = results.rows.item(i)
                        console.log(a)
           
                        // List[i].MaVi = 'Vi00'
                        
                    }
              
                  }
                )
                
            })
         
    }



    useEffect(() => {
        // GetTenVi()
        GetListWallet()
        Get()
    }, [])

    
    return(
        <ScrollView>
            <View style = {styles.header}>
            <View style = {{ flexDirection: 'row', margin: 20, marginTop: 25}}>
              <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack(null)}}>
                                <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>
                    <Text style = {{color:'white', fontSize: 18, fontWeight:'bold', marginRight:5}}>Tạo chuyển khoản</Text>
            </View>
            </View>
            <View>
                <Modal
                transparent = {true}
                visible={modalVisible}
                onRequestClose = {() => setModalVisible(!modalVisible)}
                >
                    {acctionTrigger === 'taikhoanchuyen' ?
                   <View style = {styles.showContainer}>
                        <View style ={styles.showContainerCenter}>
                        <Text style = {{marginLeft: 20, marginTop: 15, fontSize:20}}>Chọn tài khoản</Text>
                            <ScrollView>
                                <View style={{marginLeft:10}}>
                                    <RadioButtonRN 
                                        box = {false}
                                        data = {ListVi}
                                        selectedBtn = {(e) => {console.log(e.MaVi)
                                            setWalletChoose_CH(e.MaVi)}}
                                            />
                                </View>
                            </ScrollView>
                            
                        <Pressable onPress = {() => setModalVisible(!modalVisible)}>
                        <Text style = {{fontSize:17, color:'green', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:15}}> Chọn </Text>
                        </Pressable>
                         </View>
                   
                     </View>
          
                    : acctionTrigger === 'taikhoannhan' ? 
                    <View style = {styles.showContainer}>
                    <View style ={styles.showContainerCenter}>
                        <Text style = {{marginLeft: 20, marginTop: 15, fontSize:20}}>Chọn tài khoản</Text>
                        <ScrollView>
                            <View style={{marginLeft:10}}>
                                <RadioButtonRN 
                                    box = {false}
                                    data = {ListVi}
                                    selectedBtn = {(e) => {console.log(e.MaVi)
                                        setWalletChoose_NH(e.MaVi)}}
                                        />
                            </View>
                        </ScrollView>
                        
                    <Pressable onPress = {() => setModalVisible(!modalVisible)}>
                      <Text style = {{fontSize:17, color:'green', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:15}}> Chọn </Text>
                    </Pressable>
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
                    setAcctionTrigger('taikhoanchuyen')
                    // GetTenVi()
                    ;
                      
                }}
                >
                    <Text style={styles.title}>Chuyển từ tài khoản</Text>
                    <Text style={{marginLeft: 18, marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>{GetTenViByMaVi(WalletChoose_CH)}</Text>   
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.selectBtn}
                    onPress={() => {
                    setModalVisible(true);
                    setAcctionTrigger('taikhoannhan');
                    }}
                >
                    <Text style={styles.title}>Chuyển vào tài khoản</Text>
                    <Text style={{marginLeft: 18, marginBottom: 5, fontSize: 18, color: '#4CA07C'}}>{GetTenViByMaVi(WalletChoose_NH)}</Text>   
                </TouchableOpacity>

                <View>
                    <Text style = {styles.title}>
                        Số tiền chuyển khoản
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
                        Ngày
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
                    <TouchableOpacity style={[styles.floatingButton]}
                    onPress = {() => setData()}>
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
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
    },
    inputText: {
      fontSize: 25, 
      borderBottomWidth: 2,
      borderBottomColor:'#4CA07C',
      width: 125,
      marginRight: 5,
      marginBottom: 15,
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
    },
    showContainer : {
        backgroundColor: "rgba(0,0,0, 0.3)",
        flex: 1,
        alignContent:'center',
        alignItems:'center',
    },
    showContainerCenter:{
        backgroundColor : 'white',
        flexDirection:'column',
        marginTop : Dimensions.get('window').height * 0.2,
        height: 100,
        width : Dimensions.get('window').width * 0.9,
        height : Dimensions.get('window').height * 0.4,
        borderRadius:10,
    },
})
export default Transfer;