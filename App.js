import React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Screens/Home';
import Acc from './src/Screens/SelectAccount';
import Add from './src/Screens/Add';
import Cal from './src/Screens/Calculator';
import Categories from './src/Screens/Categories';
import CreateCategory from './src/Screens/CreateCategory';

import ViewDetail_Type from './src/Screens/ViewDetail_Type';
import ViewDetail from './src/Small_Components/ViewDetail';
import EditTransaction from './src/Small_Components/EditTransaction';

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

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{headerShown : false}}>
        <Drawer.Screen name="Home" component={Home} /> 
        <Drawer.Screen name="Tai Khoan" component={Acc} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Thêm giao dịch" component={Add} />
        <Drawer.Screen name = 'ViewDetail_Type' component={ViewDetail_Type} />
        <Drawer.Screen name = "ViewDetail" component={ViewDetail} />
        <Drawer.Screen name = "EditTransaction" component={EditTransaction} />
        <Drawer.Screen name="Calculator" component={Cal} options={{drawerItemStyle:{height:0}}} />
        <Drawer.Screen name="Thêm danh mục" component={Categories} options={{drawerItemStyle:{height:0}}} />
        <Drawer.Screen name="Tạo danh mục" component={CreateCategory} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
