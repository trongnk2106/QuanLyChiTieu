import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewDetail_Type from './ViewDetail_Type';
import ViewDetail from '../Small_Components/ViewDetail';
import EditTransaction from '../Small_Components/EditTransaction';
import Home from './Home';
import Add from './Add';
import Categories from './Categories';
import CreateCategory from './CreateCategory';
const Stack = createNativeStackNavigator();

function CategoriesStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name = 'CreateCategory' component={CreateCategory} />
    </Stack.Navigator>
  );
}
export default CategoriesStack