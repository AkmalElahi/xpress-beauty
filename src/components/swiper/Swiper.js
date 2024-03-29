import React, { Component } from 'react';
import { View } from 'react-native'
import Swiper from 'react-native-swiper';
import Promotion from '../../screens/promotions/Promotion';
import NetInfo from "@react-native-community/netinfo";
import Loader from '../loader/Loader'
import promotion1 from '../../assets/promotion1.png'
import { colors } from '../../configs/colors';
import { connect } from 'react-redux';
import { promotionsMiddleware } from '../../redux/promotions/promotions.middleware';
import { CustomButton } from '../buttons/Buttons';


class CustomSwiper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            noInternet: false
        }
    }
    unsubscribe = null
    componentDidMount() {
        unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.isConnected);
            if (state.isConnected) {
                this.props.getPromotions()
                unsubscribe()
            }
            else {
                alert("internet is not available")
                this.setState({
                    noInternet: true
                })
            }
        })
    }
    // componentWillUnmount(){
    //     this.unsubscribe()
    // }

    render() {
        // const { promotions } = this.props
        const { noInternet } = this.state
        console.log("INSIDE PROMOTIONS", this.props.promotions)
        return (
            <View style={{ flex: 1 }}>
                {this.props.message === "get promotions request" && <Loader />}
                {this.props.success && <Swiper
                    containerStyle={{ flex: 1, borderWidth: 0 }}
                    autoplayTimeout={3}
                    paginationStyle={{ marginBottom: 0 }}
                    autoplay={true} loop={false}
                    showsPagination={true}
                    scrollEnabled={true}
                    activeDotColor={colors.primaryBtn}>
                    {/* <Promotion img={promotion1} heading="About Us" onPress={() => { this.props.navigation.navigate("MapView") }} />
                <Promotion img={promotion2} heading="Beauty Tips" onPress={() => { this.props.navigation.navigate("MapView") }} />
                <Promotion img={promotion3} heading="Promotions" onPress={() => { this.props.navigation.navigate("MapView") }} /> */}
                    {this.props.promotions.map(promo => (
                        <Promotion
                            key={promo.id}
                            img={promo.image}
                            heading={promo.title}
                            description={promo.description}
                            onPress={() => { this.props.navigation.navigate("MobileVerification") }} />))}
                </Swiper>}
                {noInternet && <Promotion
                    onPress={() => { this.props.navigation.navigate("MobileVerification") }} />}
                <CustomButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Login"
                    onPress={() => { this.props.navigation.navigate("MobileVerification") }} />
            </View >
        )
    }
}
const mapDispatchToProps = dispatch => ({
    getPromotions: () => dispatch(promotionsMiddleware())
})
mapStateToProps = ({ promotions, user }) => (promotions)
export default connect(mapStateToProps, mapDispatchToProps)(CustomSwiper);