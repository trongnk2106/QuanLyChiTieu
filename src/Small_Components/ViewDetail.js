import React, {useState, useEffect} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EditTransaction from './EditTransaction';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { ListIcon, getItem } from './Icon';
import { openDatabase } from 'react-native-sqlite-storage';
import { Icon } from 'react-native-elements';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


// Chi tiết giao dịch được chọn
const ViewDetail = ({route, navigation}) => {
    const {MaGD} = route.params
    const [modalEdit, setModalEdit] = useState(false);
    const [ListVi, setListVi] = useState([])
    const [data, setData] = useState('')

    // Lấy chi tiết giao dịch được chọn --> data
    const getGD =async () =>{
        console.log('check')   
        await db.transaction(async (tx) =>{
            await tx.executeSql(
                `SELECT * FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaGD == '${MaGD}'`,
                [],
            (tx, results) =>{
                for (let i = 0; i < results.rows.length; i++){
                    var a = results.rows.item(i)
                    console.log(a)
                    setData(a)
                }
                // setdata(a)
            }
            )
        })
    }

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
    const Delete = async () =>{
        console.log(data.MaGD)    
        await db.transaction(async (tx) =>{
            await tx.executeSql(
            `DELETE FROM GIAODICH WHERE MaGD = ?`,
            [data.MaGD],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'Giao dịch đã được xóa',
                    [
                      {
                        text: 'Ok',
                        onPress: () => navigation.goBack(),
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
    // useEffect(() => {
    //     getListVi()

    //   }, [])
    const isFocused = useIsFocused()

      useEffect(() => {
          if(isFocused){
            getListVi()
            getGD()
          }
      }, [isFocused])  
    const getTenVi = (MaVi) =>{
        if (MaVi == 'Vi00')
            return 'Ví tổng'
        else if (ListVi.length > 0){
            for (let  i = 0; i<ListVi.length; i++)
                if (ListVi[i].MaVi == MaVi)
                    return ListVi[i].TenVi
        }
    }

    const changeFormatDate = (day)  =>{
        if (day !=null){
        var yyyy = day.slice(0,4)
        var mm = Number(day.slice(5,7))
        var dd = Number(day.slice(8,10))
        return ( dd + ' tháng ' + mm + ', ' + yyyy)
        }
        return []
    }



    return(
        <View style = {{backgroundColor:'#d4d9d7', flex: 1}}>
            <View style = {styles.header}>
                <View style = {{ flexDirection:'row',justifyContent:'space-between',marginTop:15}}> 
                    <Pressable onPress={ () => navigation.goBack()}>
                        <Ionicons name='md-arrow-back' color='white' size={30} style={{marginLeft:10}}/>
                    </Pressable>
                    
                    <Text style= {{color:'white', fontSize:20}}>  Chi tiết giao dịch </Text>
                    <Pressable onPress={() => navigation.navigate('EditTransaction', {data: data })}>
                        <Ionicons name ='md-pencil' color='white' size={30} style={{marginRight:10}}/>
                    </Pressable>
                   
                </View>
            </View>

            <View>
                <View>
                    <Text> Số tiền</Text>
                    <Text> {new Intl.NumberFormat().format(data.Tien) + ' ₫'}</Text>
                </View>
                <View>
                    <Text> Tài khoản</Text>
                    <Text> {getTenVi(data.MaVi)}</Text>
                </View>
                <View>
                    <Text> Danh mục</Text>
                    <View style = {{flexDirection : 'row',alignItems:'center', marginLeft:5, marginRight : 5}}>
                    <Icon
                        reverse 
                        type={getItem(data.Icon, ListIcon)[0]}
                        size={20}
                        name={getItem(data.Icon, ListIcon)[1]}
                        color={data.Color}
                        />

                        <Text style = {{fontSize : 17}}>    {data.TenDanhMuc} </Text>
                        <Text  style={{fontSize: 17, textAlign:'right', flex:1}} >{new Intl.NumberFormat().format(data.Tien)}₫ </Text>
                    </View>
                </View>
                <View>
                    <Text> Ngày</Text>
                    <Text> {changeFormatDate(data.Date)}</Text>
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
