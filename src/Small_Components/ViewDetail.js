import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EditTransaction from './EditTransaction';
import { openDatabase } from 'react-native-sqlite-storage';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})

const ViewDetail = (props) => {

    if (props.data != null)
        console.log(props.data)
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





    return(
        <View style = {{backgroundColor:'#d4d9d7', flex: 1}}>
            <View style = {styles.header}>
                <View style = {{ flexDirection:'row',justifyContent:'space-between',marginTop:15}}> 
                    <Ionicons name='md-arrow-back' color='white' size={30} style={{marginLeft:10}}/>
                    <Text style= {{color:'white', fontSize:20}}> Chi tiet giao dich </Text>

                    <Modal
                    animationType='slide'
                    transparent={false}
                    visible = {modalEdit}
                    onRequestClose={() => setModalEdit(!modalEdit)}
                    >

                        <EditTransaction data = {props.data}
                        TenTK = {getTenVi(props.data.MaVi)}
                        />

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

            <View>
                <View>
                    <Text> Số tiền</Text>
                    {/* <Text> {props.data['SUM(Tien)']} (tạm thời)</Text> */}
                </View>
                <View>
                    <Text> Tài khoản</Text>
                    {/* <Text> {getTenVi(props.data.MaVi)}</Text> */}
                </View>
                <View>
                    <Text> Danh muc</Text>
                    {/* <Text> {GetTenDanhMuc(props.data.MaDanhMuc)}</Text> */}
                </View>
                <View>
                    <Text> Hien thi ngay thang</Text>
                    <Text> load ngay thang vao tu database cua danh muc</Text>
                </View>
            </View>

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
