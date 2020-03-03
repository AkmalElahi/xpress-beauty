import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Footer, FooterTab, Button, Icon } from 'native-base';
import bookings from '../../assets/bookings.png';
import treatment from '../../assets/treatment.png';
import checkout from '../../assets/checkout.png';


const CustomFooter = ({navigation}) => (
    <Footer style={{elevation:0, backgroundColor:"white"}} >
        <FooterTab style={styles.footer}>
            <Button>
                <Image style={styles.img} source={bookings} />
            </Button>
            <Button onPress={()=>navigation.navigate("Services")}>
                <Image style={styles.img} source={treatment} />
            </Button>
            <Button onPress={()=>navigation.navigate("Checkout")} >
                <Image  style={styles.img} source={checkout} />
            </Button>
        </FooterTab>
    </Footer>
)
const styles = StyleSheet.create({
    footer:{
        marginTop:0,
        marginBottom:0,
        paddingBottom:0,
        alignSelf:"flex-end",
        backgroundColor:"white"
    },
    img:{
        margin:0,
    }
})
export default CustomFooter;