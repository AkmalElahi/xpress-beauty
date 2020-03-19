import React from 'react';
import { FlatList, Image, Text, ShadowPropTypesIOS } from 'react-native'
import { Container, Card, Left, Body, CardItem, } from 'native-base'
import promotion1 from '../../assets/promotion1.png'
import CustomHeader from '../../components/header/customHeader';
import Customfooter from '../../components/footer/customfooter';
import { colors } from '../../configs/colors';
// const notifications = [{
//     id: 1,
//     image: promotion1,
//     title: "Your rating is valueable!",
//     text: "Don't forget to rate your services"
// }, {
//     id: 2,
//     image: promotion1,
//     title: "Your rating is valueable!",
//     text: "Don't forget to rate your services"
// },
// {
//     id: 2,
//     image: promotion1,
//     title: "Your rating is valueable!",
//     text: "Don't forget to rate your services"
// }]
const NotificationDetail = ({ navigation }) => {
    return (
        <Container >
            <CustomHeader header="Notifications" leftButton={() => navigation.goBack()} icon="arrow-back" />
            
            <Customfooter navigation={navigation} />
        </Container>
    )
}

export default NotificationDetail