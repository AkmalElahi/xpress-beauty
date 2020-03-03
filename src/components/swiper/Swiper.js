import React, { Component } from 'react';
import { View } from 'react-native'
import Swiper from 'react-native-swiper';
import Promotion from '../../screens/promotions/Promotion';
// import promotion1 from '../../assets/promotion1.png';
// import promotion2 from '../../assets/promotion2.png';
// import promotion3 from '../../assets/promotion3.png';
import Loader from '../loader/Loader'
import { colors } from '../../configs/colors';
import { connect } from 'react-redux';
import { promotionsMiddleware } from '../../redux/promotions/promotions.middleware';


class CustomSwiper extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getPromotions({ appuid: 10, token: "fa8d8dbd-9884-4dfd-a9a5-77a4f3fbf132" })
    }
    render() {
        // const { promotions } = this.props
        console.log("INSIDE PROMOTIONS", this.props)
        return (
            <View style={{ flex: 1 }}>
                {this.props.promotions ? <Swiper
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
                            onPress={() => { this.props.navigation.navigate("Services") }} />))}
                </Swiper> : <Loader/>}
            </View >
        )
    }
}
const mapDispatchToProps = dispatch => ({
    getPromotions: data => dispatch(promotionsMiddleware(data))
})
mapStateToProps = ({ promotions }) => promotions
export default connect(mapStateToProps, mapDispatchToProps)(CustomSwiper);