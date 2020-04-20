import React from 'react';
import { Image } from 'react-native'
import gallery1 from '../../assets/gallery1.png'
import gallery2 from '../../assets/gallery2.png'
import freelancerbooking1 from '../../assets/freelancerbooking1.png'
import freelancerbooking2 from '../../assets/freelancerbooking2.png'
import freelancerprofile1 from '../../assets/freelancerprofile1.png'
import freelancerprofile2 from '../../assets/freelancerprofile2.png'


import { Footer, FooterTab, Button, Text, View } from 'native-base'

const FreelancerFooter = ({ isActive, navigation }) => {
    return (
        <Footer style={{ elevation: 0, marginTop: 10, backgroundColor: "white" }} >
            <FooterTab style={{
                marginTop: 0,
                marginBottom: 0,
                paddingBottom: 0,
                alignSelf: "flex-end",
                backgroundColor: "white"
            }}>
                <Button onPress={() => navigation.navigate("EditProfile")}>
                    <Image style={{ width: 27, height: 35 }} source={isActive === 'profile' ? freelancerprofile2 : freelancerprofile1} />
                    <Text style={{
                        color: `${isActive === 'profile' ? '#5A5197' : '#9F98D2'}`,
                        fontWeight: `${isActive === 'profile' ? 'bold' : 'normal'}`,
                    }}>Profile</Text>
                </Button>
                <Button onPress={() => navigation.navigate("Gallery")}>
                    <Image style={{ height: 30, width: 40 }} source={isActive === 'gallery' ? gallery2 : gallery1} />
                    <Text style={{
                        color: `${isActive === 'gallery' ? '#5A5197' : '#9F98D2'}`,
                        fontWeight: `${isActive === 'gallery' ? 'bold' : 'normal'}`,
                    }}>Gallery</Text>
                </Button>
                <Button onPress={() => navigation.navigate("FreelancerBookings")} >
                    <Image style={{ height: 35, width: 35 }} source={isActive === 'bookings' ? freelancerbooking2 : freelancerbooking1} />
                    <Text style={{
                        color: `${isActive === 'bookings' ? '#5A5197' : '#9F98D2'}`,
                        fontWeight: `${isActive === 'bookings' ? 'bold' : 'normal'}`,
                    }}>Bookings</Text>
                </Button>
            </FooterTab>

        </Footer>
    )
}

export default FreelancerFooter