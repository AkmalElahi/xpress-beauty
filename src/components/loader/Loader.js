import React from 'react';
import { colors } from '../../configs/colors';
import { StatusBar, ActivityIndicator } from 'react-native'
import {  View } from 'native-base'

const Loader = () => (
    <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
        <ActivityIndicator size='large' color={colors.primaryBtn}/>
        <StatusBar barStyle="default" />
    </View>
);


export default Loader