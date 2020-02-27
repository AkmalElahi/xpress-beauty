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
import { store } from './src/redux/store';
const AppContainer = createAppContainer(AppNavigator);
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
        <Container style={{ flex: 1 }}>
          <AppContainer />
        </Container>

      </>
    </Provider>
  );
};

export default App;