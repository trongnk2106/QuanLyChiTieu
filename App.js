import React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Screens/Home';
import Acc from './src/Screens/ViewAccount';
import CreateAcc_Stack from './src/Screens/AccountStack';
import Add from './src/Screens/Add';
import Cal from './src/Screens/Calculator';
import Categories from './src/Screens/Categories';
import CreateCategory from './src/Screens/CreateCategory';
import EditCategory from './src/Screens/EditCategory';
import HomeStack from './src/Screens/HomeStack';
import ViewDetail_Type from './src/Screens/ViewDetail_Type';
import ViewDetail from './src/Small_Components/ViewDetail';
import EditTransaction from './src/Small_Components/EditTransaction';
import CategoriesStack from './src/Screens/CategoriesStack';
import PlotMap from './src/Screens/PlotMap';
import Icon from 'react-native-vector-icons/Ionicons';
// import StackedBarChartScreen from './src/test';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const MyTheme = {
  colors: {
    card: 'rgb(55, 115, 89)',
    text: 'rgb(255, 255, 255)',
  },
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Drawer.Navigator screenOptions={{
        headerShown : false, 
        drawerActiveTintColor:'#C4DDCA',
        drawerInactiveTintColor:'#C4DDCA',
      }}>
        <Drawer.Screen name="Trang chính" component={HomeStack} 
          options={{ drawerIcon: config => <Icon size={25} name={'home'} color={'#C4DDCA'}></Icon> }}/> 
        <Drawer.Screen name="Tài khoản" component={CreateAcc_Stack}
          options={{ drawerIcon: config => <Icon size={25} name={'card'} color={'#C4DDCA'}></Icon> }}/>
        <Drawer.Screen name="Bieu do" component={PlotMap}
          options={{ drawerIcon: config => <Icon size={25} name={'bar-chart'} color={'#C4DDCA'}></Icon> }}/>  

        <Drawer.Screen name="Nhắc nhở" component={NotificationsScreen}
          options={{ drawerIcon: config => <Icon size={25} name={'notifications'} color={'#C4DDCA'}></Icon> }}/> 
        {/* <Drawer.Screen name="Thêm giao dịch" component={Add} /> */}
        {/* <Drawer.Screen name = 'ViewDetail_Type' component={ViewDetail_Type} />
        <Drawer.Screen name = "ViewDetail" component={ViewDetail} />
        <Drawer.Screen name = "EditTransaction" component={EditTransaction} /> */}
        <Drawer.Screen name="Danh mục" component={CategoriesStack}
          options={{ drawerIcon: config => <Icon size={25} name={'list'} color={'#C4DDCA'}></Icon> }}/> 
        <Drawer.Screen name="Calculator" component={Cal} options={{drawerItemStyle:{height:0}}} />
        <Drawer.Screen name="CreateCategory" component={CreateCategory} options={{drawerItemStyle:{height:0}}} />
        <Drawer.Screen name="EditCategory" component={EditCategory} options={{drawerItemStyle:{height:0}}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
