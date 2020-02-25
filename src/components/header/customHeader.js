import React from 'react';
import { StyleSheet , Image} from 'react-native'
import { Left, Body, Right, Header, Icon,  } from 'native-base';
import bell from '../../assets/bell.png'

const CustomHeader = () => (
    <Header style={styles.header} androidStatusBarColor="white" iosBarStyle="dark-content"   >
        <Left>
            <Icon ios='ios-menu' android="md-menu" />
        </Left>
        <Body>

        </Body>
        <Right>
            <Image source={bell} />
        </Right>
    </Header>
)


const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        elevation: 0,
        width:"95%",
        alignSelf:"center"
    }
})
export default CustomHeader;