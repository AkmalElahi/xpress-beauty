import React, { Component } from 'react';
import { Content, View , } from 'native-base';
import { StyleSheet,Image, Text, Dimensions, TouchableOpacity } from 'react-native' 
import { colors } from '../../configs/colors';
import profile from '../../assets/promotion1.png'
import notification from '../../assets/notification.png'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const radius = width*0.5
class DrawerContent extends Component {
  closeDrawer = () => {
    this.drawer._root.close()
  }
  openDrawer = () => {
    this.drawer._root.open()
  };
  render() {
    return (
      <Content style={styles.content}>
        <View style={styles.imageViewer}>
          <Image source={profile} style={styles.image}/>
          <Text style={styles.username}>Xpress Beauty</Text>
        </View>
        <View style={styles.mainContent}>
          <TouchableOpacity style={styles.option}>
          <Image source={notification} style={styles.optionImage}/>
            <Text style={styles.optionText}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
          <Image source={notification} style={styles.optionImage}/>
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
          <Image source={notification} style={styles.optionImage}/>
            <Text style={styles.optionText}>Chats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
          <Image source={notification} style={styles.optionImage}/>
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
          <Image source={notification} style={styles.optionImage}/>
            <Text style={styles.optionText}>Cahts</Text>
          </TouchableOpacity>
        </View>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  content:{
    backgroundColor:colors.clr1,
    // marginTop:"5%",
    marginBottom:0,
    paddingBottom:0
  },
  imageViewer:{

    // backgroundColor:"green",
    height:height*0.2,
    marginTop:"15%",
    width:"90%",
    alignSelf:"center",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  image:{
    height:width*0.2,
    width:width*0.2,
    borderRadius:radius
  },
  username:{
    paddingLeft:"2%",
    fontSize:20,
    color:"white"
  },
  mainContent:{
    justifyContent:"space-between",
    width:"90%",
    alignSelf:"center",
    height:"100%"
  },
  option:{
    flexDirection:"row",
    width:"60%",
    // backgroundColor:"blue"
    alignItems:"center",
    alignSelf:"center"
  },
  optionText:{
    fontSize:16,
    color:"white",
    paddingLeft:"2%"
  },
  optionImage:{
    width:20,
    height:20
  }
})
export default DrawerContent