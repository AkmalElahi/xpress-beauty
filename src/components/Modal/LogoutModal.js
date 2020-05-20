import React from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
import img from '../../assets/success.png'
import { CustomButton } from '../buttons/Buttons';
import { colors } from '../../configs/colors';
const LogoutModal = ({ modalVisible, logout , onclose }) => (
    // <View style={styles.modal}>
    // </View>
    <Modal transparent={true}
    animationType={"fade"}
        visible={modalVisible}
    // onRequestClose={this.closeModal}
    >
        <View style={styles.modal}>
            <View style={styles.modalView}>
                {/* <Image source={img} style={{width:50,height:50}}/> */}
                <Text style={styles.text}>
                    Are you sure you want to logout?
                </Text>
                <View style={{width:"90%", flexDirection:"row", justifyContent:"space-around",}}>
                <View style={{ width: 100, }}>
                    <CustomButton
                        // disabled={!rating || !comments}
                        onPress={onclose}
                        height={40}
                        color="white"
                        value="Cancel"
                        backgroundColor={colors.freelancerButton}
                    />
                </View>
                <View style={{ width: 100, }}>
                    <CustomButton
                        // disabled={!rating || !comments}
                        onPress={logout}
                        height={40}
                        color="white"
                        value="Logout"
                        backgroundColor={colors.primaryBtn}
                    />
                </View>
                </View>
            </View>
        </View>
    </Modal>
);

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"rgba(0, 0, 0, 0.7)"
    },
    modalView: {
        // paddingTop:"10%",
        justifyContent:"space-around",
        alignItems:"center",
        width: width * 0.8,
        height: height * 0.28,
        backgroundColor: "white",
        borderRadius:15
    },
    img:{
        width:60,
        height:60
    },
    text:{
        marginTop:"8%",
        fontSize:16,
        textAlign:"center",
        width:"90%",
    }
})
export default LogoutModal;