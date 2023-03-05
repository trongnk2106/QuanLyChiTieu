import React, { useState } from 'react';
import { Button,StyleSheet, View, Text, FlatList,SafeAreaView,Alert } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ListItem, Icon } from 'react-native-elements';
import moment from 'moment';

class ClockAlarms {
  constructor(date,time) {
    //this.id=date+time
    this.date=date
    this.time=time
  }
}

function NotificationsScreen() {

  //const [selectedDate, setSelectedDate] = useState(null)
  //const [selectedTime, setSelectedTime] = useState(null)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  //const [elementVisible, setElementVisible] = useState(false);
  const [ArrStart,setArrStart]=useState([])


  const showDatePicker = () => {
  console.log('abc')
    setIsDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    //setElementVisible(true);
    setIsDatePickerVisible(false);
  };

  const handleConfirm = (item) => {
    var selectedDate=moment(item).format('DD-MM-YYYY ')
    var selectedTime=moment(item).format('hh:mm A')
    var bigItem=new ClockAlarms(selectedDate,selectedTime)
    var Arr=[...ArrStart]
    Arr.push(bigItem)
    setArrStart(Arr)
    hideDatePicker();
    return;

  };



  return (
   <View style={styles.mainContainer}>
      <Text style={styles.heading}>Alarms</Text>

      <SafeAreaView style={styles.listAlarms}>
        {ArrStart.map((item) =>
            <ListItem>
                <ListItem.Content>
                    <ListItem.Title style={styles.titleStyle}>{item.time}</ListItem.Title>
                    <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
                </ListItem.Content>
                <Button
                    title="Remove"
                    color='red'
                    onPress={()=>{
                  var Arr=[...ArrStart]
                  var removeIndex = Arr.findIndex((time) => item === time);
                  Arr.splice(removeIndex, 1);
                  setArrStart(Arr)
              }}
                />

              </ListItem>
         )}

      </SafeAreaView>

      <View style={styles.timePicker}>
        <Button style={styles.button} title="Show Date Picker" onPress={showDatePicker} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
   </View>

  );


  };

const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
    alignItems:'center',
    paddingTop:35,
  },
  heading:{
    fontSize:30,
    padding:10,
  },
  timePicker:{
    padding:10,
    width:'50%',
    bottom:20,
  },
  listAlarms:{
    flex:1,

    width:'100%'
  },
  button:{
    borderRadius:35,
  },
titleStyle: {
    fontWeight: 'bold',
    fontSize: 20 },
})
export default NotificationsScreen;
