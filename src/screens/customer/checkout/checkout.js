import React, { Component } from 'react';
import { Container, Content, Text, ListItem, CheckBox, Body, View, List } from 'native-base';
import { StyleSheet, Image } from 'react-native'
import CustomHeader from '../../../components/header/customHeader';
import { colors } from '../../../configs/colors';
import { CustomButton } from '../../../components/buttons/Buttons';
import CustomFooter from '../../../components/footer/customfooter';
import checked from '../../../assets/checked.png'
import unchecked from '../../../assets/unchecked.png'
import Review from '../../../components/review/Review';
import Time from '../../../components/review/Time';


class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1
        }
    }
    continue = () => {
        const { count } = this.state
        if (count <2) {
            this.setState((ps) => {
                console.log(count)
                return { count: ++ps.count }
            })

        }

    }
    render() {
        const { count } = this.state
        return (
            <Container style={styles.container}>
                <CustomHeader androidStatusBarColor={colors.greybg} iosBarStyle="light-content" />
                <List style={styles.list}>
                    <ListItem style={styles.listItem} >
                        <Image source={checked} />
                        <Text style={styles.listText}>REVIEW</Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Image source={count >= 2 ? checked : unchecked} />
                        <Text style={styles.listText}>TIME</Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Image source={count >= 3 ? checked : unchecked} />
                        <Text style={styles.listText}>ADDRESS</Text>
                    </ListItem>
                    <ListItem style={styles.listItem}>
                        <Image source={count >= 4 ? checked : unchecked} />
                        <Text style={styles.listText}>SUMMARY</Text>
                    </ListItem>
                </List>
                {count === 1 && <Review navigation ={this.props.navigation}/>}
                {count === 2 && <Time navigation ={this.props.navigation}/>}
                <CustomButton
                value="Continue" backgroundColor={colors.primaryBtn} height={60} color="white" fontSize={25} onPress={this.continue}/>
                <CustomFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        marginTop: "3%",
        paddingBottom: 0,
        marginBottom: 0,
        backgroundColor: "white"
    },
    listItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 0
    },
    list: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "95%",
        alignSelf: "center",
    },
    listText: {
        fontSize: 10,
        width: 60,
        paddingLeft: 2
        // textAlign:"right",
    }
})
export default Checkout;