import React from 'react';
import { FlatList, Image, Text, ShadowPropTypesIOS } from 'react-native'
import { Container, Card, Left, Body, CardItem, Content, } from 'native-base'
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
    const notification = navigation.getParam("notification")
    return (
        <Container style={{ height: "100%" }}>
            <CustomHeader header="Notifications" leftButton={() => navigation.goBack()} icon="arrow-back" />
            <Content>
                <Card style={{height:"100%"}}>
                    <CardItem cardBody>
                        <Image source={{ uri: notification.link }} style={{ height: 180, width: null, flex: 1 }} />
                    </CardItem>
                    <CardItem>
                        <Body>
                            {/* <Text style={{ textAlign: "right", fontSize: 12 }}>{moment(item.date).format('hh.mm')}</Text> */}
                            <Text style={{ fontWeight: "bold", fontSize: 16 }}>{notification.title}</Text>
                            <Text note style={{ fontSize: 14, color: "grey" }}>{notification.description}</Text>
                            {/* <Text
                                style={{ fontSize: 14, color: colors.primaryBtn }}
                                onPress={() => navigation.navigate('NotificationDetail')}>Read more</Text> */}
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Customfooter navigation={navigation} />
        </Container>
    )
}

export default NotificationDetail