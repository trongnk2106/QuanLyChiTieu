import React, {useState, useEffect, useCallback} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, SafeAreaView, FlatList, Image} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { ProgressChart } from 'react-native-chart-kit';
import { SwipeListView } from 'react-native-swipe-list-view'
// import Icon from 'react-native-vector-icons'
import { TimeDatePicker } from 'react-native-time-date-picker';
import { openDatabase } from 'react-native-sqlite-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {ListIcon, getIcon, getItem} from '../Small_Components/Icon';
import { Button, Icon } from 'react-native-elements';
import { Agenda, Calendar } from 'react-native-calendars';

import moment from 'moment';
// import ViewDetail from '../Small_Components/ViewDetail';
import ViewDetail_Type from './ViewDetail_Type';
import ViewDetail from '../Small_Components/ViewDetail';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie } from "victory-native";



const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})

const Home = ({ navigation }) => {


    const [modalVisible, setModalVisible] = useState(false);
    const [modalViewWallet, SetModalViewVisibleWallet] = useState(false)
    const [WalletChoose, setWalletChoose] = useState('Vi00');
    const [isIncome, setIsIncome] = useState(false)
    const [ListVi, setListVi] = useState([])
    const [SelectedList, setSelectedList] = useState([])
    const [SelectedGD, setSelectedGD] = useState('')
    const [Key, SetKey] = useState([])
    
    const [graphicData, setGraphicData] = useState([])
    const [graphicColor, setGraphicColor] = useState([])

    const [acctionTrigger, setAcctionTrigger] = useState('ngay')



    const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
    const mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth()+1) : (new Date().getMonth() + 1)
  
    const timercurrent = new Date().getFullYear() + '-' + mm + '-' + dd

   
    // console.log('ngay mac dinh ',timercurrent)

    const [ngay, setNgay] = useState(`${timercurrent}`)
    const [thang, setThang] = useState(new Date().getMonth() + 1)
    const [nam, setNam] = useState(new Date().getFullYear())
    const [displayText, setDisplayText] = useState(`${timercurrent}`)
    const [pressedText, setPressedText] = useState('Ngày')

    // console.log(nam)
    // console.log("thang ",thang)
    // console.log("nam", nam)
   
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

    // console.log(SelectedGD)


    // const data_plot = {
    //     labels: ["Swim", "Bike", "Run", "thu"], // optional
    //     data: [0.4, 0.6, 0.5, 1]
    //   };

    // const chartConfig = {
    // backgroundGradientFrom: "#1E2923",
    // backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: "#08130D",
    // backgroundGradientToOpacity: 0,
    // color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
    // strokeWidth: 2, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false // optional
    // };
    
    
    const DeletaDanhMuc = () => {

        // goi ham xoa giao dich

       console.log("da xoa giao dich")
    }


    // const AlerBottom = () => {
    //     Alert.alert('Canh bao','Ban co chac chan muon xoa giao dich khong', [
    //         {
    //             text: 'Roll Back',
    //             onPress : () => {
    //                 SetModalViewVisible(!modalView)
    //             }
    //         },
    //         {
    //           text: 'Cancel',
    //           onPress: () => console.log('Cancel Pressed'),
    //           style: 'cancel',
    //         },
    //         {text: 'OK', onPress: () => {
    //             DeletaDanhMuc()
    //             SetModalViewVisible(!modalView)}},
           
    //       ]);
    // }
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
                // setListVi(List)
              }
            )
        })
        await db.transaction(async (tx) =>{
            await tx.executeSql(
                `SELECT * FROM GD_TK`,
                [],
              (tx, results) =>{
                var sum = 0
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    // console.log(a)
                    // sum += a["SUM(Tien)"]
                    // console.log(List[1])
                    for (let i = 1; i < List.length; i++){
                        if (List[i].MaVi == a.FromAcc)
                            List[i].SoDu -=a.Money
                        if (List[i].MaVi == a.ToAcc)
                            List[i].SoDu +=a.Money
                    }
                }
                // List[0].SoDu = List[0].Tien + sum
                setListVi(List)
              }
            )
        })
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
    const GetGDByMaViGrByMaDanhMuc = async(ID, IsThu, ngay, thang, nam, acctionTr)=>{
        // console.log(ID, IsThu)
        if (IsThu == true)
            IsThu = 1
        else
            IsThu = 0
        if (ngay !== null)
        if (acctionTr === 'ngay') {
            if (ID == 'Vi00'){
                await db.transaction(async (tx) =>{
                    var List = []
                    await tx.executeSql(
                      `SELECT GIAODICH.MaDanhMuc, DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color , SUM(Tien), GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND DANHMUC.ThuChi == ${isIncome} AND GIAODICH.Date == "${ngay}" GROUP BY GIAODICH.MaDanhMuc`,
                      [],
                      async (tx, results) =>{
                        var sum = 0
                        var chart = []
                        var charcolor = []
                        console.log(results.rows.length)
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            List.push(a)
                            // console.log(a)
                            const ite = {
                                y : Math.abs(a[`SUM(Tien)`]),
                                x : a.TenDanhMuc
                            }
                            charcolor.push(a.Color)
                            chart.push(ite)
                            // List[i].MaVi = 'Vi00'
                            
                        }
                        setGraphicData(chart)
                        setGraphicColor(charcolor)
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
                    `SELECT GIAODICH.MaDanhMuc,GIAODICH.MaVi ,DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color, SUM(Tien) FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaVi == '${ID}' AND DANHMUC.ThuChi == ${IsThu} AND GIAODICH.Date == "${ngay}" GROUP BY GIAODICH.MaDanhMuc`,
                    [],
                    async (tx, results) =>{
                        var sum = 0
                        var chart = []
                        var charcolor = []
                        for (let i = 0; i < results.rows.length; i++){
                            console.log(results.rows.length)
                            var a = results.rows.item(i)
                            // console.log(a)
                            List.push(a)
                            const itedate= {
                                y : Math.abs(a[`SUM(Tien)`]),
                                x : a.TenDanhMuc
                            }
                            charcolor.push(a.Color)
                            // console.log(ite)
                            chart.push(itedate)
    
                        }
                        setSelectedList(List)
                        setGraphicData(chart)
                        setGraphicColor(charcolor)
                        return List
                    }
                    )
                    
                })
             
        }
        else if (acctionTr === 'thang'){
            console.log('thuc thi trong thang', thang)
            
            if (ID == 'Vi00'){
                await db.transaction(async (tx) =>{
                    var List = []
                    await tx.executeSql(
                      `SELECT GIAODICH.MaDanhMuc, DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color , SUM(Tien), GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND DANHMUC.ThuChi == ${isIncome} GROUP BY GIAODICH.MaDanhMuc`,
                      [],
                      async (tx, results) =>{
                        var sum = 0
                        var chart = []
                        var charcolor = []
                        console.log(results.rows.length)
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            // console.log(a)
                            // console.log('thang home', a.Date.slice(6,9))
                            if (thang < 10) {
                               
                                if (a.Date.slice(6,7) === thang)
                                {
                                    List.push(a)
                                    console.log(a)
                                    const ite = {
                                        y : Math.abs(a[`SUM(Tien)`]),
                                        x : a.TenDanhMuc
                                    }
                                    charcolor.push(a.Color)
                                    chart.push(ite)
                                    // List[i].MaVi = 'Vi00'
                                }
                            }
                            else {
                                // console.log('thang lon hon 10')
                                console.log(a.Date.slice(5,7))
                                if (a.Date.slice(5,7) === thang)
                                {
                                List.push(a)
                                // console.log(a)
                                const ite = {
                                    y : Math.abs(a[`SUM(Tien)`]),
                                    x : a.TenDanhMuc
                                }
                                charcolor.push(a.Color)
                                chart.push(ite)
                                // List[i].MaVi = 'Vi00'
                            }
                            }
                            
                           
                            
                        }
                        setGraphicData(chart)
                        setGraphicColor(charcolor)
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
                    `SELECT GIAODICH.MaDanhMuc,GIAODICH.MaVi ,DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color, SUM(Tien), GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaVi == '${ID}' AND DANHMUC.ThuChi == ${IsThu} GROUP BY GIAODICH.MaDanhMuc`,
                    [],
                    async (tx, results) =>{
                        var sum = 0
                        var chart = []
                        var charcolor = []
                        for (let i = 0; i < results.rows.length; i++){
                            console.log(results.rows.length)
                            var a = results.rows.item(i)
                            // console.log(a)
                            if (thang < 10) {
                               
                                if (a.Date.slice(6,7) === thang)
                                {
                                    List.push(a)
                                    console.log(a)
                                    const ite = {
                                        y : Math.abs(a[`SUM(Tien)`]),
                                        x : a.TenDanhMuc
                                    }
                                    charcolor.push(a.Color)
                                    chart.push(ite)
                                    // List[i].MaVi = 'Vi00'
                                }
                            }
                            else {
                                // console.log('thang lon hon 10')
                                console.log(a.Date.slice(5,7))
                                if (a.Date.slice(5,7) === thang)
                                {
                                List.push(a)
                                // console.log(a)
                                const ite = {
                                    y : Math.abs(a[`SUM(Tien)`]),
                                    x : a.TenDanhMuc
                                }
                                charcolor.push(a.Color)
                                chart.push(ite)
                                // List[i].MaVi = 'Vi00'
                            }
                            }
    
                        }
                        setSelectedList(List)
                        setGraphicData(chart)
                        setGraphicColor(charcolor)
                        return List
                    }
                    )
                    
                })
        }
        else if (acctionTr === 'nam'){
            console.log('in nam')
            // console.log(nam)
            if (ID == 'Vi00'){
                await db.transaction(async (tx) =>{
                    var List = []
                    await tx.executeSql(
                      `SELECT GIAODICH.MaDanhMuc, DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color , SUM(Tien), GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND DANHMUC.ThuChi == ${isIncome} GROUP BY GIAODICH.MaDanhMuc`,
                      [],
                      async (tx, results) =>{
                        var sum = 0
                        var chart = []
                        var charcolor = []
                        console.log(results.rows.length)
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            // console.log('ngay thang in thang',a.Date)
                            // console.log(a.Date.slice(0,4))
                            // console.log('thang get tu triger', nam)
                            // console.log()
                            if (a.Date.slice(0,4) === `${nam}`)
                            {
                                // console.log('here')
                                // console.log(nam)
                                List.push(a)
                                // console.log(a)
                                const ite = {
                                    y : Math.abs(a[`SUM(Tien)`]),
                                    x : a.TenDanhMuc
                                }
                                charcolor.push(a.Color)
                                chart.push(ite)
                                // List[i].MaVi = 'Vi00'
                            }
                           
                            
                        }
                        setGraphicData(chart)
                        setGraphicColor(charcolor)
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
                    `SELECT GIAODICH.MaDanhMuc,GIAODICH.MaVi ,DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color, SUM(Tien), GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaVi == '${ID}' AND DANHMUC.ThuChi == ${IsThu} GROUP BY GIAODICH.MaDanhMuc`,
                    [],
                    async (tx, results) =>{
                        var sum = 0
                        var chart = []
                        var charcolor = []
                        for (let i = 0; i < results.rows.length; i++){
                            console.log(results.rows.length)
                            var a = results.rows.item(i)
                            // console.log(a)
                            if (a.Date.slice(0,4) === `${nam}`) {
                                List.push(a)
                                const itedate= {
                                y : Math.abs(a[`SUM(Tien)`]),
                                x : a.TenDanhMuc
                                 }
                                charcolor.push(a.Color)
                            // console.log(ite)
                                chart.push(itedate)
                            }
                            
    
                        }
                        setSelectedList(List)
                        setGraphicData(chart)
                        setGraphicColor(charcolor)
                        return List
                    }
                    )
                    
                })
        }
       
    }


    // console.log('gra', graphicData)

    // const AddVi = async()=>{
    //     await db.transaction(async (tx)=> {
    //         await tx.executeSql(
    //         "INSERT INTO DS_VI (MaVi, TenVi, Tien) VALUES(?,?,?)",
    //         ['Vi01', 'Ví 1', 100000]
    //         )
    //         await tx.executeSql(
    //         "INSERT INTO DS_VI (MaVi, TenVi, Tien) VALUES(?,?,?)",
    //         ['Vi02', 'Ví 2', 200000]
    //         )
    //     })
    // }
    // const AddDM = async()=>{
    //     await db.transaction(async (tx)=> {
    //         await tx.executeSql(
    //         "INSERT INTO DANHMUC (MaDanhMuc, TenDanhMuc, ThuChi) VALUES(?,?,?)",
    //         ['MDM1', 'Lương', 1]
    //         )
    //         await tx.executeSql(
    //         "INSERT INTO DANHMUC (MaDanhMuc, TenDanhMuc, ThuChi) VALUES(?,?,?)",
    //         ['MDM2', 'Quà tặng', 1]
    //         )
    //     })
    // }
    // const AddGD = async()=>{
    //     await db.transaction(async (tx)=> {
    //         await tx.executeSql(
    //             "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Date, MaDanhMuc, GhiChu ) VALUES(?,?,?,?,?,?)",
    //         ['GD01', 'Vi01', 50000,'2023/22/02', 'DMDiChuyen', '']
    //         )
    //         console.log(1)
            // await tx.executeSql(
            // "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            // ['GD02', 'Vi01', 20000, 1,'2023/22/02', 'MDM1', 'asd']
            // )
            // await tx.executeSql(
            // "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            // ['GD03', 'Vi01', 20000, 1,'2023/22/02', 'MDM1', 'asd']
            // )
            // await tx.executeSql(
            // "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            // ['GD04', 'Vi01', -10000, 0,'2023/22/02', 'MDM2', 'asd']
            // )
            // await tx.executeSql(
            // "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            // ['GD05', 'Vi02', 50000, 1,'2023/22/02', 'MDM3', 'asd']
            // )
            // await tx.executeSql(
            // "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            // ['GD06', 'Vi02', -10000, 0,'2023/22/02', 'MDM2', 'asd']
            // )
            // await tx.executeSql(
            // "INSERT INTO GIAODICH (MaGD, MaVi, Tien, Thu, Date, MaDanhMuc, GhiChu) VALUES(?,?,?,?,?,?,?)",
            // ['GD07', 'Vi02', -30000, 0,'2023/22/02', 'MDM2', 'asd']
            // )
    //     })
    // }
    // const Get = async()=>{
    //         await db.transaction(async (tx) =>{
    //             var List = []
    //             await tx.executeSql(
    //               `SELECT * FROM GIAODICH`,
    //               [],
    //               async (tx, results) =>{
    //                 var sum = 0
    //                 console.log(results.rows.length)
    //                 for (let i = 0; i < results.rows.length; i++){
    //                     var a = results.rows.item(i)
    //                     console.log(a)
    //                     List.push(a)
    //                     // List[i].MaVi = 'Vi00'
                        
    //                 }
    //               }
    //             )
                
    //         })
         
    // }


    const LoadingMapType = (choosemap) => {
        if (choosemap === true) {
            return (
                <View style = {{alignItems : 'center'}}>
                    <VictoryPie
                        data={graphicData}
                        colorScale = {graphicColor}
                        width={250}
                        height={250}
                        innerRadius={40}
                        style={{
                        labels: {
                        fill: 'white', fontSize: 15, paddingTop: 0,
                        }, }}
                        /> 
                </View>
               
               
            )
        }   
        else{
            return (
                <View style = {{alignItems : 'center'}}>
                    <VictoryPie
                        data={graphicData}
                        colorScale = {graphicColor}
                        width={400}
                        height={250}
                        innerRadius={40}
                        style={{
                        labels: {
                        fill: 'white', fontSize: 15, paddingTop: 0,
                        }, }}
                        /> 
                </View>
                
                
            )
        }
    }


    
    useEffect(() => {
        // AddVi()
        // Get()
        // AddDM()
        // getSoduVi()
        // AddGD()
        // GetListWallet()
        // GetGDByMaViGrByMaDanhMuc('Vi01', 1)
      }, [])
    useEffect(() => {
        GetGDByMaViGrByMaDanhMuc(WalletChoose, isIncome, ngay, thang, nam, acctionTrigger)
    }, [WalletChoose, isIncome, ngay, thang, nam, acctionTrigger])

    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            GetListWallet()
            GetGDByMaViGrByMaDanhMuc(WalletChoose, isIncome, ngay, thang, nam, acctionTrigger)
        }
    }, [isFocused])



     let listItemView = (item) => {
        return (
            
            <Pressable

            onPress={() => { 
                navigation.navigate('ViewDetail_Type', {data : item})
            }}
            style = {styles.Row_view}
            >   

            <Icon
              reverse 
              type={getItem(item.Icon, ListIcon)[0]}
              size={20}
              name={getItem(item.Icon, ListIcon)[1]}
              color={item.Color}
            />
                <Text  style={{fontSize: 16, flex:1}}>  {item.TenDanhMuc}</Text>
                <Text  style={{fontSize: 16, textAlign:'right', flex:1, marginRight: 10, color:'black'}} >{new Intl.NumberFormat().format(item['SUM(Tien)'])}₫ </Text>
            </Pressable>
        );
      };
      

    const show = ()=>{
        if (SelectedList != null){
            return(
                <SafeAreaView style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{flex: 1}}>
                        <FlatList
                            data={SelectedList}
                            scrollEnabled= {false}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({item}) =>listItemView(item)}
                    />
                     </View>
            
                 </View>
                </SafeAreaView>
                
            )
        }
            
    }
  
    return(
        <View style = {{backgroundColor: '#edece8', flex:1}}>
            <View style = {styles.header}>
                <View style = {{flexDirection:'column', marginTop:25, alignItems:'center'}}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{textAlign:'center', fontSize:25, color:'white', marginRight:5}}>
                            {GetTenViByMaVi(WalletChoose)}
                        </Text>
                        <View style={{marginTop:10}}>
                            {/* modal show select wallet */}
                            <Modal
                                animationType='slide'
                                transparent = {true}
                                visible= {modalViewWallet}
                                onRequestClose = {() => SetModalViewVisibleWallet(!modalViewWallet)}
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
                                   
                                <Pressable onPress = {() => SetModalViewVisibleWallet(!modalViewWallet)}>
                                        <Text style = {{fontSize:15, color:'green', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10}}> Chon </Text>
                                    </Pressable>
                                </View>
                                
                                </View>
                            </Modal>
                            <Pressable
                                onPress={() => {
                                    SetModalViewVisibleWallet(true)}}
                            >
                                <Ionicons name = 'caret-down-outline' color = 'white' size={25}/>

                            </Pressable>
                            <Modal 
                                animationType='slide'
                                transparent={true}
                                visible = {modalVisible}
                                onRequestClose={() => setModalVisible(!modalVisible)}    
                            > 
                                {acctionTrigger === 'ngay' ?
                                <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Calendar style={{borderRadius: 15}}
                                        onDayPress={(day) => {
                                            setNgay(day.dateString)
                                            console.log('ngay chon tu calender', day.dateString === timercurrent)
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
                                            [ngay] : {selected: true, marked: true, selectedColor: '#466A8F'}
                                        }}
                                    />

                                    <TouchableOpacity 
                                        style={styles.doneButton2} 
                                        onPress = {() => {
                                            setModalVisible(!modalVisible)
                                            setDisplayText(ngay)
                                        }}>
                                        <Text style={{color:'#FFFFFF'}}>Done</Text>
                                    </TouchableOpacity>
                                                    

                                    </View>
                                </View>    

                            : acctionTrigger === 'thang' ?
                            
                            <View style = {styles.showContainer}>
                                <View style ={styles.showContainerCenter}>
                                    <Text style = {{marginLeft:20, marginTop:15, fontSize:20}}>Chọn tháng</Text>
                                    <Text style = {{marginLeft:20, fontSize:16, marginVertical:5}}>Tháng {thang} năm {nam}</Text>
                                    <View style={{flexDirection:'row', marginHorizontal:15, marginVertical:10, justifyContent:'space-between'}}>
                                        <Icon name='chevron-left' type='evil-icons' size={30} color='#74B498'
                                            onPress={() => setNam(nam-1)}/>
                                        <Text style = {{fontSize:18, color:'#74B498',alignContent:'center'}}>{nam}</Text>
                                        <Icon name='chevron-right' type='evil-icons' size={30} color='#74B498'
                                            onPress={() => setNam(nam+1)}/>
                                        
                                    </View>
                                    
                                    <SafeAreaView style={styles.container}>
                                        <FlatList
                                            contentContainerStyle={{justifyContent:'center', alignItems:'flex-start', alignSelf:'center'}}
                                            horizontal={false}
                                            numColumns = {4}
                                            scrollEnabled= {false}
                                            data={[        
                                                {num: '1', label:'Tháng 1'},
                                                {num: '2', label:'Tháng 2'},
                                                {num: '3', label:'Tháng 3'},
                                                {num: '4', label:'Tháng 4'},
                                                {num: '5', label:'Tháng 5'},
                                                {num: '6', label:'Tháng 6'},
                                                {num: '7', label:'Tháng 7'},
                                                {num: '8', label:'Tháng 8'},
                                                {num: '9', label:'Tháng 9'},
                                                {num: '10', label:'Tháng 10'},
                                                {num: '11', label:'Tháng 11'},
                                                {num: '12', label:'Tháng 12'}]}
                                            renderItem={({item}) => <Button 
                                                                        title={item.label} titleStyle={{fontSize:14,color:thang == item.num ? 'white':'#999999'}}
                                                                        buttonStyle={{width:85,height:40,borderRadius:10,margin:2,
                                                                            backgroundColor: thang == item.num ? '#74B498':'transparent'}}
                                                                        onPress={() => {
                                                                            setThang(item.num)
                                                                        }}
                                                                    />}
                                            keyExtractor={item => item.num}
                                        />
                                    </SafeAreaView>

                                    
                                <Pressable onPress = {() => {
                                    setModalVisible(!modalVisible)
                                    setDisplayText('Tháng ' + thang + ' năm '+ nam)
                                }}>
                                    <Text style = {{fontSize:17, color:'green', textAlign:'right', marginTop:22, marginRight : 18, marginBottom:18}}> Chọn </Text>
                                </Pressable>
                                </View>
                            </View>

                            : acctionTrigger === 'nam' ?

                            <View style = {styles.showContainer}>
                                <View style ={styles.showContainerCenter}>
                                    <Text style = {{marginLeft:20, marginTop:15, fontSize:20}}>Chọn năm</Text>
                                    <Text style = {{marginLeft:20, fontSize:16, marginVertical:5}}>Năm {nam}</Text>
                                    <View style={{flexDirection:'row', marginHorizontal:45, marginVertical:10, justifyContent:'space-between'}}>
                                        <Icon name='chevron-left' type='evil-icons' size={30} color='#74B498'
                                            onPress={() => setNam(nam-1)}/>
                                        <Text style = {{fontSize:18, color:'#74B498',alignContent:'center'}}>{nam}</Text>
                                        <Icon name='chevron-right' type='evil-icons' size={30} color='#74B498'
                                            onPress={() => setNam(nam+1)}/>
                                    </View>
                                    {/* {console.log(nam)} */}
                                    <TextInput
                                        style={styles.inputText}
                                        placeholder='Nhập năm'
                                        keyboardType="numeric"
                                        onChangeText={(newYear) => setNam(newYear)}
                                        value={nam.toString()}
                                        />
                                    
                                    

                                    
                                <Pressable onPress = {() => {
                                    setModalVisible(!modalVisible)
                                    setDisplayText('Năm '+ nam)
                                }}>
                                    <Text style = {{fontSize:17, color:'green', textAlign:'right', marginTop:22, marginRight : 18, marginBottom:18}}> Chọn </Text>
                                </Pressable>
                                </View>
                            </View>


                            : null
                            }
                                

                            </Modal>

                           
                           
                        </View>
                    </View>
                   <Text style = {{fontSize:25, fontWeight:'bold', color:'white'}}>
                        {GetSoDuByMaVi(WalletChoose)}
                   </Text>
                  
                </View>
                <View style = {{justifyContent:'space-between', flexDirection:'row', textAlignVertical:'center', paddingTop:20, marginBottom: 10}}>
                    <TouchableOpacity
                        style = {{marginLeft:80}}
                        onPress = {() => setIsIncome(false)}
                    >
                        {/* { isIncome === true ? <Text> </Text>} */}
                        { isIncome === false ? <Text style = {{fontSize:18, color: '#F6D242', textDecorationLine : 'underline',
                    textDecorationStyle : 'solid', fontWeight : 'bold'}}>CHI PHÍ</Text> : <Text style = {styles.Income_s}>CHI PHÍ</Text>}
                         
                    </TouchableOpacity>       
                    <TouchableOpacity
                        style ={{marginRight:80}}   
                        onPress = {() => setIsIncome(true)} 
                    >
                         { isIncome === true ? <Text style = {{fontSize:18, color: '#F6D242', textDecorationLine : 'underline',
                    textDecorationStyle : 'solid', fontWeight : 'bold'}}>THU NHẬP</Text> : <Text style = {styles.Income_s}>THU NHẬP</Text>}
                    </TouchableOpacity> 
                </View>
            </View>
            <ScrollView>
                <View style = {styles.body}>
                    <View style = {{flexDirection:'row', justifyContent:'space-between', paddingLeft:50, paddingRight:50, paddingTop:10}}>
                        
                        <TouchableOpacity onPress = {() => {
                            setAcctionTrigger('ngay')
                            setModalVisible(true)
                            setPressedText('Ngày')
                        }}>
                            { pressedText === 'Ngày' ? <Text style = {{fontSize:16, color: '#54b38a', textDecorationLine : 'underline',
                            textDecorationStyle : 'solid', fontWeight : 'bold'}}>Ngày</Text> : <Text style = {styles.text_date}>Ngày</Text>}
                        </TouchableOpacity>

                        <TouchableOpacity onPress = {() => {
                            setPressedText('Tháng')
                            setAcctionTrigger('thang')
                            setModalVisible(true)
                        }}>
                            { pressedText === 'Tháng' ? <Text style = {{fontSize:16, color: '#54b38a', textDecorationLine : 'underline',
                            textDecorationStyle : 'solid', fontWeight : 'bold'}}>Tháng</Text> : <Text style = {styles.text_date}>Tháng</Text>}
                        </TouchableOpacity>



                        <TouchableOpacity onPress = {() => {
                            // setAcctionTrigger('ngay')
                            // setModalVisible(true)
                            setPressedText('Năm')
                            setAcctionTrigger('nam')
                            setModalVisible(true)
                        }}>
                            { pressedText === 'Năm' ? <Text style = {{fontSize:16, color: '#54b38a', textDecorationLine : 'underline',
                            textDecorationStyle : 'solid', fontWeight : 'bold'}}>Năm</Text> : <Text style = {styles.text_date}>Năm</Text>}
                        </TouchableOpacity>
                        
                    </View>

                    <Text style={{textAlign:'center', marginVertical:5,textDecorationLine:'underline'}}>{displayText}</Text>
                
                    {isIncome === true ? LoadingMapType(true) : LoadingMapType(false)}

                    <View style={{alignItems:'flex-end', marginBottom: 10, marginRight:10,  position: 'absolute',alignSelf: 'flex-end', marginTop: 250}}>
                        <TouchableOpacity
                            onPress = {() => {
                                navigation.navigate("Thêm giao dịch", {DataListVi: ListVi.slice(1), MaVi: WalletChoose} );
                            }}
                        >
                            <Ionicons name = 'md-add-circle-sharp' color = '#F6D242' size = {55}/>
                        </TouchableOpacity>
                    </View>                
                </View>
                {/* <View>
          

                        

                </View> */}
                {show()}
                {/* <View>
            
                </View> */}
            </ScrollView>
        

        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.19,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        // flexDirection:'',
    },
    inputText: {
        fontSize: 20, 
        borderBottomWidth: 2,
        borderBottomColor:'#4CA07C',
        width: 130,
        marginLeft: 30,
        marginTop: 20,
        marginBottom: 55,
        textAlign:'left',
        alignItems:'center'
      },
    body: {
        backgroundColor : 'white',
        flexDirection:'column',
        width : Dimensions.get('window').width * 0.9,
        height : Dimensions.get('window').height * 0.45,
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
        fontSize:18,
    },
    Row_view : {
        backgroundColor:'white',
        width : Dimensions.get('window').width * 0.9,
        height : 55,
        borderRadius : 10,
        marginLeft : 20,
        marginTop: 5,
        marginBottom: 2,
        flexDirection:'row',
        alignItems:'center'

    },
    text_date: {
        fontSize : 16
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

})



export default Home;