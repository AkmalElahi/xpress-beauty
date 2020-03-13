import { createStackNavigator } from 'react-navigation-stack';
import Home from '../screens/Home/Home';
import { createSwitchNavigator } from 'react-navigation';
import CustomSwiper from '../components/swiper/Swiper';
import Register from '../screens/customer/register/RegisterCustomer'
import MobileVerify from '../screens/mobile-varification/mobile-varification';
import EnterOtp from '../screens/EnterOtp/EnterOtp';
import Services from '../screens/customer/services/Services';
import ServicesTabs from '../screens/servicesTabs/ServicesTabs';
import RegisterFreelancer from '../screens/freelancer/Register/RegisterFreelancer';
import Checkout from '../screens/customer/checkout/checkout'
import AuthCustomer from '../screens/customer/authCustomer/AuthCustomer'
import UserLoading from '../screens/userLoading/userLoading'
import Map from '../screens/map/map'
import CustomDrawer from '../components/Drawer/Drawer';


const registerCustomer = createStackNavigator({
    Swiper: {
        screen: CustomSwiper,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false
        }
    },
    createCustomerProfile: {
        screen: Register,
        navigationOptions: {
            headerShown: false,
        }
    },
    MobileVerification: {
        screen: MobileVerify,
        navigationOptions: {
            headerShown: false,
        }
    },
    EnterOtp: {
        screen: EnterOtp,
        navigationOptions: {
            headerShown: false,
        }
    },
    MapView: {
        screen: Map,
        navigationOptions: {
            headerShown: false,
        }
    }
})
const customerApp = createStackNavigator({
    Services: {
        screen: Services,
        navigationOptions: {
            headerShown: false,
        }
    },
    ServicesTabs: {
        screen: ServicesTabs,
        navigationOptions: {
            headerShown: false,
        }
    },
    Checkout: {
        screen: Checkout,
        navigationOptions: {
            headerShown: false,
        }
    },
    MapView: {
        screen: Map,
        navigationOptions: {
            headerShown: false,
        }
    },
    // CustomDrawer:{
    //     screen: CustomDrawer,
    //     navigationOptions: {
    //         headerShown: false,
    //     }
    // }
})
const CustomerStack = createSwitchNavigator({
    AuthCustomer,
    registerCustomer,
    customerApp,
},
    {
        initialRouteName: 'AuthCustomer'
    })

const FreelancerStack = createStackNavigator({
    MobileVerification: {
        screen: MobileVerify,
        navigationOptions: {
            headerShown: false,
        }
    },
    createFreelancerProfile: {
        screen: RegisterFreelancer,
        navigationOptions: {
            headerShown: false,
        }
    },

})
const AppNavigator = createSwitchNavigator({
    UserLoading:UserLoading,
    Home: Home,
    CustomerStack: CustomerStack,
    FreelancerStack: FreelancerStack
},
    {
        initialRouteName: 'UserLoading',
    }
);

export default AppNavigator;