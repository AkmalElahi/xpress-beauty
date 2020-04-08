import React, { Component } from 'react';
import { StyleSheet, Image, Platform, Dimensions } from 'react-native';
import { Footer, FooterTab, Button, Text, View, Toast } from 'native-base';
import bookings from '../../assets/bookings.png';
import bookings1 from '../../assets/bookings1.png';
import treatment from '../../assets/treatment.png';
import treatment1 from '../../assets/treatment1.png';
import checkout from '../../assets/checkout.png';
import checkout1 from '../../assets/checkout1.png';
import { connect } from 'react-redux';
import { colors } from '../../configs/colors';
const height = Dimensions.get('window').height
// console.log(height)
// #F52680
// #FD90C3
class CustomFooter extends Component {
    state = {
        items: 0
    }
    componentDidUpdate(prevProps) {
        if (this.props.cart !== prevProps.cart) {
            console.log("SERVICES", this.props.cart)
            if (this.props.count > prevProps.count) {
                Toast.show({
                    text: "Service Added to Cart",
                    textStyle: { textAlign: "center" },
                    style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                    position: "bottom",
                    type: 'success',
                    duration: 1500
                })   
            }
            if(this.props.count === prevProps.count){
                Toast.show({
                    text: "Service Already added",
                    textStyle: { textAlign: "center" },
                    style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                    position: "bottom",
                    type: 'warning',
                    duration: 2000
                })
            }
        }
    }
    render() {
        const { isActive } = this.props
        console.log('ISACTIVE', isActive)
        return (
            <Footer style={{ elevation: 0, marginTop: 10, backgroundColor: "white" }} >
                <FooterTab style={styles.footer}>
                    <Button onPress={() => this.props.navigation.navigate("Bookings")}>
                        <Image style={{ width: 35, height: 35 }} source={isActive=== 'bookings' ? bookings : bookings1} />
                        <Text style={{ color: `${isActive === 'bookings' ? '#F52680' : '#FD90C3'}` }}>Bookings</Text>
                    </Button>
                    <Button onPress={() => this.props.navigation.navigate("Services")}>
                        <Image style={{ height: 35, width: 40 }} source={isActive === 'treatment' ?  treatment : treatment1} />
                        <Text style={{ color: `${isActive === 'treatment' ? '#F52680' : '#FD90C3'}` }}>Treatments</Text>
                    </Button>
                    <Button onPress={() => this.props.count ? this.props.navigation.navigate("Checkout") :
                        Toast.show({
                            text: "Select at least one treatment",
                            textStyle: { textAlign: "center" },
                            style: { width: "90%", alignSelf: "center", borderRadius: 10 },
                            position: "bottom",
                            type: 'warning',
                            duration: 2000
                        })} >
                        <Image style={{ height: 40, width: 35 }} source={isActive === 'checkout' ?  checkout : checkout1} />
                        <Text style={{ color: `${isActive === 'checkout' ? '#F52680' : '#FD90C3'}` }}>checkout</Text>
                        <View style={styles.items}><Text style={{ textAlign: "center" }}>{this.props.count}</Text></View>
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
    cart: cart,
    count: cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + cartItem.quantity, 0)
})
export default connect(mapStateToProps)(CustomFooter);