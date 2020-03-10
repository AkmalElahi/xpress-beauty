import React from 'react';
import { colors } from '../../configs/colors';
import { StatusBar, ActivityIndicator } from 'react-native'
import {  View } from 'native-base'

const Loader = () => (
    <View style={{flex:1, justifyContent:"center", backgroundColor:"white", opacity:0.5}}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
    </View>
);


export default Loader