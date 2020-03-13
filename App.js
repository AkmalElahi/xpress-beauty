/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
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
import SplashScreen from 'react-native-splash-screen'
const App = () => {
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
};

export default App;
