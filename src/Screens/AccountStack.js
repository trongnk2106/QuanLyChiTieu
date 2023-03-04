import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewDetail_Type from './ViewDetail_Type';
import ViewDetail from '../Small_Components/ViewDetail';
import EditTransaction from '../Small_Components/EditTransaction';
import Home from './Home';
import Add from './Add';
import Acc from './ViewAccount';
import AddAcc from './AddAcc';
import EditAcc from '../Small_Components/EditAcc';
import Transfer_History from '../Small_Components/Transfer_History';
import Transfer from '../Small_Components/Transfer';
import ViewTranfer from '../Small_Components/ViewTranfer';
import EditHistory from '../Small_Components/Edit_History';
const Stack = createNativeStackNavigator();

function CreateAcc_Stack() {
  return (
    <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Acc" component={Acc} />
        <Stack.Screen name = 'AddAcc' component={AddAcc} />
        <Stack.Screen name = 'EditAcc' component={EditAcc}/>
        <Stack.Screen name = 'Transfer_History' component={Transfer_History}/>
        <Stack.Screen name = 'Transfer' component={Transfer}/>
        <Stack.Screen name = 'ViewTranfer' component={ViewTranfer} />
        <Stack.Screen name = 'EditHistory' component={EditHistory} />
        
    </Stack.Navigator>
  );
}
export default CreateAcc_Stack;