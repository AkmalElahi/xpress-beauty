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


class CustomSwiper extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        const unsubscribe = NetInfo.addEventListener(state =>{
            console.log("Connection type", state.isConnected);
            if(state.isConnected){
                this.props.getPromotions()
            }
            else{
                alert("internet is not available")
            }
        })
    }
    // componentWillUnmount(){
    //     this.unsubscribe()
    // }
    render() {
        // const { promotions } = this.props
        console.log("INSIDE PROMOTIONS", this.props.promotions)
        return (
            <View style={{ flex: 1 }}>
                {this.props.success ? <Swiper
                    containerStyle={{ flex: 1, borderWidth: 0 }}
                    autoplayTimeout={3}
                    paginationStyle={{ marginBottom: 42 }}
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
                </Swiper> 
                : <Promotion
                    onPress={() => { this.props.navigation.navigate("MobileVerification") }}/>}
            </View >
        )
    }
}
const mapDispatchToProps = dispatch => ({
    getPromotions: () => dispatch(promotionsMiddleware())
})
mapStateToProps = ({ promotions, user }) => (promotions)
export default connect(mapStateToProps, mapDispatchToProps)(CustomSwiper);