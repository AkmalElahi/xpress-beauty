import React from 'react';
import { colors } from '../../configs/colors';
import { StatusBar, ActivityIndicator,Image } from 'react-native'
import {  View,  } from 'native-base'
import loader from '../../assets/loader.gif'
const Loader = () => (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        {/* <ActivityIndicator size='large' color={colors.primaryBtn}/> */}
        <Image source={loader} style={{width:60, height:60}}/>
        <StatusBar barStyle="default" />
    </View>
);


export default Loader