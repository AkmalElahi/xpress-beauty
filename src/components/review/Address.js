import React from 'react';
import { Content, ListItem, Text, View, Icon, Switch } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, Image } from 'react-native';
import { CustomButton } from '../buttons/Buttons'
import clock from '../../assets/clock.png'
import { colors } from '../../configs/colors'
import { connect } from 'react-redux';
import { removeServiceFromCart } from '../../redux/cart/cart.actions';

const Address = ({ navigation, address }) => {
    return (
        <Content contentContainerStyle={{ marginTop: "5%", justifyContent: "space-between" }}>
            <View style={styles.divider}>
                <Text>Select Booking Address</Text>
                <View style={{ width: "45%" }}>
                    <CustomButton value="Where To?" backgroundColor={colors.primaryBtn} height={35} color="white" fontSize={25}
                        onPress={() => {
                            navigation.navigate("MapView", {
                                from: "checkout"
                            })
                        }} />
                </View>
                <Text style={{fontSize:13}}>{address && `${address.house} ${address.building}, ${address.street} ${address.area}, ${address.city}`}</Text>
            </View>
            <View style={styles.divider}>
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                    <Text>Select Beautician</Text>
                    <Switch ios_backgroundColor="white" trackColor={{ false: "lightgrey", true: 'lightgrey' }} value={false} />
                </View>
                <View style={{ width: "45%" }}>
                    <CustomButton disabled={true} value="Select" backgroundColor={colors.primaryBtn} height={35} color="white" fontSize={25} />
                </View>
            </View>
            <View style={styles.divider}>
                <Text>Select Payment Type</Text>
                <View style={{ width: "45%" }}>
                    <CustomButton value="Add Card +" backgroundColor={colors.primaryBtn} height={35} color="white" fontSize={25} />
                </View>
            </View>
        </Content>
    )
}
const styles = StyleSheet.create({
    divider: {
        width: "90%",
        height: 100,
        marginTop: "5%",
        paddingBottom: "10%",
        alignSelf: "center",
        borderBottomWidth: 0.5,
        borderBottomColor: "grey",
        justifyContent: "space-between"
    }
})
export default Address