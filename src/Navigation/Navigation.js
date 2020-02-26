import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home/Home';
import { createSwitchNavigator} from 'react-navigation';
import CustomSwiper from '../components/swiper/Swiper';
import Register from '../screens/customer/register/RegisterCustomer'
import MobileVerify from '../screens/mobile-varification/mobile-varification';
import EnterOtp from '../screens/EnterOtp/EnterOtp';
import Services from '../screens/customer/services/Services';
import ServicesTabs from '../screens/servicesTabs/ServicesTabs';
import RegisterFreelancer from '../screens/freelancer/Register/RegisterFreelancer';
import Checkout from '../screens/customer/checkout/checkout'



const CustomerStack = createStackNavigator({
    Swiper: {
        screen: CustomSwiper,
        navigationOptions: {
            headerShown: false,
            gestureEnabled:false
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
    ServicesTabs:{
        screen:ServicesTabs,
        navigationOptions: {
            headerShown: false,
        }
    },
    Checkout:{
        screen:Checkout,
        navigationOptions: {
            headerShown: false,
        }
    }
})

const FreelancerStack = createStackNavigator({
    MobileVerification:{
        screen:MobileVerify,
        navigationOptions: {
            headerShown: false,
        }
    },
    RegisterFreelancer:{
        screen:RegisterFreelancer,
        navigationOptions: {
            headerShown: false,
        }
    },
    
})
const AppNavigator = createSwitchNavigator({
    Home: Home,
    CustomerStack:CustomerStack,
    FreelancerStack:FreelancerStack
},
{
  initialRouteName: 'Home',
}
);

export default AppNavigator;