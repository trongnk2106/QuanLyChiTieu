import Ionicons from 'react-native-vector-icons/Ionicons'
import {Text, View, StyleSheet, Dimensions , TouchableOpacity, Modal, Pressable, Alert, SafeAreaView, FlatList, SectionList, Image } from 'react-native'

const ListIcon = [
    {key: "Dichuyen", img: require('../../assets/car.png')},
    {key: "Coffee", img: require('../../assets/coffee.png')},
    {key: "GiaoDuc", img: require('../../assets/education.png')},
    {key: "GiaiTri", img: require('../../assets/entertainment.png')},
    {key: "GiaDinh", img: require('../../assets/family.png')},
    {key: "Gym", img: require('../../assets/fitness.png')},
    {key: "AnUong", img: require('../../assets/food.png')},
    // {key: "MDMCf", img: require('../../assets/food2.png')},
    {key: "QuaTang", img: require('../../assets/gift.png')},
    {key: "TapPham", img: require('../../assets/grocery.png')},
    {key: "SucKhoe", img: require('../../assets/health.png')},
    {key: "ChoVay", img: require('../../assets/loan.png')},
    {key: "Khac", img: require('../../assets/more.png')},
    {key: "Luong", img: require('../../assets/salary.png')},

] 
const getIcon =(x, color, List) =>{
    if (x != null){
        var img
        for (let  i = 0; i < List.length; i++){
            if (List[i].key == x)
                img = List[i].img
            }
        return (
            <Image
                source={img}
                style={{width: 40, height: 40, tintColor: color}}
                />
        )
    }
}
export {ListIcon, getIcon}