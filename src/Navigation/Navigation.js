import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home/Home';
import CustomSwiper from '../components/swiper/Swiper';
import Register from '../screens/customer/register/RegisterCustomer'
import MobileVerify from '../screens/mobile-varification/mobile-varification';
import EnterOtp from '../screens/EnterOtp/EnterOtp';
import Services from '../screens/customer/services/Services'


const CustomerStack = createStackNavigator({
    Swiper: {
        screen: CustomSwiper,
        navigationOptions: {
            headerShown: false,
        }
    },
    Register:{
        screen:Register,
        navigationOptions: {
            headerShown: false,
        }
    },
    MobileVerification:{
        screen:MobileVerify,
        navigationOptions: {
            headerShown: false,
        }
    },
    EnterOtp:{
        screen:EnterOtp,
        navigationOptions: {
            headerShown: false,
        }
    },
    Services:{
        screen:Services,
        navigationOptions: {
            headerShown: false,
        }
    },
})
const AppNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false,
        }
    },
    CustomerStack:{
        screen: CustomerStack,
        navigationOptions: {
            headerShown: false,
        }
    }
    
    

},
{
  initialRouteName: 'Home',
}
);

export default AppNavigator;