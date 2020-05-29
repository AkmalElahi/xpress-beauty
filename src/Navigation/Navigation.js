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
import Bookings from '../screens/customer/Bookings/Bookings';
import SelectBeautician from '../components/SelectBeautician/SelectBeauticiant';
import Notification from '../screens/notifications/notifications';
import NotificationDetail from '../screens/notifications/notification.details';
import AuthFreelancer from '../screens/freelancer/authFreelancer/AuthFreelancer';
import FreelancerNotification from '../screens/freelancer/notifications/Notifications'
import SkillsAndTools from '../screens/freelancer/Register/SkillsAndTools';
import JobDetail from '../screens/freelancer/JobDetail/JobDetail';
import FreelancerBookings from '../screens/freelancer/FreelancerBookings/FreelancerBookings';
import FreelancerEditProfile from '../screens/freelancer/editProfile/editProfile'
import Gallery from '../screens/freelancer/gallery/gallery';
import BookingDetails from '../screens/customer/Bookings/BookingsDetails';
import FreelancerBookingDetails from '../screens/freelancer/FreelancerBookings/FreelancerBookingDetails';
import AboutUs from '../screens/about-us/AboutUs';
import ChangeNumber from '../screens/changeNumber/ChangeNumber';
import Help from '../screens/Help/Help';
import HelpDetails from '../screens/Help/Help-details';
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
    },
    
},
    {
        initialRouteName: 'Swiper'
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
    Bookings: {
        screen: Bookings,
        navigationOptions: {
            headerShown: false,
        }
    },
    SelectBeautician: {
        screen: SelectBeautician,
        navigationOptions: {
            headerShown: false,
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            headerShown: false,
        }
    },
    NotificationDetail: {
        screen: NotificationDetail,
        navigationOptions: {
            headerShown: false,
        }
    },
    BookingsDetails: {
        screen: BookingDetails,
        navigationOptions: {
            headerShown: false,
        }
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            headerShown: false,
        }
    },
    ChangeNumber: {
        screen: ChangeNumber,
        navigationOptions: {
            headerShown: false,
        }
    },
    Help: {
        screen: Help,
        navigationOptions: {
            headerShown: false,
        }
    },
    HelpDetail: {
        screen: HelpDetails,
        navigationOptions: {
            headerShown: false,
        }
    }

},
    {
        initialRouteName: 'Services'
    })
const CustomerStack = createSwitchNavigator({
    AuthCustomer,
    registerCustomer,
    customerApp,
},
    {
        initialRouteName: 'AuthCustomer'
    })

const registerFreelancer = createStackNavigator({

    createFreelancerProfile: {
        screen: RegisterFreelancer,
        navigationOptions: {
            headerShown: false,
        }
    },
    SkillsAndTools: {
        screen: SkillsAndTools,
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
},
    {
        initialRouteName: 'MobileVerification'
    })

const FreelancerApp = createStackNavigator({
    FreelancerNotification: {
        screen: FreelancerNotification,
        navigationOptions: {
            headerShown: false,
        }
    },
    jobDetail: {
        screen: JobDetail,
        navigationOptions: {
            headerShown: false,
        }
    },
    FreelancerBookings: {
        screen: FreelancerBookings,
        navigationOptions: {
            headerShown: false,
        }
    },
    EditProfile: {
        screen: FreelancerEditProfile,
        navigationOptions: {
            headerShown: false,
        }
    },
    Gallery: {
        screen: Gallery,
        navigationOptions: {
            headerShown: false,
        }
    },
    BookingsDetails: {
        screen: FreelancerBookingDetails,
        navigationOptions: {
            headerShown: false,
        }
    },
    ChangeNumber: {
        screen: ChangeNumber,
        navigationOptions: {
            headerShown: false,
        }
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: {
            headerShown: false,
        }
    },
    Help: {
        screen: Help,
        navigationOptions: {
            headerShown: false,
        }
    },
    HelpDetail: {
        screen: HelpDetails,
        navigationOptions: {
            headerShown: false,
        }
    }
})
const FreelancerStack = createSwitchNavigator({
    AuthFreelancer: AuthFreelancer,
    FreelancerApp: FreelancerApp,
    RegisterFreelancer: registerFreelancer
}, {
    initialRouteName: 'AuthFreelancer'
})
const AppNavigator = createSwitchNavigator({
    UserLoading: UserLoading,
    Home: Home,
    CustomerStack: CustomerStack,
    FreelancerStack: FreelancerStack
},
    {
        initialRouteName: 'UserLoading',
    }
);

export default AppNavigator;