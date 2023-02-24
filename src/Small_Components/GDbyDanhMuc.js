import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button, SafeAreaView, FlatList} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EditTransaction from './EditTransaction';
import { openDatabase } from 'react-native-sqlite-storage';

import { useFrameCallback } from 'react-native-reanimated';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})

const ViewGD = () => {


    const [modalEdit, setModalEdit] = useState(false);
    const [SelectedList, setSelectedList] = useState([])
    const [ListDanhMuc, SetListDanhMuc] = useState([])
    const [SumMoney, setSumMoney] = useState(0)
    const GetGDByMaVi_MaDanhMuc_Thu = async(ID, IsThu, MaDM)=>{
        if (IsThu == true)
            IsThu = 1
        else
            IsThu = 0
        if (ID == 'Vi00'){
            await db.transaction(async (tx) =>{
                var List = []
                await tx.executeSql(
                  `SELECT * FROM GIAODICH WHERE Thu = ${IsThu} AND MaDanhMuc == '${MaDM}' `,
                  [],
                  async (tx, results) =>{
                    var sum = 0
                    for (let i = 0; i < results.rows.length; i++){
                        var a = results.rows.item(i)
                        List.push(a)
                        sum += Number(a.Tien)
                    }
                    setSelectedList(List)
                    setSumMoney(sum)
                  }
                )
                
            })
        }
        else
        await db.transaction(async (tx) =>{
            var List = []
            await tx.executeSql(
              `SELECT * FROM GIAODICH WHERE MaVi == '${ID}' AND Thu == ${IsThu} AND MaDanhMuc == '${MaDM}'`,
              [],
              async (tx, results) =>{
                var sum = 0
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    List.push(a)
                    sum += Number(a.Tien)
                }
                setSelectedList(List)
                setSumMoney(sum)
              }
            )
            
        })
         
    }
    const GetListDanhMuc = async () =>{
        await db.transaction(async (tx) =>{
            var List = []
            await tx.executeSql(
              "SELECT * FROM DANHMUC",
              [],
              async (tx, results) =>{
                var sum = 0
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    List.push(a)
                }
                SetListDanhMuc(List)
              }
            )
            
        })
    }
    const GetTenDanhMuc = (MaDM) => {
        if (ListDanhMuc.length > 0)
            for (let  i = 0; i < ListDanhMuc.length; i++)
                if (ListDanhMuc[i].MaDanhMuc == MaDM)
                    return ListDanhMuc[i].TenDanhMuc
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

    useEffect(() => {
        GetListDanhMuc()
        GetGDByMaVi_MaDanhMuc_Thu('Vi00',1,'MDM1')
      }, [])
    let listItemView = (item) => {
        return (
            <TouchableOpacity
            // onPress={() => SetModalViewVisible(true)}
            >
                <Text style = {styles.Row_view}> MaDanhMuc: {item.Date}  </Text>

                <Text style = {styles.Row_view}> MaDanhMuc: {GetTenDanhMuc(item.MaDanhMuc)}       {new Intl.NumberFormat().format(item.Tien)} </Text>
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
    const AlerBottom = () => {
        Alert.alert('Canh bao','Ban co chac chan muon xoa giao dich khong', [
            {
                text: 'Roll Back',
                onPress: () => {
                    console.log('quay tro lai')
                    setModalEdit(!modalEdit)
                }
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                console.log('da luu thay doi')
                setModalEdit(!modalEdit)}},
          ]);
    }



    return(
        <View style = {{backgroundColor:'#d4d9d7', flex: 1}}>
            <View style = {styles.header}>
                <View style = {{ flexDirection:'row',justifyContent:'space-between',marginTop:15}}> 
                    <Ionicons name='md-arrow-back' color='white' size={30} style={{marginLeft:10}}/>
                    <Text style= {{color:'white', fontSize:20}}> {GetTenDanhMuc('MDM1')} </Text>
                    <Text style= {{color:'white', fontSize:20}}> {SumMoney} </Text>
                    <Modal
                    animationType='slide'
                    transparent={false}
                    visible = {modalEdit}
                    onRequestClose={() => setModalEdit(!modalEdit)}
                    >

                        <EditTransaction/>

                        <Pressable onPress ={() => {
                            AlerBottom()
                        }}> 
                            <Text style = {{textAlign:'center'}}> Luu </Text>
                        </Pressable>


                    </Modal>
                    <Pressable onPress = { () => setModalEdit(true)}>
                        <Ionicons name ='md-pencil' color='white' size={30} style={{marginRight:10}}/>
                    </Pressable>
                   
                </View>
            </View>
            {show()}

        </View>
    )



}

const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.1,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
    },
})



export default ViewGD;
