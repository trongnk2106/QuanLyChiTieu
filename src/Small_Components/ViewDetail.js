import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import EditTransaction from './EditTransaction';

const ViewDetail = () => {


    const [modalEdit, setModalEdit] = useState(false);


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

                        <EditTransaction/>


                    </Modal>
                    <Pressable onPress = { () => setModalEdit(true)}>
                        <Ionicons name ='md-pencil' color='white' size={30} style={{marginRight:10}}/>
                    </Pressable>
                   
                </View>
            </View>

            <View>
                <View>
                    <Text> So tien</Text>
                    <Text> Load so tien vao day</Text>
                </View>
                <View>
                    <Text> Tai khoan</Text>
                    <Text> Hien thi tai khoan chon vao day</Text>
                </View>
                <View>
                    <Text> Danh muc</Text>
                    <Text> Hien thi loai chi tieu</Text>
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
