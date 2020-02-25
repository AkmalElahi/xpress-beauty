import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import Promotion from '../../screens/promotions/Promotion';
import promotion1 from '../../assets/promotion1.png';
import promotion2 from '../../assets/promotion2.png';
import promotion3 from '../../assets/promotion3.png';
import { colors } from '../../configs/colors';


class CustomSwiper extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Swiper style={{ flex: 1 }}
                autoplayTimeout={3}
                paginationStyle={{marginBottom:42}}
                autoplay={true} loop={false}
                showsPagination={true}
                scrollEnabled={true}
                activeDotColor={colors.primaryBtn}>
                <Promotion img={promotion1} heading="About Us" onPress={() => { this.props.navigation.navigate("Register") }} />
                <Promotion img={promotion2} heading="Beauty Tips" onPress={() => { this.props.navigation.navigate("Register") }} />
                <Promotion img={promotion3} heading="Promotions" onPress={() => { this.props.navigation.navigate("Register") }} />
            </Swiper>
        )
    }
}

export default CustomSwiper;