import React from 'react';
import { FlatList, Image, Text, ShadowPropTypesIOS } from 'react-native'
import { Container, Card, Left, Body, CardItem, H1, H3, Content } from 'native-base'
import promotion1 from '../../assets/promotion1.png'
import CustomHeader from '../../components/header/customHeader';
import Customfooter from '../../components/footer/customfooter';
import { colors } from '../../configs/colors';
import { connect } from 'react-redux';
import moment from 'moment';
const notifications = [{
    id: 1,
    image: promotion1,
    title: "Your rating is valueable!",
    text: "Don't forget to rate your services"
}, {
    id: 2,
    image: promotion1,
    title: "Your rating is valueable!",
    text: "Don't forget to rate your services"
},
{
    id: 2,
    image: promotion1,
    title: "Your rating is valueable!",
    text: "Don't forget to rate your services"
}]
const Notification = ({ navigation, notifications }) => {
    console.log(" NOTIFICATIONS IN SCREEN", notifications)

    return (
        <Container style={{ marginTop: "3%" }}>
            <CustomHeader header="Notifications" leftButton={() => navigation.goBack()} icon="arrow-back" />
            {!!notifications.notifications?.length ? <FlatList
                data={notifications.notifications}
                renderItem={({ item }) => (
                    <Card>
                        <CardItem cardBody>
                            <Image source={{ uri: item.link }} style={{ height: 180, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text style={{ textAlign: "right", fontSize: 12 }}>{moment(item.date).format('hh.mm')}</Text>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
                                    <Text note style={{ fontSize: 14, color: "grey" }}>{item.short_dec}</Text>
                                    <Text
                                        style={{ fontSize: 14, color: colors.primaryBtn }}
                                        onPress={() => navigation.navigate('NotificationDetail', {
                                            notification: item
                                        }

                                        )}>Read more</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                )
                }
                keyExtractor={item => item.id}
            /> :<Content/>}
            <Customfooter navigation={navigation} />
        </Container>
    )
}
const mapStateToProps = ({ notifications:{notifications} }) => ({notifications})
export default connect(mapStateToProps)(Notification)