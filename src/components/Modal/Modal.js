import React from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image } from 'react-native';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const CustomModal = ({ modalVisible, img, text, width, height }) => (
    // <View style={styles.modal}>
    // </View>
    <Modal transparent={true}
    animationType={"fade"}
        visible={modalVisible}
    // onRequestClose={this.closeModal}
    >
        <View style={styles.modal}>
            <View style={styles.modalView}>
                <Image source={img} style={{width, height}}/>
                <Text style={styles.text}>
                    {text}
                </Text>
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
        justifyContent:"center",
        alignItems:"center",
        width: width * 0.8,
        height: height * 0.6,
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
        width:"80%"
    }
})
export default CustomModal;