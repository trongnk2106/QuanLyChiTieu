import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Dimensions , TouchableOpacity, Modal, Pressable, Alert, SafeAreaView, FlatList, SectionList, Image } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import { Line } from 'react-native-svg';
import { getUriFromSource } from 'react-native-svg/lib/typescript/LocalSvg';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {ListIcon, getIcon} from '../Small_Components/Icon';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const ViewDetail_Type = ({route, navigation}) => {
    // console.log(route.params)
    const {data} = route.params
    const [modalViewDetail, setModalViewDtail] = useState(false)
    const [List, setList] = useState([])
    const [WalletChoose, setWalletChoose] = useState('Vi00')
    const [SelectedGD, setSelectedGD] = useState('')

    // console.log(data.MaVi)

    const getListGD = async()=>{
        if (data.MaVi == null){
            // console.log(data)
            await db.transaction(async (tx) =>{
                var List = []
                await tx.executeSql(
                  `SELECT * FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND  GIAODICH.MaDanhMuc == '${data.MaDanhMuc}' ORDER BY Date `,
                  [],
                  async (tx, results) =>{
                    for (let i = 0; i < results.rows.length; i++){
                        var a = results.rows.item(i)
                        List.push(a)
                    }
                    setList(List)
                  }
                )
                
            })
        }
        else
            await db.transaction(async (tx) =>{
                var List = []
                await tx.executeSql(
                `SELECT * FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaVi == '${data.MaVi}' AND GIAODICH.MaDanhMuc == '${data.MaDanhMuc}'`,
                [],
                async (tx, results) =>{
                    var sum = 0
                    for (let i = 0; i < results.rows.length; i++){
                        var a = results.rows.item(i)
                        List.push(a)
                        sum += Number(a.Tien)
                    }
                    setList(List)
                }
                )
                
            })
         
    }
    // const getIcon =(x, color) =>{
    //     if (x != null){
    //         var img
    //         for (let  i = 0; i < ListIcon.length; i++){
    //             if (ListIcon[i].key == x)
    //                 img = ListIcon[i].img
    //             }
    //         return (
    //             <Image
    //                 source={img}
    //                 style={{width: 40, height: 40, tintColor: color}}
    //                 />
    //         )
    //     }
    // }
    let listItemView = (item) => {
        return (
            <Pressable
            // onPress={() => {setModalViewDtail(true)
            // setSelectedGD(item)
            // }}
            onPress={ () =>{navigation.navigate('ViewDetail', {data0:data, data1: item})} }
            >
               <View style= {{marginTop: 20}}>
                    <View style = {{flexDirection : 'row',alignItems:'center', marginLeft:5, marginRight : 5}}>
                        {getIcon(item.Icon, item.Color, ListIcon)}

                        <Text style = {{fontSize : 17}}>    {data.TenDanhMuc} </Text>
                        <Text  style={{fontSize: 17, textAlign:'right', flex:1}} >{new Intl.NumberFormat().format(item.Tien)}₫ </Text>
                    </View>
                </View>
            </Pressable>
        );
      };

    const AlerBottom = () => {
        Alert.alert('Canh bao','Ban co chac chan muon xoa giao dich khong', [
            {
                text: 'Roll Back',
                onPress : () => {
                    setModalViewDtail(!modalViewDetail)
                }
            },
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                DeletaDanhMuc()
                setModalViewDtail(!modalViewDetail)}},
           
          ]);
    }
    const show = ()=>{
        if (List != null){
            const dat = [...List]
        const a =   groupBy(dat, 'Date')
        var key = Object.keys(a)
        var list = []
        for (let i = 0; i < key.length; i++){
            var ob = {
                title: key[i],
                data: a[key[i]],
            }
            list.push(ob)
        }
            return(
                <SafeAreaView style={styles.container}>
                <SectionList
                  sections={list}
                  keyExtractor={(item, index) => item + index}
                  renderItem={({item}) =>listItemView(item)}
                  renderSectionHeader={({section: {title}}) => (
                    <Text>{title}</Text>
                  )}
                />
              </SafeAreaView>
                    
            )
        }
    }
    const groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
          (rv[x[key]] = rv[x[key]] || []).push(x);
          return rv;
        }, {});
    };

    useEffect(() =>{
        getListGD()
    },[data.MaVi, data.MaDanhMuc])

    return(
        <View style={{backgroundColor : 'white', flex:1}}>
            <View style = {styles.header}>
                <View style = {{marginLeft: 20, marginTop:20, marginRight: Dimensions.get('window').width / 5}}>
                    <Pressable style = {{paddingRight: 30, size: 30}} onPress={() => {navigation.goBack()}}>
                        <Ionicons name = 'arrow-back' color = 'white' size={25}/>
                    </Pressable>
                </View>
                <View style ={{alignItems :'center'}}>
                    <Text style = {{textAlign: 'center', color:'white', fontSize:20, marginTop:5}}> {data.TenDanhMuc} </Text>
                    <Text style = {{textAlign:'center', color:'white', fontSize:20, fontWeight:'bold'}}> {new Intl.NumberFormat().format(data['SUM(Tien)']) + ' ₫'} </Text>
                    {/* <Text> in 1111</Text> */}
                </View>
                
               
            </View>
            
            <View>
                {/* <Pressable >
                    
                </Pressable> */}
                {/* <Modal 
                animationType='None'
                transparent={false}
                visible = {modalViewDetail}
                onRequestClose = {() => modalViewDetail(!modalViewDetail)}
                >
                    <View style = {styles.showContainer}>
                        <Text> Goi trang viewdetail cho nay, m lam database vao roi nen t goi bi loi</Text>
                        <ViewDetail data = {SelectedGD}/>
                                
                        <Pressable onPress = {() => {
                                    SetModalViewVisible(!modalView)
                                    AlerBottom()
                                
                                }}>
                                    <Text style = {{fontSize:15, color:'red', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10, backgroundColor :'white'}}> XOA </Text>
                                </Pressable>

                    </View>


                </Modal> */}
             
                {show()}

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
        flexDirection:'row'
    },
})

export default ViewDetail_Type;