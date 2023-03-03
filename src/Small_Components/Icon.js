import Ionicons from 'react-native-vector-icons/Ionicons'
import {Text, View, StyleSheet, Dimensions , TouchableOpacity, Modal, Pressable, Alert, SafeAreaView, FlatList, SectionList, Image } from 'react-native'

const ListIcon = [
    {title: 'AnUong', name:'fast-food', type:'ionicon', iconColor:'#f1bb7b'},
    {title: 'GiaDinh', name:'people', type:'ionicon', iconColor:'#579CCF'},
    {title: 'CaPhe', name:'coffee', type:'font-awesome', iconColor:'#549470'},
    {title: 'GiaiTri', name:'gamepad', type:'font-awesome', iconColor:'#8F3842'},
    {title: 'DiChuyen', name:'car', type:'font-awesome', iconColor:'#9371A5'},
    {title: 'TapPham', name:'local-grocery-store', type:'material-icons', iconColor:'#ADAD53'},
    {title: 'SucKhoe', name:'clinic-medical', type:'font-awesome-5', iconColor:'#D39376'},
    {title: 'GiaoDuc', name:'school', type:'ionicon', iconColor:'#4A648B'},
    {title: 'ChoVay', name:'comments-dollar', type:'font-awesome-5', iconColor:'#A2BAB0'},
    {title: 'KhacChi', name:'question', type:'font-awesome', iconColor:'#E0C0C0'},
    {title: 'Luong', name:'attach-money', type:'material-icons', iconColor:'#549470'},
    {title: 'TienThuong', name:'money', type:'font-awesome', iconColor:'#8F3842'},
    {title: 'QuaTang', name:'ios-gift', type:'ionicon', iconColor:'#ADAD53'},
    {title: 'SoThich', name:'search-dollar', type:'font-awesome-5', iconColor:'#f1bb7b'},
    {title: 'KhacThu', name:'question', type:'font-awesome', iconColor:'#9371A5'},
    {title: 'Tao', name:'plus', type:'font-awesome-5', iconColor:'#C0C0C0'},
    {title: 'La', name:'leaf', type:'ionicon', iconColor:'#579CCF'},
    {title: 'ThuVien', name:'library', type:'ionicon', iconColor:'#579CCF'},
    {title: 'ChanThu', name:'paw', type:'ionicon', iconColor:'#579CCF'},
    {title: 'CaiBua', name:'hammer', type:'ionicon', iconColor:'#579CCF'},
    {title: 'TraiDat', name:'earth', type:'ionicon', iconColor:'#579CCF'},


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
  
const getItem = (tt, List)=>{
    if (tt != null){
        var tp, name
        for (let  i = 0; i < List.length; i++){
            if (List[i].title ==tt){
                tp = List[i].type
                name = List[i].name
                break
            }
            }
        return [tp, name]
    }
    return []
}
const ListExpenseCategory = [
    {title: 'AnUong', name:'fast-food', type:'ionicon', iconColor:'#f1bb7b'},
    {title: 'GiaDinh', name:'people', type:'ionicon', iconColor:'#579CCF'},
    {title: 'CaPhe', name:'coffee', type:'font-awesome', iconColor:'#549470'},
    {title: 'GiaiTri', name:'gamepad', type:'font-awesome', iconColor:'#8F3842'},
    {title: 'DiChuyen', name:'car', type:'font-awesome', iconColor:'#9371A5'},
    {title: 'TapPham', name:'local-grocery-store', type:'material-icons', iconColor:'#ADAD53'},
    {title: 'SucKhoe', name:'clinic-medical', type:'font-awesome-5', iconColor:'#D39376'},
    {title: 'GiaoDuc', name:'school', type:'ionicon', iconColor:'#4A648B'},
    {title: 'ChoVay', name:'comments-dollar', type:'font-awesome-5', iconColor:'#A2BAB0'},
    {title: 'KhacChi', name:'question', type:'font-awesome', iconColor:'#E0C0C0'},
    {title: 'TaoChi', name:'plus', type:'font-awesome-5', iconColor:'#C0C0C0'},
] 

const ListIncomeCategory = [
    {title: 'Luong', name:'attach-money', type:'material-icons', iconColor:'#549470'},
    {title: 'TienThuong', name:'money', type:'font-awesome', iconColor:'#8F3842'},
    {title: 'QuaTang', name:'ios-gift', type:'ionicon', iconColor:'#ADAD53'},
    {title: 'SoThich', name:'search-dollar', type:'font-awesome-5', iconColor:'#f1bb7b'},
    {title: 'KhacThu', name:'question', type:'font-awesome', iconColor:'#9371A5'},
    {title: 'TaoThu', name:'plus', type:'font-awesome-5', iconColor:'#C0C0C0'},
] 


export {ListIcon, ListExpenseCategory, ListIncomeCategory, getIcon, getItem}