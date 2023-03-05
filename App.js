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
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import PlotMap from './src/Screens/PlotMap';

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


const Tab = createBottomTabNavigator();

export default function App() {
  return(

    <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
              headerShown : false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Trang chính') {
                  iconName = focused
                    ? 'home'
                    : 'home-outline';
                } else if (route.name === 'Danh mục') {
                  iconName = focused ? 'list' : 'list-outline';
                } else if (route.name === 'Tài khoản') {
                  iconName = focused ? 'card' : 'card-outline'
                } else if (route.name === 'Notifications') {
                    iconName = focused ? 'alarm' : 'alarm-outline'
                  }
                  else if (route.name === 'Bieu do'){
                    iconName = focused ? 'bar-chart' : 'bar-chart-outline'
                  }
               
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })} >
          <Tab.Screen name="Trang chính" component={HomeStack} /> 
          <Tab.Screen name="Danh mục" component={CategoriesStack}  />
          <Tab.Screen name="Bieu do" component={PlotMap}  />
          <Tab.Screen name="Tài khoản" component={CreateAcc_Stack} />
         

        </Tab.Navigator>
    </NavigationContainer>
  )
}
