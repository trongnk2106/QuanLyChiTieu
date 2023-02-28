import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions , TouchableOpacity, Modal, Pressable, Alert } from 'react-native'

import ViewDetail from '../Small_Components/ViewDetail';


const ViewDetail_Type = () => {
    
    const [modalViewDetail, setModalViewDtail] = useState(false)
    const [SelectedGD, setSelectedGD] = useState('')


    let listItemView = () => {
        return (
            <TouchableOpacity
            onPress={() => {setModalViewDtail(true)
            // setSelectedGD(item)
            }}
            >
               <View style= {{marginTop: 20}}>
                    <Text> Hien thi ngay thang cua giao dich thuoc danh muc </Text>
                    <View style = {{flexDirection : 'row', justifyContent:'space-between', marginLeft:5, marginRight : 5}}>
                        <Text style = {{fontSize : 17}}> Hien thi tung giao dich </Text>
                        <Text style = {{fontSize : 17}}> Hien thi so tien</Text>
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
    return(
        <View style={{backgroundColor : 'white', flex:1}}>
            <View style = {styles.header}>
                <View>
                    <Text style = {{textAlign: 'center', color:'white', fontSize:20, marginTop:5}}> Hien thi ten cua danh muc </Text>
                    <Text style = {{textAlign:'center', color:'white', fontSize:20, fontWeight:'bold'}}> Hien thi ra so tien cua danh muc</Text>
                </View>
               
            </View>
            <View>
                <Modal 
                animationType='None'
                transparent={false}
                visible = {modalViewDetail}
                onRequestClose = {() => modalViewDetail(!modalViewDetail)}
                >
                    <View>
                        <Text> Goi trang viewdetail cho nay, m lam database vao roi nen t goi bi loi</Text>
                        <Pressable onPress = {() => {
                                    // SetModalViewVisible(!modalView)
                                    AlerBottom()
                                
                                }}>
                                    <Text style = {{fontSize:15, color:'red', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10, backgroundColor :'white'}}> XOA </Text>
                                </Pressable>

                    </View>


                </Modal>
             
                {listItemView()}

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