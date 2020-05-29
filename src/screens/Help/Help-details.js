import React, { Component } from 'react';
import { FlatList, Image, Text, ScrollView, Dimensions } from 'react-native'
import { Container, Card, Left, Body, CardItem, Content, Right, Header, Title, Icon, Button } from 'native-base'
import promotion1 from '../../assets/promotion1.png'
import CustomHeader from '../../components/header/customHeader';
import Customfooter from '../../components/footer/customfooter';
import { colors } from '../../configs/colors';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import { faqDetailsMiddleware } from '../../redux/Help/help.middleware';

const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;
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
class HelpDetails extends Component {
    componentDidMount() {
        const { user, getFaqDetails, navigation } = this.props
        const faq = navigation.getParam("faq")
        getFaqDetails({ appuid: user.appuid, token: user.token, question_id: faq.id })
    }
    render() {
        const { faqDetails, navigation } = this.props
        console.log("DETAILS HTML IN COMPONRNT", faqDetails)
        return (
            <ScrollView style={{ flex: 1 }}>
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
                <HTML html={faqDetails} imagesMaxWidth={Dimensions.get('window').width} />
            </ScrollView>
        );
    }
}
const mapStateToProps = ({ help: { faqDetails, loading }, user }) => ({ faqDetails, user, loading })
const mapDispatchToProps = dispatch => ({
    getFaqDetails: data => dispatch(faqDetailsMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(HelpDetails)