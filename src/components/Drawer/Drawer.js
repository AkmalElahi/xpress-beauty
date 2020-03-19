import React, { Component } from 'react';
import { Content, View, Thumbnail, Icon, } from 'native-base';
import { StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import { colors } from '../../configs/colors';
import profile from '../../assets/promotion1.png'
import avatar from '../../assets/avatar.png'
import notification from '../../assets/notification.png'
import bookings from '../../assets/bookings.png'
import { connect } from 'react-redux';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const radius = width * 0.5


class DrawerContent extends Component {

  // closeDrawer = () => {
  //   this.drawer._root.close()
  // }
  // openDrawer = () => {
  //   this.drawer._root.open()
  // };
  state = {
    photo:null
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        console.log("IMAGE", response)
        this.setState({ photo: response });
      }
    });
  };
  render() {
    const { username } = this.props
    const { photo } = this.state
    return (
      <Content style={styles.content}>
        <TouchableOpacity style={styles.imageViewer} onPress={this.handleChoosePhoto}>
          <Thumbnail source={photo ? photo : avatar} style={styles.image} />
          <Text style={styles.username}>{username}</Text>
        </TouchableOpacity>
        <View style={styles.mainContent}>
          <TouchableOpacity style={styles.option} >
            <Icon name="calendar" style={styles.optionImage} />
            <Text style={styles.optionText}>Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Icon name="ios-chatboxes" style={styles.optionImage} />
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.option}>
            <Icon name="ios-chatboxes" style={styles.optionImage} />
            <Text style={styles.optionText}>Chats</Text>
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.option}>
            <Icon name='md-settings' style={styles.optionImage} />
            <Text style={styles.optionText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Icon name="md-help" style={styles.optionImage} />
            <Text style={styles.optionText}>Help</Text>
          </TouchableOpacity>
        </View>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
  content: {
    backgroundColor: colors.clr1,
    // marginTop:"5%",
    marginBottom: 0,
    paddingBottom: 0
  },
  imageViewer: {
    height: height * 0.2,
    marginTop: "15%",
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: width * 0.2,
    width: width * 0.2,
    borderRadius: radius
  },
  username: {
    paddingLeft: "10%",
    fontSize: 20,
    color: "white"
  },
  mainContent: {
    marginTop:"5%",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    height: "60%"
  },
  option: {
    flexDirection: "row",
    width: "60%",
    // backgroundColor:"blue"
    alignItems: "center",
    alignSelf: "center",
  },
  optionText: {
    fontSize: 16,
    color: "white",
    paddingLeft: "2%"
  },
  optionImage: {
    // width: 20,
    // height: 20,
    color:"white"
  }
})
const mapStateToProps = ({ user }) => (user)
export default connect(mapStateToProps)(DrawerContent)