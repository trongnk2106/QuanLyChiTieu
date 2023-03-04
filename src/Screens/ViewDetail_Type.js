import React, {useEffect, useState} from 'react'
import {Text, View, StyleSheet, Dimensions , TouchableOpacity, Modal, Pressable, Alert, SafeAreaView, FlatList, SectionList, Image } from 'react-native'
import { openDatabase } from 'react-native-sqlite-storage';
import { Line } from 'react-native-svg';
import { getUriFromSource } from 'react-native-svg/lib/typescript/LocalSvg';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';

import Ionicons from 'react-native-vector-icons/Ionicons'
import {ListIcon, getItem} from '../Small_Components/Icon';
import { Button, Icon } from 'react-native-elements';

const db =  openDatabase({ name: 'data.db', readOnly: false,createFromLocation : 1})


const ViewDetail_Type = ({route, navigation}) => {
    const {data} = route.params
    const [modalViewDetail, setModalViewDtail] = useState(false)
    const [List, setList] = useState([])
    const [sum, setsum] = useState(0)

    // Lấy danh sách giao dịch theo ví đã chọn hoặc tất cả và theo danh mục --> List và tính tổng --> sum
    const getListGD = async()=>{
        // Lấy tất cả giao dịch nếu chưa chọn ví
        if (data.MaVi == null){
            await db.transaction(async (tx) =>{
                var List = []
                var summ = 0
                await tx.executeSql(
                  `SELECT * FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND  GIAODICH.MaDanhMuc == '${data.MaDanhMuc}' ORDER BY Date `,
                  [],
                  async (tx, results) =>{
                    for (let i = 0; i < results.rows.length; i++){
                        var a = results.rows.item(i)
                        summ = summ + a.Tien
                        List.push(a)
                    }
                    setsum(summ)
                    setList(List)
                  }
                )
                
            })
        }
        // Lấy theo ví đã chọn
        else
            await db.transaction(async (tx) =>{
                var List = []
                await tx.executeSql(
                `SELECT * FROM GIAODICH, DANHMUC WHERE GIAODICH.MaDanhMuc == DANHMUC.MaDanhMuc AND GIAODICH.MaVi == '${data.MaVi}' AND GIAODICH.MaDanhMuc == '${data.MaDanhMuc}'`,
                [],
                async (tx, results) =>{
                    var summ = 0
                    for (let i = 0; i < results.rows.length; i++){
                        var a = results.rows.item(i)
                        List.push(a)
                        summ += Number(a.Tien)
                    }
                    setsum(summ)
                    setList(List)
                }
                )
                
            })
         
    }
    let listItemView = (item) => {
        return (
            <Pressable
            onPress={ () =>{navigation.navigate('ViewDetail', {MaGD : item.MaGD, data0: item})} }
            >
               <View style= {{marginTop: 10, marginHorizontal:5}}>
                    <View style = {{flexDirection : 'row',alignItems:'center'}}>
                    <Icon
                        reverse 
                        type={getItem(item.Icon, ListIcon)[0]}
                        size={20}
                        name={getItem(item.Icon, ListIcon)[1]}
                        color={item.Color}
                        />

                        <Text style = {{fontSize : 17}}>    {data.TenDanhMuc} </Text>
                        <Text  style={{fontSize: 17, textAlign:'right', flex:1}} >{new Intl.NumberFormat().format(item.Tien)}₫ </Text>
                    </View>
                </View>
            </Pressable>
        );
      };

    // Show giao dịch theo ngày
    const show = ()=>{
        if (List != null){
            const dat = [...List]
            // group giao dịch theo ngày
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
                <SafeAreaView style={{marginHorizontal: 15}}>
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

    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused){
            getListGD()
        }
    }, [isFocused])

    return(
        <View style={{backgroundColor : 'white', flex:1}}>
            <View style = {styles.header}> 
                <View style = {{ flexDirection:'row',marginTop:13}}> 
                    <Pressable onPress={() => {navigation.goBack()}} style = {{size: 30}}>
                        <Ionicons name = 'arrow-back' color = 'white' size={30} style={{marginLeft:25, marginTop:12}}/>
                    </Pressable>
                    <View style ={{alignItems :'center', justifyContent:'center', marginLeft: 95}}>
                        <Text style = {{color:'white', fontSize:20}}> {data.TenDanhMuc} </Text>
                        <Text style = {{color:'white', fontSize:20, fontWeight:'bold'}}> {new Intl.NumberFormat().format(sum) + ' ₫'} </Text>
                    </View>
                </View>
                
                
               
            </View>
            
            <View>
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
        borderBottomLeftRadius:40,
        borderBottomRightRadius:40,
        marginBottom: 20
    },
})

export default ViewDetail_Type;