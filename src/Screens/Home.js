import React, {useState} from 'react'
import {Text, View, StyleSheet, Dimensions, TouchableOpacity, Alert, Modal, Pressable, Button} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioButtonRN from 'radio-buttons-react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ProgressChart } from 'react-native-chart-kit';
import { SwipeListView } from 'react-native-swipe-list-view'
// import Icon from 'react-native-vector-icons'
import { TimeDatePicker } from 'react-native-time-date-picker';
import moment from 'moment';
import ViewDetail from '../Small_Components/ViewDetail';


const Home = () => {


    const [modalVisible, setModalVisible] = useState(false);
    const [modalView, SetModalViewVisible] = useState(false)
    const [WalletChoose, setWalletChoose] = useState('');
    const [isIncome, setIsIncome] = useState(false)
    // const [style_choose, setStyle_choose] = useState('bold')
    // load vao day ten cac vi, cac vi chon duoc se nam trong bien WalletChoose
    const listWallet = [
        {
            label : 'Vi tong'
        },
        {
            label : 'Vi 1'
        },
        {
            label: 'Vi 2'
        }
    ]

    const data_plot = {
        labels: ["Swim", "Bike", "Run", "thu"], // optional
        data: [0.4, 0.6, 0.5, 1]
      };

    const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0,
    color: (opacity = 0) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
    };
    
    const LoadingMapType = (choosemap) => {
        if (choosemap === true) {
            return (
                <View style = {{alignItems : 'center', margin:5}}>
                    <Text> Thu Nhap Map</Text>
                     <ProgressChart
                        data={data_plot}
                        width={Dimensions.get('window').width * 0.8}
                        height={200}
                        strokeWidth={16}
                        radius={20}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </View>
               
            )
        }   
        else{
            return (
                <View style = {{alignItems : 'center', margin:5}}>
                    <Text> Thu Nhap Map</Text>
                    <ProgressChart
                        data={data_plot}
                        width={Dimensions.get('window').width * 0.8}
                        height={200}
                        strokeWidth={16}
                        radius={20}
                        chartConfig={chartConfig}
                        hideLegend={false}
                    />
                </View>
                
            )
        }
    }

    const DeletaDanhMuc = () => {

        // goi ham xoa giao dich

       console.log("da xoa giao dich")
    }


    const AlerBottom = () => {
        Alert.alert('Canh bao','Ban co chac chan muon xoa giao dich khong', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                DeletaDanhMuc()
                SetModalViewVisible(!modalView)}},
          ]);
    }

  
    return(
        <View style = {{backgroundColor: '#d4d9d7', flex:1}}>
            <View style = {styles.header}>
                <View style = {{flexDirection:'column', marginTop:25, alignItems:'center'}}>
                    <View style = {{flexDirection: 'row'}}>
                        <Text style = {{textAlign:'center', fontSize:25, color:'white', marginRight:5}}>
                            Tong cong 
                        </Text>
                        <View style={{marginTop:10}}>
                            <Modal 
                                animationType='slide'
                                transparent={true}
                                visible = {modalVisible}
                                onRequestClose={() => setModalVisible(!modalVisible)}    
                            >
                                <View style = {styles.showContainer}>
                                    <View style ={styles.showContainerCenter}>
                                        <Text style = {{marginLeft : 15, marginTop :10, fontSize:20}}>Chon tai khoan</Text>
                                        <ScrollView>
                                            <View>
                                                <RadioButtonRN 
                                                    data = {listWallet}
                                                    selectedBtn = {(e) => {console.log(e.label)
                                                    setWalletChoose(e.label)}}
                                                />
                                            </View>
                                        </ScrollView>
                                       
                                    <Pressable onPress = {() => setModalVisible(!modalVisible)}>
                                            <Text style = {{fontSize:15, color:'green', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10}}> Chon </Text>
                                        </Pressable>
                                    </View>
                                    
                                </View>

                               


                            </Modal>

                            <Pressable
                                onPress={() => setModalVisible(true)}
                            >
                                <Ionicons name = 'caret-down-outline' color = 'white' fontSize='20'/>

                            </Pressable>
                           
                        </View>
                    </View>
                   <Text style = {{fontSize:20, fontWeight:'bold', color:'white'}}>
                        1T
                   </Text>
                  
                </View>
                <View style = {{justifyContent:'space-between', flexDirection:'row', textAlignVertical:'center', paddingTop:40, marginBottom: 10}}>
                    <TouchableOpacity
                        style = {{marginLeft:100}}
                        onPress = {() => setIsIncome(false)}
                    >
                        {/* { isIncome === true ? <Text> </Text>} */}
                        { isIncome === false ? <Text style = {{fontSize:20, color: '#d15830', textDecorationLine : 'underline',
                    textDecorationStyle : 'solid', fontWeight : 'bold'}}> Chi Phi</Text> : <Text style = {styles.Income_s}> Chi Phi</Text>}
                         
                    </TouchableOpacity>       
                    <TouchableOpacity
                        style ={{marginRight:100}}   
                        onPress = {() => setIsIncome(true)} 
                    >
                         { isIncome === true ? <Text style = {{fontSize:20, color: '#d15830', textDecorationLine : 'underline',
                    textDecorationStyle : 'solid', fontWeight : 'bold'}}> Thu Nhap</Text> : <Text style = {styles.Income_s}> Thu Nhap</Text>}
                    </TouchableOpacity> 
                </View>
            </View>
            <ScrollView>
                <View style = {styles.body}>
                    <View style = {{flexDirection:'row', justifyContent:'space-between', paddingLeft:50, paddingRight:50, paddingTop:10}}>
                        <TouchableOpacity>
                            <Text style = {styles.Date_s}> Ngay</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = {styles.Date_s}> Thang</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style = {styles.Date_s}> Nam</Text>
                        </TouchableOpacity>
                    </View>
                
                    {isIncome === true ? LoadingMapType(true) : LoadingMapType(false)}

                    <View style={{alignItems:'flex-end', marginBottom: 10, marginRight:10}}>
                        <TouchableOpacity
                        onPress = {() => Alert.alert("mo trang add")}
                        >
                            <Ionicons name = 'md-add-circle-sharp' color = 'yellow' size = {40}/>
                        </TouchableOpacity>
                    </View>                
                </View>
                <View>
                    {/* <ScrollView> */}

                        <Modal 
                            animationType='slide'
                            transparent={false}
                            visible = {modalView}
                            onRequestClose={() => SetModalViewVisible(!modalView)}    
                        >
                            <View style = {styles.showContainer}>
                                <ViewDetail/>
                                <Pressable onPress = {() => {
                                    // SetModalViewVisible(!modalView)
                                    AlerBottom()
                                
                                }}>
                                    <Text style = {{fontSize:15, color:'red', textAlign:'right', marginTop:30, marginRight : 20, marginBottom:10}}> XOA </Text>
                                </Pressable>
                                
                            </View>

                            


                        </Modal>

                        <Pressable
                            onPress={() => SetModalViewVisible(true)}
                        >
                            {/* <Ionicons name = 'caret-down-outline' color = 'white' fontSize='20'/> */}
                            <Text style = {styles.Row_view}> Thu nhap </Text>

                        </Pressable>
                        
                        {/* <ViewDetail/> */}

                    {/* <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}
                    >

                        <Text style = {styles.Row_view}> Thu nhap1 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}>
                        <Text style = {styles.Row_view}> Thu nhap2 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}>
                        <Text style = {styles.Row_view}> Thu nhap3 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}>
                        <Text style = {styles.Row_view}> Thu nhap4</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => Alert.alert("Mo ra trang chi tiet")}>
                        <Text style = {styles.Row_view}> Thu nhap5 </Text>
                    </TouchableOpacity>
                </ScrollView> */}
                       {/* <TimeDatePicker
                        selectedDate={ moment().valueOf()}
                        // mode={time}
                        options={{
                            daysStyle: {
                                borderRadius: 16,
                                borderWidth: 0.5,
                                borderColor: "#f1f1f1",
                            },
                            is24Hour: false,
                        }}
                        onMonthYearChange={(month) => {
                            console.log("month: ", month);
                        }}
                        onSelectedChange={(selected) => {
                            console.log("selected: ", selected);
                        }}
                        onTimeChange={(time) => {
                            console.log("time: ", time);
                        }}
                    /> */}

                </View>
            </ScrollView>
            
        </View>
        
    )
}

