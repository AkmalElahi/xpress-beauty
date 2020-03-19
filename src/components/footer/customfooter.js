import React, { Component } from 'react';
import { StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { Footer, FooterTab, Button, Text, View } from 'native-base';
import bookings from '../../assets/bookings.png';
import treatment from '../../assets/treatment.png';
import checkout from '../../assets/checkout.png';
import { connect } from 'react-redux';
const height = Dimensions.get('window').height
// console.log(height)
class CustomFooter extends Component {
    state = {
        items: 0
    }
    componentDidUpdate(prevProps) {
        if (this.props.cart !== prevProps.cart) {
            console.log("SERVICES", this.props.cart)
            // const count = this.props.cart.services.length && this.props.cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + cartItem.quantity, 0)
            // console.log(count)
            // this.setState({
            //     items: count
            // })
        }
    }
    render() {
        return (
            <Footer style={{ elevation: 0, marginTop: 10, backgroundColor:"white" }} >
                <FooterTab style={styles.footer}>
                    <Button onPress={() => this.props.navigation.navigate("Bookings")}> 
                        <Image style={{ width: 35, height: 35 }} source={bookings} />
                        <Text style={{ color: "black" }}>Bookings</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate("Services")}>
                        <Image style={{ height: 35, width: 40 }} source={treatment} />
                        <Text style={{ color: "black" }}>Treatments</Text>
                    </Button>
                    <Button onPress={ () =>  this.props.count ? this.props.navigation.navigate("Checkout"):""} >
                        <Image style={{ height: 40, width: 35 }} source={checkout} />
                        <Text style={{ color: "black" }}>checkout</Text>
                        <View  style={styles.items}><Text style={{ textAlign: "center" }}>{this.props.count}</Text></View>
                    </Button>
                </FooterTab>
                
            </Footer>
        )
    }
}
const styles = StyleSheet.create({
    footer: {
        marginTop: 0,
        marginBottom: 0,
        paddingBottom: 0,
        alignSelf: "flex-end",
        backgroundColor: "white"
    },
    items: {
        // textAlign:"center",
        // backgroundColor:"blue",
        position: 'absolute',
        display: "flex",
        alignSelf: "center",
        // backgroundColor:"green"
        // width: 50,
        // top: Platform.OS === 'ios' ? "20%" : "15%",
        // right: Platform.OS === 'ios' ? "10%" : "9.5%",
        // zIndex:-1
    }
})
const mapStateToProps = ({ cart }) => ({
        // cart: cart,
        count: cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + cartItem.quantity, 0)
    })
export default connect(mapStateToProps)(CustomFooter);