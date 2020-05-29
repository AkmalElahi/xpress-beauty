import React, { Component } from 'react';
import { FlatList, Image, Text, ShadowPropTypesIOS, View } from 'react-native'
import { Container, Card, CardItem, H1, H3, Content, Header, Left, Right, Body, Button, Title, Icon } from 'native-base'
import promotion1 from '../../assets/promotion1.png'
import CustomHeader from '../../components/header/customHeader';
import Customfooter from '../../components/footer/customfooter';
import { colors } from '../../configs/colors';
import { connect } from 'react-redux';
import moment from 'moment';
import { getFaqsMiddleware } from '../../redux/Help/help.middleware';
import Loader from '../../components/loader/Loader';
const notification = [{
    id: 1,
    image: promotion1,
    title: "Your rating is valueable! Don't forget to rate your services",
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
class Help extends Component {
    componentDidMount() {
        const { getFaqs, user } = this.props
        getFaqs({ appuid: user.appuid, token: user.token })
    }
    render() {
        const { navigation, faqs, loading } = this.props
        return (
            <>
                {
                    !!loading ? <Loader /> :
                        <Container >
                            <Header style={{
                                backgroundColor: "transparent",
                                elevation: 0
                            }} androidStatusBarColor={"white"} iosBarStyle="dark-content">

                                <Left style={{ flex: 1 }}>
                                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                                        <Icon name='arrow-back' style={{ color: "black" }} />
                                    </Button>
                                </Left>
                                <Body style={{ flex: 0 }}>
                                    <Title style={{ color: "black", fontWeight: "normal" }} >Details</Title>
                                </Body>
                                <Right style={{ flex: 1 }}>
                                    <Button transparent >
                                        {/* <Image source={bell} style={{ width: 20, height: 25 }} /> */}
                                    </Button>
                                </Right>
                            </Header>
                            <View style={{ width: "90%", alignSelf: "center" , padding:5, paddingLeft:0}}>
                                <Text>FAQs</Text>
                            </View>
                            {!!faqs ? <FlatList
                                data={faqs}
                                renderItem={({ item }) => (
                                    <Card>
                                        <CardItem button onPress={() => navigation.navigate("HelpDetail", {
                                            faq: item
                                        })}>
                                            <Text style={{ width: "95%" }}>
                                                {item.question}
                                            </Text>
                                            <Text style={{ marginLeft: 5, width: 15, alignSelf: "flex-end", textAlign: "center", fontSize: 18 }}>
                                                >
                                </Text>
                                        </CardItem>
                                        {/* <CardItem>
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
                            </CardItem> */}
                                    </Card>
                                )
                                }
                                keyExtractor={item => item.id}
                            /> : <Content />}
                            {/* <Customfooter navigation={navigation} /> */}
                        </Container>
                }
            </>
        )
    }
}

const mapStateToProps = ({ help: { faqs, loading }, user }) => ({ faqs, user, loading })
const mapDispatchToProps = dispatch => ({
    getFaqs: data => dispatch(getFaqsMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Help)