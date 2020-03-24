/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StatusBar, TextInput } from 'react-native';
import { createAppContainer } from 'react-navigation';

import img from './src/assets/promotion1.png'
import Home from './src/screens/Home/Home';
import Promotion from './src/screens/promotions/Promotion';
import CustomSwiper from './src/components/swiper/Swiper';
import MobileVerify from './src/screens/mobile-varification/mobile-varification';
import RegisterCustomer from './src/screens/customer/register/RegisterCustomer';
import RegisterFreelancer from './src/screens/freelancer/Register/RegisterFreelancer';
import AppNavigator from './src/Navigation/Navigation';
import 'react-native-gesture-handler';
import { View, Container } from 'native-base';
import { Provider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
const AppContainer = createAppContainer(AppNavigator);
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage';

class App extends Component {

  async componentDidMount() {
    this.checkPermission();
  }
  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    console.log("ENABLED", enabled)
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      console.log("FCM TOKEN",fcmToken)
      if (fcmToken) {
        // user has a device token
        console.log("FCM TOKEN",fcmToken)
        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }
  async createNotificationListeners() {
    /*
    * Triggered when a particular notification has been received in foreground
    * */
    this.notificationListener = firebase.notifications().onNotification((notification) => {
        const { title, body } = notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
    * */
    this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    });
  
    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }
  
  showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }
  
  render() {
    // console.log("IN APP")
    return (
      <Provider store={store}>
        <>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          {/* <Home/> */}

          {/* <Promotion heading="About Us" img={img}/> */}
          {/* <CustomSwiper/> */}
          {/* <MobileVerify/> */}
          {/* <RegisterCustomer/> */}
          {/* <RegisterFreelancer/> */}
          <PersistGate persistor={persistor}>
            <Container style={{ flex: 1 }}>
              <AppContainer />
            </Container>
          </PersistGate>

        </>
      </Provider>
    );
  }
};

export default App;
