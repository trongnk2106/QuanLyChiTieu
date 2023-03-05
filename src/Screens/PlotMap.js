import React, {useState, useEffect, useCallback} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, SafeAreaView, FlatList, Image,processColor} from 'react-native'
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
import { VictoryBar, VictoryChart, VictoryTheme, VictoryPie, VictoryGroup } from "victory-native";
import { set } from 'react-native-reanimated';
import {BarChart} from 'react-native-charts-wrapper'



const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})

const PlotMap = ({ navigation }) => {


    const [modalVisible, setModalVisible] = useState(false);
    const [modalViewWallet, SetModalViewVisibleWallet] = useState(false)
    const [WalletChoose, setWalletChoose] = useState('Vi00');
    const [isIncome, setIsIncome] = useState(false)
    const [ListVi, setListVi] = useState([])
    const [SelectedList, setSelectedList] = useState([])
    const [SelectedGD, setSelectedGD] = useState('')
    const [Key, SetKey] = useState([])
    
    const [graphicData, setGraphicData] = useState({})
    const [GraphicxAxis, setGraphicxAxis] = useState({})
    const [graphicColor, setGraphicColor] = useState([])

    const [acctionTrigger, setAcctionTrigger] = useState('ngay')



    const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
    const mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth()+1) : (new Date().getMonth()) + 1
  
    const timercurrent = new Date().getFullYear() + '-' + mm + '-' + dd

