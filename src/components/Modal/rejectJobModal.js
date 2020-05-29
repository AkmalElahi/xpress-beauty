import React from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { CheckBox, Label, Icon, Content } from 'native-base';
import { colors } from '../../configs/colors';
import { TextInput } from 'react-native-gesture-handler';
import { CustomButton } from '../buttons/Buttons';
import checked from '../../assets/checked1.png'
import unchecked from '../../assets/unchecked.png'
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const reasons = [
    "Far Away",
    "Traffic Issue",
    "Not Providing such services",
    "Occupied at given time",
    "Other"
]
const ReejctReasons = ({ modalVisible, submit, comments, rejectReason, onChangeComment, onChangeReject, onclose }) => (
    // <View style={styles.modal}>
    // </View>
    <Modal transparent={true}
        animationType={"fade"}
        visible={modalVisible}
    // onRequestClose={this.closeModal}
    >
        <Content contentContainerStyle={styles.modal}>
            <View style={styles.modalView}>
                <TouchableOpacity style={{ alignSelf: "flex-end", paddingRight: "5%", marginTop: 2 }}>
                    <Icon name="close" onPress={onclose} />
                </TouchableOpacity>
                <Text style={{ margin: 10, fontWeight: "bold", fontSize: 16 }}> What is the Rejection Reason?</Text>
                {
                    reasons.map((reason) => (<TouchableOpacity style={styles.row} onPress={() => onChangeReject(reason)}>
                        {/* <CheckBox color={colors.freelancerButton}
                            onPress={() => onChangeReject(reason)}
                            checked={rejectReason === reason ? true : false} /> */}
                        <Image source={rejectReason === reason ? checked : unchecked} style={{ width: 20, height: 20, marginLeft: 10 }} />
                        <Text style={{ textAlign: "left", width: "85%", }}>{reason}</Text>
                    </TouchableOpacity>))
                }
                <Text style={{ marginTop: 10, marginLeft: 15 }}>Comments (required)</Text>
                <TextInput
                    onChangeText={(text) => onChangeComment(text)}
                    value={comments} multiline={true} style={{
                        borderColor: "grey",
                        borderWidth: 1,
                        margin: 5,
                        marginTop: 0,
                        width: width * 0.75,
                        alignSelf: "center",
                        // backgroundColor: "blue",
                        height: 60
                    }} />
                <View style={{ width: "40%", alignSelf: "flex-end", paddingRight: "5%" }}>
                    <CustomButton
                        disabled={!rejectReason || !comments}
                        onPress={submit}
                        height={40}
                        color="white"
                        value="Submit"
                        backgroundColor={colors.freelancerButton}
                    />
                </View>
            </View>
        </Content>
    </Modal>
);

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    modalView: {
        // paddingTop:"10%",
        // justifyContent: "center",
        // alignItems: "center",

        // flex:1,
        width: width * 0.8,
        height: height * 0.6,
        backgroundColor: "white",
        borderRadius: 15
    },
    img: {
        width: 60,
        height: 60
    },
    text: {
        marginTop: "8%",
        fontSize: 16,
        textAlign: "center",
        width: "80%"
    },
    row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 3
        // alignItems:"stretch"
    }
})
export default ReejctReasons;