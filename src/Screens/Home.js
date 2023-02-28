import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button, SafeAreaView, FlatList} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressChart } from 'react-native-chart-kit';
import { SwipeListView } from 'react-native-swipe-list-view'
// import Icon from 'react-native-vector-icons'
import { TimeDatePicker } from 'react-native-time-date-picker';
import { openDatabase } from 'react-native-sqlite-storage';

import moment from 'moment';
// import ViewDetail from '../Small_Components/ViewDetail';
import ViewDetail_Type from '../Small_Components/ViewDetail_Type';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const Home = () => {


    const [modalVisible, setModalVisible] = useState(false);
    const [modalView, SetModalViewVisible] = useState(false)
    const [WalletChoose, setWalletChoose] = useState('Vi00');
    const [isIncome, setIsIncome] = useState(false)
    const [ListVi, setListVi] = useState([])
    const [SelectedList, setSelectedList] = useState([])
    const [SelectedGD, setSelectedGD] = useState('')
    const [Key, SetKey] = useState([])
    // const [style_choose, setStyle_choose] = useState('bold')
    // load vao day ten cac vi, cac vi chon duoc se nam trong bien WalletChoose
    const listWallet = [
        {
            label : 'Vi tong'
        },
        {
            label : 'Vi 1'
        },
        {
            label: 'Vi 2'
        }
    ]

    const data_plot = {
        labels: ["Swim", "Bike", "Run", "thu"], // optional
        data: [0.4, 0.6, 0.5, 1]
      };

    const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
    };
    
    const LoadingMapType = (choosemap) => {
        if (choosemap === true) {
            return (
                <View style = {{alignItems : 'center', margin:5}}>
                    <Text> Thu Nhap Map</Text>
                     <ProgressChart
                        data={data_plot}
                        width={Dimensions.get('window').width * 0.8}
                        height={200}
                        strokeWidth={16}
                        radius={20}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </View>
               
            )
        }   
        else{
            return (
                <View style = {{alignItems : 'center', margin:5}}>
                    <Text> Thu Nhap Map</Text>
                    <ProgressChart
                        data={data_plot}
                        width={Dimensions.get('window').width * 0.8}
                        height={200}
                        strokeWidth={16}
                        radius={20}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </View>
                
            )
        }
    }

    const DeletaDanhMuc = () => {

        // goi ham xoa giao dich

       console.log("da xoa giao dich")
    }


    const AlerBottom = () => {
        Alert.alert('Canh bao','Ban co chac chan muon xoa giao dich khong', [
            {
                text: 'Roll Back',
                onPress : () => {
                    SetModalViewVisible(!modalView)
                }
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                DeletaDanhMuc()
                SetModalViewVisible(!modalView)}},
           
          ]);
    }
    const GetListWallet = async()=>{
        var List = [{"MaVi" : 'Vi00','TenVi': 'Ví Tổng' ,label :'Ví tổng', "Tien": 0, "SoDu": 0 }]
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
                setListVi(List)
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
        // Get số dư của ví
        // await db.transaction(async (tx) =>{
        //     await tx.executeSql(
        //       "SELECT * FROM DS_VI",
        //       [],
        //       (tx, results) =>{
        //         var sum = 0
        //         var vi = {"ID": '', "Tien": 0, label: ''}
        //         for (let i = 0; i < results.rows.length; i++){
        //             var a = results.rows.item(i)
        //             console.log(a)
        //             vi.ID = a.MaVi
        //             vi.Tien = a.Tien
        //             sum += a.Tien
        //             vi.label = a.TenVi
        //             List.push(vi)
        //         }
        //         List[0].Tien = sum
        //         console.log(List)
        //         setListVi(List)
        //       }
        //     )
        // }) 
    }
    const GetTenViByMaVi= (ID) =>{
        if (ListVi.length > 0){
            for( let i = 0; i < ListVi.length; i++){
                if (ListVi[i].MaVi == ID)
                    return ListVi[i].TenVi
            }
        }

    }
    const GetSoDuByMaVi= (ID) =>{
        if (ListVi.length > 0){
            for( let i = 0; i < ListVi.length; i++){
                if (ListVi[i].MaVi == ID)
                    return new Intl.NumberFormat().format(ListVi[i].SoDu) + '₫'
            }
        }

    }
    const GetGDByMaViGrByMaDanhMuc = async(ID, IsThu)=>{
        if (IsThu == true)
            IsThu = 1
        else
            IsThu = 0
        if (ID == 'Vi00'){
            await db.transaction(async (tx) =>{
                var List = []
                await tx.executeSql(
                  `SELECT MaVi, MaDanhMuc, SUM(Tien) FROM GIAODICH WHERE Thu == ${IsThu} GROUP BY MaDanhMuc`,
                  [],
                  async (tx, results) =>{
                    var sum = 0
                    for (let i = 0; i < results.rows.length; i++){
                        var a = results.rows.item(i)
                        List.push(a)
                        
                    }
                    setSelectedList(List)
                    return List
                  }
                )
                
            })
        }
        else
        await db.transaction(async (tx) =>{
            var List = []
            await tx.executeSql(
              `SELECT MaVi, MaDanhMuc, SUM(Tien) FROM GIAODICH WHERE MaVi == '${ID}' AND Thu == ${IsThu} GROUP BY MaDanhMuc`,
              [],
              async (tx, results) =>{
                var sum = 0
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    List.push(a)
                    
                }
                setSelectedList(List)
                return List
              }
            )
            
        })
         
    }

    const AddVi = async()=>{
        await db.transaction(async (tx)=> {
            await tx.executeSql(
            "INSERT INTO DS_VI (MaVi, TenVi, Tien) VALUES(?,?,?)",
            ['Vi01', 'Ví 1', 100000]
            )
            await tx.executeSql(
            "INSERT INTO DS_VI (MaVi, TenVi, Tien) VALUES(?,?,?)",
            ['Vi02', 'Ví 2', 200000]
            )
        })
    }
    const AddDM = async()=>{
        await db.transaction(async (tx)=> {
            await tx.executeSql(
            "INSERT INTO DANHMUC (MaDanhMuc, TenDanhMuc, ThuChi) VALUES(?,?,?)",
            ['MDM1', 'Lương', 1]
            )
            await tx.executeSql(
            "INSERT INTO DANHMUC (MaDanhMuc, TenDanhMuc, ThuChi) VALUES(?,?,?)",
            ['MDM2', 'Quà tặng', 1]
            )
        })
    }
    const AddGD = async()=>{
        await db.transaction(async (tx)=> {
            await tx.executeSql(
            "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            ['GD01', 'Vi01', 50000, 1,'2023/22/02', 'MDM1', 'asd']
            )
            await tx.executeSql(
            "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            ['GD02', 'Vi01', 20000, 1,'2023/22/02', 'MDM1', 'asd']
            )
            await tx.executeSql(
            "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            ['GD03', 'Vi01', 20000, 1,'2023/22/02', 'MDM1', 'asd']
            )
            await tx.executeSql(
            "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            ['GD04', 'Vi01', -10000, 0,'2023/22/02', 'MDM2', 'asd']
            )
            await tx.executeSql(
            "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            ['GD05', 'Vi02', 50000, 1,'2023/22/02', 'MDM3', 'asd']
            )
            await tx.executeSql(
            "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            ['GD06', 'Vi02', -10000, 0,'2023/22/02', 'MDM1', 'asd']
            )
            await tx.executeSql(
            "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            ['GD07', 'Vi02', -30000, 0,'2023/22/02', 'MDM2', 'asd']
            )
        })
    }
    
    
    useEffect(() => {
        AddVi()
        AddGD()
        AddDM()
        // getSoduVi()
        
        GetListWallet()
        // GetGDByMaViGrByMaDanhMuc('Vi01', 1)
      }, [])
    useEffect(() => {
        GetGDByMaViGrByMaDanhMuc(WalletChoose, isIncome)
    }, [WalletChoose, isIncome])
    let listItemView = (item) => {
        return (
            <TouchableOpacity
            onPress={() => {SetModalViewVisible(true)
            setSelectedGD(item)
            }}
            >
                <Text style = {styles.Row_view}> MaDanhMuc: {item.MaDanhMuc}       {new Intl.NumberFormat().format(item['SUM(Tien)'])} </Text>
            </TouchableOpacity>
        );
      };
    const show = ()=>{
        if (SelectedList != null)
            return(
                <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={SelectedList}
                            // ItemSeparatorComponent={listViewItemSeparator}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) =>listItemView(item)}
                    />
                     </View>
            
                 </View>
                </SafeAreaView>
                
            )
    }
  
    return(
        <View style = {{backgroundColor: '#d4d9d7', flex:1}}>
            <View style = {styles.header}>
                <View style = {{flexDirection:'column', marginTop:25, alignItems:'center'}}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{textAlign:'center', fontSize:25, color:'white', marginRight:5}}>
                            {GetTenViByMaVi(WalletChoose)}
                        </Text>
                        <View style={{marginTop:10}}>
                            <Modal 
                                animationType='slide'
                                transparent={true}
                                visible = {modalVisible}
                                onRequestClose={() => setModalVisible(!modalVisible)}    
                            >
                                <View style = {styles.showContainer}>
                                    <View style ={styles.showContainerCenter}>
                                        <Text style = {{marginLeft : 15, marginTop :10, fontSize:20}}>Chon tai khoan</Text>
                                        <ScrollView>
                                            <View>
                                                <RadioButtonRN 
                                                    data = {ListVi}
                                                    selectedBtn = {(e) => {console.log(e.MaVi)
                                                    setWalletChoose(e.MaVi)}}
                                                        />
                                            </View>
                                        </ScrollView>
                                       
                                    <Pressable onPress = {() => setModalVisible(!modalVisible)}>
                                            <Text style = {{fontSize:15, color:'green', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10}}> Chon </Text>
                                        </Pressable>
                                    </View>
                                    
                                </View>

                               


                            </Modal>

                            <Pressable
                                onPress={() => setModalVisible(true)}
                            >
                                <Ionicons name = 'caret-down-outline' color = 'white' fontSize='20'/>

                            </Pressable>
                           
                        </View>
                    </View>
                   <Text style = {{fontSize:20, fontWeight:'bold', color:'white'}}>
                        {GetSoDuByMaVi(WalletChoose)}
                   </Text>
                  
                </View>
                <View style = {{justifyContent:'space-between', flexDirection:'row', textAlignVertical:'center', paddingTop:40, marginBottom: 10}}>
                    <TouchableOpacity
                        style = {{marginLeft:100}}
                        onPress = {() => setIsIncome(false)}
                    >
                        {/* { isIncome === true ? <Text> </Text>} */}
                        { isIncome === false ? <Text style = {{fontSize:20, color: '#d15830', textDecorationLine : 'underline',
                    textDecorationStyle : 'solid', fontWeight : 'bold'}}> Chi Phi</Text> : <Text style = {styles.Income_s}> Chi Phi</Text>}
                         
                    </TouchableOpacity>       
                    <TouchableOpacity
                        style ={{marginRight:100}}   
                        onPress = {() => setIsIncome(true)} 
                    >
                         { isIncome === true ? <Text style = {{fontSize:20, color: '#d15830', textDecorationLine : 'underline',
                    textDecorationStyle : 'solid', fontWeight : 'bold'}}> Thu Nhap</Text> : <Text style = {styles.Income_s}> Thu Nhap</Text>}
                    </TouchableOpacity> 
                </View>
            </View>
            <ScrollView>
                <View style = {styles.body}>
                    <View style = {{flexDirection:'row', justifyContent:'space-between', paddingLeft:50, paddingRight:50, paddingTop:10}}>
                        <TouchableOpacity>
                            <Text style = {styles.Date_s}> Ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = {styles.Date_s}> Thang</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = {styles.Date_s}> Nam</Text>
                        </TouchableOpacity>
                    </View>
                
                    {isIncome === true ? LoadingMapType(true) : LoadingMapType(false)}

                    <View style={{alignItems:'flex-end', marginBottom: 10, marginRight:10}}>
                        <TouchableOpacity
                        onPress = {() => Alert.alert("mo trang add")}
                        >
                            <Ionicons name = 'md-add-circle-sharp' color = 'yellow' size = {40}/>
                        </TouchableOpacity>
                    </View>                
                </View>
                <View>
                    {/* <ScrollView> */}

                        <Modal 
                            animationType='slide'
                            transparent={false}
                            visible = {modalView}
                            onRequestClose={() => SetModalViewVisible(!modalView)}    
                        >
                            <View style = {styles.showContainer}>
                                {/* <ViewDetail data = {SelectedGD}/>
                                 */}

                                <ViewDetail_Type />
                                 
                                <Pressable onPress = {() => {
                                    // SetModalViewVisible(!modalView)
                                    AlerBottom()
                                
                                }}>
                                    <Text style = {{fontSize:15, color:'red', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10, backgroundColor :'white'}}> XOA </Text>
                                </Pressable>
                                
                            </View>

                            


                        </Modal>
                        
                        {/* <ViewDetail/> */}

                    {/* <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}
                    >

                        <Text style = {styles.Row_view}> Thu nhap1 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}>
                        <Text style = {styles.Row_view}> Thu nhap2 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}>
                        <Text style = {styles.Row_view}> Thu nhap3 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}>
                        <Text style = {styles.Row_view}> Thu nhap4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}>
                        <Text style = {styles.Row_view}> Thu nhap5 </Text>
                    </TouchableOpacity>
                </ScrollView> */}
                       {/* <TimeDatePicker
                        selectedDate={ moment().valueOf()}
                        // mode={time}
                        options={{
                            daysStyle: {
                                borderRadius: 16,
                                borderWidth: 0.5,
                                borderColor: "#f1f1f1",
                            },
                            is24Hour: false,
                        }}
                        onMonthYearChange={(month) => {
                            console.log("month: ", month);
                        }}
                        onSelectedChange={(selected) => {
                            console.log("selected: ", selected);
                        }}
                        onTimeChange={(time) => {
                            console.log("time: ", time);
                        }}
                    /> */}

                </View>
            </ScrollView>
        {show()}
        </View>
        
    )
}

const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.2,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        // flexDirection:'',
    },
    
    body: {
        backgroundColor : 'white',
        flexDirection:'column',
        width : Dimensions.get('window').width * 0.9,
        height : Dimensions.get('window').height * 0.4,
        borderRadius:10,
        marginLeft:20,
        marginTop:10,
        marginBottom: 5

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
    Income_s: {
        color :'white',
        fontSize:20,
    },
    Row_view : {
        backgroundColor:'white',
        width : Dimensions.get('window').width * 0.9,
        height : 50,
        borderRadius : 10,
        marginLeft : 20,
        marginTop: 5,



    },
    Date_s: {
        fontSize : 15
    }

})



export default Home;