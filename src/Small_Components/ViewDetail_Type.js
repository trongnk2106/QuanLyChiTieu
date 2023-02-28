import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Dimensions , TouchableOpacity, Modal, Pressable, Alert, SafeAreaView, FlatList, SectionList } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import { Line } from 'react-native-svg';
import { getUriFromSource } from 'react-native-svg/lib/typescript/LocalSvg';

import ViewDetail from '../Small_Components/ViewDetail';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const ViewDetail_Type = (props) => {
    const [modalViewDetail, setModalViewDtail] = useState(false)
    const [List, setList] = useState([])
    const [SelectedGD, setSelectedGD] = useState('')

    const getListGD = async()=>{
        if (props.data.MaVi == null){
            await db.transaction(async (tx) =>{
                var List = []
                await tx.executeSql(
                  `SELECT * FROM GIAODICH WHERE MaDanhMuc == '${props.data.MaDanhMuc}' ORDER BY Date `,
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
                `SELECT * FROM GIAODICH WHERE MaVi == '${props.data.MaVi}' AND MaDanhMuc == '${props.data.MaDanhMuc}'`,
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

    let listItemView = (item) => {
        return (
            <TouchableOpacity
            onPress={() => {setModalViewDtail(true)
            setSelectedGD(item)
            }}
            >
               <View style= {{marginTop: 20}}>
                    <View style = {{flexDirection : 'row', justifyContent:'space-between', marginLeft:5, marginRight : 5}}>
                        <Text style = {{fontSize : 17}}> {props.data.TenDanhMuc} </Text>
                        <Text style = {{fontSize : 17}}> {new Intl.NumberFormat().format(item.Tien) + ' ₫'}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
    },[])

    return(
        <View style={{backgroundColor : 'white', flex:1}}>
            <View style = {styles.header}>
                <View>
                    <Text style = {{textAlign: 'center', color:'white', fontSize:20, marginTop:5}}> {props.data.TenDanhMuc} </Text>
                    <Text style = {{textAlign:'center', color:'white', fontSize:20, fontWeight:'bold'}}> {new Intl.NumberFormat().format(props.data['SUM(Tien)']) + ' ₫'} </Text>
                </View>
               
            </View>
            <View>
                <Modal 
                animationType='None'
                transparent={false}
                visible = {modalViewDetail}
                onRequestClose = {() => modalViewDetail(!modalViewDetail)}
                >
                    <View style = {styles.showContainer}>
                        {/* <Text> Goi trang viewdetail cho nay, m lam database vao roi nen t goi bi loi</Text> */}
                        <ViewDetail data = {SelectedGD}/>
                                
                        <Pressable onPress = {() => {
                                    // SetModalViewVisible(!modalView)
                                    AlerBottom()
                                
                                }}>
                                    <Text style = {{fontSize:15, color:'red', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10, backgroundColor :'white'}}> XOA </Text>
                                </Pressable>

                    </View>


                </Modal>
             
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
    },
})

export default ViewDetail_Type;