//    console.log('dataset test', graphicData.dataSets)
//    console.log('xaxis', GraphicxAxis)
    // console.log('ngay mac dinh ',timercurrent)

    const [ngay, setNgay] = useState(`${timercurrent}`)
    const [thang, setThang] = useState(new Date().getMonth() + 1)
    const [nam, setNam] = useState(new Date().getFullYear())
    const [displayText, setDisplayText] = useState(`${timercurrent}`)
    const [pressedText, setPressedText] = useState('Ngày')
    const [choosemap, setChooseMap] = useState('chung')


    // console.log(ngay)

    const legend = {
        enabled: true,
        textSize: 14,
        form: "SQUARE",
        formSize: 15,
        xEntrySpace: 10,
        yEntrySpace: 5,
        wordWrapEnabled: true
      }
    const datagrap_ = {
        dataSets: [{
          values: [10000, 111554],
          label: 'Chi Phi',
          config: {
            drawValues: false,
            colors: [processColor('red')],
          }
        }, {
          values: [45125, 451212],
          label: 'Thu Nhap',
          config: {
            drawValues: false,
            colors: [processColor('green')],
          }
        }],
        config: {
          barWidth: 0.3,
          group: {
            fromX: 0,
            groupSpace: 0.5,
            barSpace: 0.1,
          },
        }
      }

    //   console.log(datagrap.dataSets[0].values)


    const xAxis_ = {
        valueFormatter: ['1990', '1991'],
        granularityEnabled: true,
        granularity: 1,
        axisMaximum: 5,
        axisMinimum: 0,
        centerAxisLabels: true
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
           
                    for (let i = 1; i < List.length; i++){
                        if (List[i].MaVi == a.FromAcc)
                            List[i].SoDu -=a.Money
                        if (List[i].MaVi == a.ToAcc)
                            List[i].SoDu +=a.Money
                    }
                }
          
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
        // if (ngay !== null)
        // const dd = new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()
        // const mm = new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth()+1) : (new Date().getMonth()) + 1
      
        const timercurrent = new Date().getFullYear() + '-' + mm + '-' + dd
        const predd = Number(ngay.slice(8)) - 1
        const aftdd = Number(ngay.slice(8)) + 1
        // const premm = Number(ngay.slice(5, 7)) - 1
        // const aftmm = Number(ngay.slice(5, 7)) + 1
        // console.log(ngay.slice(5, 7))
        // console.log('thang', thang)
        const preday = ngay.slice(0,8) + `${predd < 10 ? '0' + predd : predd}`
        const aftday = ngay.slice(0,8) + `${aftdd < 10 ? '0' + aftdd : aftdd}`
    
        

        if (acctionTr === 'ngay') {
            if (ID == 'Vi00'){
                await db.transaction(async (tx) =>{
                    var List = []
                    await tx.executeSql(
                      `SELECT GIAODICH.MaDanhMuc, DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color , GIAODICH.Tien, GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc  AND  GIAODICH.Date >= "${preday}" AND GIAODICH.Date <= "${aftday}" ORDER BY GIAODICH.Date ASC`,
                      [],
                      async (tx, results) =>{
                     
                        const datagrap = {
                            dataSets: [{
                              values: [0,0,0],
                              label: 'Chi Phi',
                              config: {
                                drawValues: false,
                                colors: [processColor('red')],
                              }
                            }, {
                              values: [0,0,0],
                              label: 'Thu Nhap',
                              config: {
                                drawValues: false,
                                colors: [processColor('green')],
                              }
                            }],
                            config: {
                              barWidth: 0.2,
                              group: {
                                fromX: 0,
                                groupSpace: 0.5,
                                barSpace: 0.1,
                              },
                            }
                          }

               
                    
                        const xAxis = {
                            valueFormatter: [preday, ngay, aftday],
                            granularityEnabled: true,
                            granularity: 1,
                            axisMaximum: 3,
                            axisMinimum: 0,
                            centerAxisLabels: true
                          }

                        var sumthu_pre = 0
                        var sumchi_pre = 0
                        var sumthu_day = 0
                        var sumchi_day = 0
                        var sumthu_af= 0
                        var sumchi_af = 0
                        // var thoigian = ''
                        // console.log(datagrap.dataSets[0].values)
                        console.log(results.rows.length)
                        // results.rows.sort()
                        var temp = []
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            List.push(a)
                            // console.log(a)
                            // console.log('vi tong',a)
                            if (a.Date === preday){
                                if (a.Tien < 0) {sumchi_pre += Math.abs(a.Tien)}
                                else{sumthu_pre += a.Tien}
                            }

                            else if(a.Date === ngay){
                                if (a.Tien < 0) { sumchi_day += Math.abs(a.Tien)}
                                else{sumthu_day += a.Tien}
                            }
                            else if(a.Date === aftday){
                                if(a.Tien < 0){sumchi_af += Math.abs(a.Tien)}
                                else{sumthu_af+= a.Tien}
                            }
                        }
                        datagrap.dataSets[0].values[0] = sumchi_pre
                        datagrap.dataSets[0].values[1] = sumchi_day
                        datagrap.dataSets[0].values[2] = sumchi_af
                        datagrap.dataSets[1].values[0] = sumthu_pre
                        datagrap.dataSets[1].values[1] = sumthu_day
                        datagrap.dataSets[1].values[2] = sumthu_af

                       
                        setGraphicData(datagrap)
                
                        setGraphicxAxis(xAxis)
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
                    `SELECT GIAODICH.MaDanhMuc,GIAODICH.MaVi ,DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color,GIAODICH.Date, GIAODICH.Tien FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaVi == '${ID}' AND GIAODICH.Date >= "${preday}" AND GIAODICH.Date <= "${aftday}"  ORDER BY GIAODICH.Date ASC`,
                    [],
                    async (tx, results) =>{
                        const datagrap = {
                            dataSets: [{
                              values: [0,0,0],
                              label: 'Chi Phi',
                              config: {
                                drawValues: false,
                                colors: [processColor('red')],
                              }
                            }, {
                              values: [0,0,0],
                              label: 'Thu Nhap',
                              config: {
                                drawValues: false,
                                colors: [processColor('green')],
                              }
                            }],
                            config: {
                              barWidth: 0.2,
                              group: {
                                fromX: 0,
                                groupSpace: 0.5,
                                barSpace: 0.1,
                              },
                            }
                          }

               
                    
                        const xAxis = {
                            valueFormatter: [preday, ngay, aftday],
                            granularityEnabled: true,
                            granularity: 1,
                            axisMaximum: 3,
                            axisMinimum: 0,
                            centerAxisLabels: true
                          }

                        var sumthu_pre = 0
                        var sumchi_pre = 0
                        var sumthu_day = 0
                        var sumchi_day = 0
                        var sumthu_af= 0
                        var sumchi_af = 0
                        for (let i = 0; i < results.rows.length; i++){
                            // console.log(results.rows.length)
                            var a = results.rows.item(i)
                            // console.log(a)
                            List.push(a)
                            // console.log(a)
                            // console.log('tien',a.Tien)
                            if (a.Date === preday){
                                if (a.Tien < 0) {sumchi_pre += Math.abs(a.Tien)}
                                else{sumthu_pre += a.Tien}
                            }

                            else if(a.Date === ngay){
                                if (a.Tien < 0) { sumchi_day += Math.abs(a.Tien)}
                                else{sumthu_day += a.Tien}
                            }
                            else if(a.Date === aftday){
                                if(a.Tien < 0){sumchi_af += Math.abs(a.Tien)}
                                else{sumthu_af+= a.Tien}
                            }
    
                            
                        }
                        datagrap.dataSets[0].values[0] = sumchi_pre
                        datagrap.dataSets[0].values[1] = sumchi_day
                        datagrap.dataSets[0].values[2] = sumchi_af
                        datagrap.dataSets[1].values[0] = sumthu_pre
                        datagrap.dataSets[1].values[1] = sumthu_day
                        datagrap.dataSets[1].values[2] = sumthu_af

                        // console.log(sumthu_day)

                        setSelectedList(List)
                        setGraphicData(datagrap)
                        // setGraphicColor(charcolor)
                        setGraphicxAxis(xAxis)
                        // setGraphicData(chart)
                        // setGraphicColor(charcolor)
                        return List
                    }
                    )
                    
                })
             
        }
        else if (acctionTr === 'thang'){
            if (ID == 'Vi00'){
                await db.transaction(async (tx) =>{
                    var List = []
                    await tx.executeSql(
                      `SELECT GIAODICH.MaDanhMuc, DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color , GIAODICH.Tien, GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc ORDER BY GIAODICH.Date ASC`,
                      [],
                      async (tx, results) =>{
                        const datagrap = {
                            dataSets: [{
                              values: [0,0,0],
                              label: 'Chi Phi',
                              config: {
                                drawValues: false,
                                colors: [processColor('red')],
                              }
                            }, {
                              values: [0,0,0],
                              label: 'Thu Nhap',
                              config: {
                                drawValues: false,
                                colors: [processColor('green')],
                              }
                            }],
                            config: {
                              barWidth: 0.2,
                              group: {
                                fromX: 0,
                                groupSpace: 0.5,
                                barSpace: 0.1,
                              },
                            }
                          }

                        console.log(thang - 1)

                        

                        const xAxis = {
                            valueFormatter: [`${Number(thang) - 1} - ${nam}`, `${thang}-${nam}`, `${Number(thang) + 1} - ${nam}`],
                            granularityEnabled: true,
                            granularity: 1,
                            axisMaximum: 3,
                            axisMinimum: 0,
                            centerAxisLabels: true
                          }

                        var sumthu_pre = 0
                        var sumchi_pre = 0
                        var sumthu_day = 0
                        var sumchi_day = 0
                        var sumthu_af= 0
                        var sumchi_af = 0

                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            List.push(a)
                            var moth = a.Date.slice(5, 7)
                            var moth = Number(moth)
                            console.log('thang o day',moth )
                          
                                if (moth === (Number(thang) - 1))
                                {
                                    console.log('thang truoc')
                                    if (a.Tien < 0) {sumchi_pre += Math.abs(a.Tien)}
                                    else{sumthu_pre += a.Tien}
                              
                                }
                                else if(moth === Number(thang)){
                                    console.log('thang ngay')
                                    if (a.Tien < 0) { sumchi_day += Math.abs(a.Tien)}
                                    else{sumthu_day += a.Tien}
                                    }
                                else if(moth === (Number(thang) + 1)){
                                    console.log('thang sau')
                                    if(a.Tien < 0){sumchi_af += Math.abs(a.Tien)}
                                    else{sumthu_af+= a.Tien}
                                }

                            
                         
                            
                        }
                        datagrap.dataSets[0].values[0] = sumchi_pre
                        datagrap.dataSets[0].values[1] = sumchi_day
                        datagrap.dataSets[0].values[2] = sumchi_af
                        datagrap.dataSets[1].values[0] = sumthu_pre
                        datagrap.dataSets[1].values[1] = sumthu_day
                        datagrap.dataSets[1].values[2] = sumthu_af

                        setSelectedList(List)
                        setGraphicData(datagrap)
                        // setGraphicColor(charcolor)
                        setGraphicxAxis(xAxis)
                        return List
                      }
                    )
                    
                })
            }
            else
                await db.transaction(async (tx) =>{
                    var List = []
                    await tx.executeSql(
                    `SELECT GIAODICH.MaDanhMuc,GIAODICH.MaVi ,DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color, GIAODICH.Date, GIAODICH.Tien FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaVi == '${ID}'  ORDER BY GIAODICH.Date ASC`,
                    [],
                    async (tx, results) =>{

                        const datagrap = {
                            dataSets: [{
                              values: [0,0,0],
                              label: 'Chi Phi',
                              config: {
                                drawValues: false,
                                colors: [processColor('red')],
                              }
                            }, {
                              values: [0,0,0],
                              label: 'Thu Nhap',
                              config: {
                                drawValues: false,
                                colors: [processColor('green')],
                              }
                            }],
                            config: {
                              barWidth: 0.2,
                              group: {
                                fromX: 0,
                                groupSpace: 0.5,
                                barSpace: 0.1,
                              },
                            }
                          }

                        console.log(thang - 1)

                        

                        const xAxis = {
                            valueFormatter: [`${Number(thang) - 1} - ${nam}`, `${thang}-${nam}`, `${Number(thang) + 1} - ${nam}`],
                            granularityEnabled: true,
                            granularity: 1,
                            axisMaximum: 3,
                            axisMinimum: 0,
                            centerAxisLabels: true
                          }

                        var sumthu_pre = 0
                        var sumchi_pre = 0
                        var sumthu_day = 0
                        var sumchi_day = 0
                        var sumthu_af= 0
                        var sumchi_af = 0
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            List.push(a)
                            var moth = a.Date.slice(5, 7)
                            var moth = Number(moth)
                            console.log('thang o day',moth )
                          
                                if (moth === (Number(thang) - 1))
                                {
                                    // console.log('thang truoc')
                                    if (a.Tien < 0) {sumchi_pre += Math.abs(a.Tien)}
                                    else{sumthu_pre += a.Tien}
                              
                                }
                                else if(moth === Number(thang)){
                                    // console.log('thang ngay')
                                    if (a.Tien < 0) { sumchi_day += Math.abs(a.Tien)}
                                    else{sumthu_day += a.Tien}
                                    }
                                else if(moth === (Number(thang) + 1)){
                                    // console.log('thang sau')
                                    if(a.Tien < 0){sumchi_af += Math.abs(a.Tien)}
                                    else{sumthu_af+= a.Tien}
                                }

                            
                            
                        }
                        datagrap.dataSets[0].values[0] = sumchi_pre
                        datagrap.dataSets[0].values[1] = sumchi_day
                        datagrap.dataSets[0].values[2] = sumchi_af
                        datagrap.dataSets[1].values[0] = sumthu_pre
                        datagrap.dataSets[1].values[1] = sumthu_day
                        datagrap.dataSets[1].values[2] = sumthu_af

                        setSelectedList(List)
                        setGraphicData(datagrap)
                        // setGraphicColor(charcolor)
                        setGraphicxAxis(xAxis)
                        return List
                    }
                    )
                    
                })
        }
        else if (acctionTr === 'nam'){
           
            if (ID == 'Vi00'){
                await db.transaction(async (tx) =>{
                    var List = []
                    await tx.executeSql(
                      `SELECT GIAODICH.MaDanhMuc, DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color ,GIAODICH.Tien, GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc  ORDER BY GIAODICH.Date ASC `,
                      [],
                      async (tx, results) =>{

                        const datagrap = {
                            dataSets: [{
                              values: [0,0,0],
                              label: 'Chi Phi',
                              config: {
                                drawValues: false,
                                colors: [processColor('red')],
                              }
                            }, {
                              values: [0,0,0],
                              label: 'Thu Nhap',
                              config: {
                                drawValues: false,
                                colors: [processColor('green')],
                              }
                            }],
                            config: {
                              barWidth: 0.2,
                              group: {
                                fromX: 0,
                                groupSpace: 0.5,
                                barSpace: 0.1,
                              },
                            }
                          }

                        console.log(thang - 1)

                        

                        const xAxis = {
                            valueFormatter: [`${Number(nam) - 1}`, `${nam}`, `${Number(nam) + 1}`],
                            granularityEnabled: true,
                            granularity: 1,
                            axisMaximum: 3,
                            axisMinimum: 0,
                            centerAxisLabels: true
                          }

                        var sumthu_pre = 0
                        var sumchi_pre = 0
                        var sumthu_day = 0
                        var sumchi_day = 0
                        var sumthu_af= 0
                        var sumchi_af = 0
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            List.push(a)
                            var yea = a.Date.slice(0, 4)
                            var yea = Number(yea)
                            // console.log('thang o day',yea )
                          
                                if (yea === (Number(nam) - 1))
                                {
                                  
                                    if (a.Tien < 0) {sumchi_pre += Math.abs(a.Tien)}
                                    else{sumthu_pre += a.Tien}
                              
                                }
                                else if(yea === Number(nam)){
                                    
                                    if (a.Tien < 0) { sumchi_day += Math.abs(a.Tien)}
                                    else{sumthu_day += a.Tien}
                                    }
                                else if(yea === (Number(nam) + 1)){
                              
                                    if(a.Tien < 0){sumchi_af += Math.abs(a.Tien)}
                                    else{sumthu_af+= a.Tien}
                                }

                            
                            
                        }
                        datagrap.dataSets[0].values[0] = sumchi_pre
                        datagrap.dataSets[0].values[1] = sumchi_day
                        datagrap.dataSets[0].values[2] = sumchi_af
                        datagrap.dataSets[1].values[0] = sumthu_pre
                        datagrap.dataSets[1].values[1] = sumthu_day
                        datagrap.dataSets[1].values[2] = sumthu_af

                        setSelectedList(List)
                        setGraphicData(datagrap)
                      
                        setGraphicxAxis(xAxis)
                        return List
                      }
                    )
                    
                })
            }
            else
                await db.transaction(async (tx) =>{
                    var List = []
                    await tx.executeSql(
                    `SELECT GIAODICH.MaDanhMuc,GIAODICH.MaVi ,DANHMUC.TenDanhMuc,DANHMUC.Icon,DANHMUC.Color, GIAODICH.Tien, GIAODICH.Date FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaVi == '${ID}'  ORDER BY GIAODICH.Date ASC`,
                    [],
                    async (tx, results) =>{
                        const datagrap = {
                            dataSets: [{
                              values: [0,0,0],
                              label: 'Chi Phi',
                              config: {
                                drawValues: false,
                                colors: [processColor('red')],
                              }
                            }, {
                              values: [0,0,0],
                              label: 'Thu Nhap',
                              config: {
                                drawValues: false,
                                colors: [processColor('green')],
                              }
                            }],
                            config: {
                              barWidth: 0.2,
                              group: {
                                fromX: 0,
                                groupSpace: 0.5,
                                barSpace: 0.1,
                              },
                            }
                          }

                        console.log(thang - 1)

                        

                        const xAxis = {
                            valueFormatter: [`${Number(nam) - 1}`, `${nam}`, `${Number(nam) + 1}`],
                            granularityEnabled: true,
                            granularity: 1,
                            axisMaximum: 3,
                            axisMinimum: 0,
                            centerAxisLabels: true
                          }

                        var sumthu_pre = 0
                        var sumchi_pre = 0
                        var sumthu_day = 0
                        var sumchi_day = 0
                        var sumthu_af= 0
                        var sumchi_af = 0
                        for (let i = 0; i < results.rows.length; i++){
                            var a = results.rows.item(i)
                            List.push(a)
                            var yea = a.Date.slice(0, 4)
                            var yea = Number(yea)
                            // console.log('thang o day',yea )
                          
                                if (yea === (Number(nam) - 1))
                                {
                                  
                                    if (a.Tien < 0) {sumchi_pre += Math.abs(a.Tien)}
                                    else{sumthu_pre += a.Tien}
                              
                                }
                                else if(yea === Number(nam)){
                                    
                                    if (a.Tien < 0) { sumchi_day += Math.abs(a.Tien)}
                                    else{sumthu_day += a.Tien}
                                    }
                                else if(yea === (Number(nam) + 1)){
                              
                                    if(a.Tien < 0){sumchi_af += Math.abs(a.Tien)}
                                    else{sumthu_af+= a.Tien}
                                }

                            
                            
                        }
                        datagrap.dataSets[0].values[0] = sumchi_pre
                        datagrap.dataSets[0].values[1] = sumchi_day
                        datagrap.dataSets[0].values[2] = sumchi_af
                        datagrap.dataSets[1].values[0] = sumthu_pre
                        datagrap.dataSets[1].values[1] = sumthu_day
                        datagrap.dataSets[1].values[2] = sumthu_af

                        setSelectedList(List)
                        setGraphicData(datagrap)
                      
                        setGraphicxAxis(xAxis)
                        return List
                    }
                    )
                    
                })
        }
       
    }

    // console.log('graphic data', graphicData)
    const LoadingMapType = (choosemap) => {
        console.log(graphicData)
        if (choosemap === 'chung') {
            return (
                <View style = {{alignItems : 'center'}}>
                    <VictoryChart>
                        <VictoryGroup offset={25}
                            colorScale={['red', 'tomato']}
                    
                        >
                            <VictoryBar
                            data={graphicData}
                            />
                            
                        </VictoryGroup>
                    </VictoryChart>
                </View>
               
               
            )
        }   
        else if (choosemap === 'chiphi'){
            return (
                <View style = {{alignItems : 'center'}}>
                   <Text> Chi phi</Text>
                </View>
                
                
            )
        }
        else {
            return(
                <View>
                    <Text>
                        Thu nhap
                    </Text>
                </View>
            )
        }
    }


    
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
                <View style = {{flexDirection:'row'}}>
                    <Pressable style = {{marginLeft : 10, paddingRight: 30, marginTop:20}} onPress={() => {navigation.goBack(null)}}>
                                    <Ionicons name = 'arrow-back' color = 'white' size={30}/>
                        </Pressable>
                    <Text style = {{textAlign:'center', fontSize:25, color:'white', marginRight:10, marginLeft: 30, marginTop:22}}> Biểu Đồ </Text>
                </View>
                <View style = {{flexDirection:'column', marginTop:10, alignItems:'center'}}>
                    
                    <View style = {{flexDirection: 'row'}}>
                        
                        <Text style = {{textAlign:'center', fontSize:20, color:'white', marginRight:5}}>
                            {GetTenViByMaVi(WalletChoose)}
                        </Text>
                        <View style={{marginTop:10}}>
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
                            <View>
                            <Pressable
                                onPress={() => {
                                    SetModalViewVisibleWallet(true)}}
                            >
                                <Ionicons name = 'caret-down-outline' color = 'white' size={15}/>

                            </Pressable>
                            </View>
                            <Modal 
                                animationType='slide'
                                transparent={true}
                                visible = {modalVisible}
                                onRequestClose={() => setModalVisible(!modalVisible)}    
                            > 
                               { acctionTrigger === 'ngay' ?
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
                  
                </View>
                <View style = {{justifyContent:'space-between', flexDirection:'row', textAlignVertical:'center', paddingTop:20, marginBottom: 10}}>
                    <TouchableOpacity
                        style = {{marginLeft:50}}
                        onPress = {() => {
                    
                            setChooseMap('chung')
                    }}
                    >
                        {/* { isIncome === true ? <Text> </Text>} */}
                        { choosemap === 'chung' ? <Text style = {{fontSize:18, color: '#F6D242', textDecorationLine : 'underline',
                    textDecorationStyle : 'solid', fontWeight : 'bold'}}>CHUNG</Text> : <Text style = {styles.Income_s}>CHUNG</Text>}
                         
                    </TouchableOpacity>       
                    <TouchableOpacity
                        // style = {{marginLeft:80}}
                        onPress = {() => {setIsIncome(false)
                        setChooseMap('chiphi')
                    }}
                    >
                        {/* { isIncome === true ? <Text> </Text>} */}
                        { choosemap === 'chiphi' ? <Text style = {{fontSize:18, color: '#F6D242', textDecorationLine : 'underline',
                    textDecorationStyle : 'solid', fontWeight : 'bold'}}>CHI PHÍ</Text> : <Text style = {styles.Income_s}>CHI PHÍ</Text>}
                         
                    </TouchableOpacity>       
                    <TouchableOpacity
                        style ={{marginRight:50}}   
                        onPress = {() => {setIsIncome(true)
                        setChooseMap('thunhap')
                        }} 
                    >
                         { choosemap === 'thunhap' ? <Text style = {{fontSize:18, color: '#F6D242', textDecorationLine : 'underline',
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
                  
                    <View style={styles.container}>
                        <BarChart
                            style={styles.chart}
                            xAxis={GraphicxAxis}
                            data={graphicData}
                            legend={legend}
                            drawValueAboveBar={false}
                            // onSelect={this.handleSelect.bind(this)}
                            // onChange={(event) => console.log(event.nativeEvent)}
                            // highlights={this.state.highlights}
                            // marker={this.state.marker}
                        />
                        </View>

                
                    {/* {choosemap === 'chung' ? LoadingMapType('chung') : choosemap ==='chiphi' ? LoadingMapType('chiphi') : LoadingMapType('thunhap')} */}
                    <Text style={{textAlign:'center', marginVertical:5,textDecorationLine:'underline'}}>{displayText}</Text>

                </View>
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
        height : Dimensions.get('window').height * 0.8,
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
      container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
      },
      chart: {
        flex: 1
      }
})



export default PlotMap;