import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EditTransaction from './EditTransaction';
import { ListIcon, getIcon } from './Icon';
import { openDatabase } from 'react-native-sqlite-storage';
const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})

const ViewDetail = ({route, navigation}) => {
    const {data0, data1} = route.params
    const [modalEdit, setModalEdit] = useState(false);
    const [ListVi, setListVi] = useState([])
    const [ListDanhMuc, SetListDanhMuc] = useState([])


    const getListVi = async () =>{    
        await db.transaction(async (tx) =>{
            await tx.executeSql(
            `SELECT * FROM DS_VI`,
            [],
            (tx, results) =>{
                var list = []
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    list.push(a)
                }
                setListVi(list)
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
    const Delete = async () =>{
        console.log(data1.MaGD)    
        await db.transaction(async (tx) =>{
            await tx.executeSql(
            `DELETE FROM GIAODICH WHERE MaGD = ?`,
            [data1.MaGD],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Giao dịch đã được xóa',
                    [
                      {
                        text: 'Ok',
                        onPress: () => navigation.navigate('Home'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  Alert.alert('Hệ thống đang xử lý');
                }
            }
            )
        })
    }
    useEffect(() => {
        getListVi()
        GetListDanhMuc()
      }, [])
    const getTenVi = (MaVi) =>{

        if (MaVi == 'Vi00')
            return 'Ví tổng'
        else if (ListVi.length > 0){
            for (let  i = 0; i<ListVi.length; i++)
                if (ListVi[i].MaVi == MaVi)
                    return ListVi[i].TenVi
        }
    }
    const GetTenDanhMuc = (MaDM) => {
        if (ListDanhMuc.length > 0)
            for (let  i = 0; i < ListDanhMuc.length; i++)
                if (ListDanhMuc[i].MaDanhMuc == MaDM)
                    return ListDanhMuc[i].TenDanhMuc
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
    const changeFormatDate = (day)  =>{
        var yyyy = day.slice(0,4)
        var mm = Number(day.slice(5,7))
        var dd = Number(day.slice(8,10))
        return ( dd + ' tháng ' + mm + ', ' + yyyy)
    }



    return(
        <View style = {{backgroundColor:'#d4d9d7', flex: 1}}>
            <View style = {styles.header}>
                <View style = {{ flexDirection:'row',justifyContent:'space-between',marginTop:15}}> 
                    <Pressable onPress={ () => navigation.goBack()}>
                        <Ionicons name='md-arrow-back' color='white' size={30} style={{marginLeft:10}}/>
                    </Pressable>
                    
                    <Text style= {{color:'white', fontSize:20}}> Chi tiet giao dich </Text>

                    {/* <Modal
                    animationType='slide'
                    transparent={false}
                    visible = {modalEdit}
                    onRequestClose={() => setModalEdit(!modalEdit)}
                    >

                        <EditTransaction data = {data}
                        TenTK = {getTenVi(data.MaVi)}
                        />

                        <Pressable onPress ={() => {
                            AlerBottom()
                        }}> 
                            <Text style = {{textAlign:'center'}}> Luu </Text>
                        </Pressable>


                    </Modal> */}
                    {/* <Pressable onPress = { () => setModalEdit(true)}>
                        <Ionicons name ='md-pencil' color='white' size={30} style={{marginRight:10}}/>
                    </Pressable> */}
                    <Pressable onPress={() => navigation.navigate('EditTransaction', {data0:data0, data1: data1, 
                    TenTK: getTenVi(data1.MaVi) })}>
                        <Ionicons name ='md-pencil' color='white' size={30} style={{marginRight:10}}/>
                    </Pressable>
                   
                </View>
            </View>

            <View>
                <View>
                    <Text> Số tiền</Text>
                    <Text> {new Intl.NumberFormat().format(data1.Tien) + ' ₫'}</Text>
                </View>
                <View>
                    <Text> Tài khoản</Text>
                    <Text> {getTenVi(data1.MaVi)}</Text>
                </View>
                <View>
                    <Text> Danh mục</Text>
                    <View style = {{flexDirection : 'row',alignItems:'center', marginLeft:5, marginRight : 5}}>
                        {getIcon(data1.Icon, data1.Color, ListIcon)}

                        <Text style = {{fontSize : 17}}>    {data1.TenDanhMuc} </Text>
                        <Text  style={{fontSize: 17, textAlign:'right', flex:1}} >{new Intl.NumberFormat().format(data1.Tien)}₫ </Text>
                    </View>
                </View>
                <View>
                    <Text> Ngày</Text>
                    <Text> {changeFormatDate(data1.Date)}</Text>
                </View>
            </View>
            <Button
            onPress={()=>{Delete()}}
            title="Xóa"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
            />               
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



export default ViewDetail;
