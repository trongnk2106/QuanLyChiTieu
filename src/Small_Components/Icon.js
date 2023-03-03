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
  

const ListExpenseCategory = [
    {title: 'Ăn uống', name:'fast-food', type:'ionicon', iconColor:'#f1bb7b'},
    {title: 'Gia đình', name:'people', type:'ionicon', iconColor:'#579CCF'},
    {title: 'Cà phê', name:'coffee', type:'font-awesome', iconColor:'#549470'},
    {title: 'Giải trí', name:'gamepad', type:'font-awesome', iconColor:'#8F3842'},
    {title: 'Di chuyển', name:'car', type:'font-awesome', iconColor:'#9371A5'},
    {title: 'Tạp phẩm', name:'local-grocery-store', type:'material-icons', iconColor:'#ADAD53'},
    {title: 'Sức khỏe', name:'clinic-medical', type:'font-awesome-5', iconColor:'#D39376'},
    {title: 'Giáo dục', name:'school', type:'ionicon', iconColor:'#4A648B'},
    {title: 'Cho vay', name:'comments-dollar', type:'font-awesome-5', iconColor:'#A2BAB0'},
    {title: 'Khác', name:'question', type:'font-awesome', iconColor:'#E0C0C0'},
    {title: 'Tạo', name:'plus', type:'font-awesome-5', iconColor:'#C0C0C0'},
] 

const ListIncomeCategory = [
    {title: 'Lương', name:'attach-money', type:'material-icons', iconColor:'#549470'},
    {title: 'Thu', name:'money', type:'font-awesome', iconColor:'#8F3842'},
    {title: 'Quà tặng', name:'ios-gift', type:'ionicon', iconColor:'#ADAD53'},
    {title: 'Sở thích', name:'search-dollar', type:'font-awesome-5', iconColor:'#f1bb7b'},
    {title: 'Khác', name:'question', type:'font-awesome', iconColor:'#9371A5'},
    {title: 'Tạo', name:'plus', type:'font-awesome-5', iconColor:'#C0C0C0'},
] 


export {ListIcon, ListExpenseCategory, ListIncomeCategory, getIcon}