const styles = StyleSheet.create({
    header:{
        height : Dimensions.get('window').height * 0.2,
        width: Dimensions.get('window').width,
        backgroundColor: '#54b38a',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30,
        // flexDirection:'',
    },
    
    body: {
        backgroundColor : 'white',
        flexDirection:'column',
        width : Dimensions.get('window').width * 0.9,
        height : Dimensions.get('window').height * 0.4,
        borderRadius:10,
        marginLeft:20,
        marginTop:10,
        marginBottom: 5

    },
    showContainer : {
        backgroundColor: "rgba(0,0,0, 0.3)",
        flex: 1,
        alignContent:'center',
        alignItems:'center',
    },
    showContainerCenter:{
        backgroundColor : 'white',
        flexDirection:'column',
        marginTop : Dimensions.get('window').height * 0.2,
        height: 100,
        width : Dimensions.get('window').width * 0.9,
        height : Dimensions.get('window').height * 0.4,
        borderRadius:10,
    },
    Income_s: {
        color :'white',
        fontSize:20,
    },
    Row_view : {
        backgroundColor:'white',
        width : Dimensions.get('window').width * 0.9,
        height : 50,
        borderRadius : 10,
        marginLeft : 20,
        marginTop: 5,



    },
    Date_s: {
        fontSize : 15
    }

})



export default Home;