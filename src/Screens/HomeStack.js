import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewDetail_Type from './ViewDetail_Type';
import ViewDetail from '../Small_Components/ViewDetail';
import EditTransaction from '../Small_Components/EditTransaction';
import Home from './Home';
import Add from './Add';
import CreateCategory from './CreateCategory';
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name = 'ViewDetail_Type' component={ViewDetail_Type} />
        <Stack.Screen name = "ViewDetail" component={ViewDetail} />
        <Stack.Screen name = "EditTransaction" component={EditTransaction} />
        <Stack.Screen name="Thêm giao dịch" component={Add} />
        {/* <Stack.Screen name = 'Thêm danh mục' component={CreateCategory} /> */}
        <Stack.Screen name = 'CreateCategory' component={CreateCategory} />

    </Stack.Navigator>
  );
}
export default HomeStack