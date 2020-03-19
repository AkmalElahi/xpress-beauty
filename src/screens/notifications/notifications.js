import React from 'react';
import { FlatList, Image, Text, ShadowPropTypesIOS } from 'react-native'
import { Container, Card, Left, Body, CardItem, H1, H3 } from 'native-base'
import promotion1 from '../../assets/promotion1.png'
import CustomHeader from '../../components/header/customHeader';
import Customfooter from '../../components/footer/customfooter';
import { colors } from '../../configs/colors';
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
const Notification = ({ navigation }) => {
    return (
        <Container style={{marginTop:"3%"}}>
            <CustomHeader header="Notifications" leftButton={() => navigation.goBack()} icon="arrow-back" />
            <FlatList
                data={notifications}
                renderItem={({ item }) => (
                    <Card>
                        <CardItem cardBody>
                            <Image source={item.image} style={{ height: 180, width: null, flex: 1 }} />
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>{item.title}</Text>
                                    <Text note style={{ fontSize: 14, color: "grey" }}>{item.text}</Text>
                                    <Text 
                                    style={{ fontSize: 14, color: colors.primaryBtn }}
                                    onPress={()=> navigation.navigate('NotificationDetail')}>Read more</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                )
                }
                keyExtractor={item => item.id}
            />
            <Customfooter navigation={navigation} />
        </Container>
    )
}

export default Notification