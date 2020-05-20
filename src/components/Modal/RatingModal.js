import React from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image } from 'react-native';
import { CheckBox, Label, Icon, Content } from 'native-base';
import { colors } from '../../configs/colors';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { AirbnbRating } from 'react-native-ratings';
import { CustomButton } from '../buttons/Buttons';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const RatingModal = ({ modalVisible, submit, comments, onChangeComment, onChangeRating, onclose, rating, text }) => (
    // <View style={styles.modal}>
    // </View>
    <Modal transparent={true}
        animationType={"fade"}
        visible={modalVisible}
    // onRequestClose={this.closeModal}
    >
        <Content contentContainerStyle={styles.modal}>
            <View style={styles.modalView}>
                <TouchableOpacity style={{ alignSelf: "flex-end", paddingRight: "3%" }}>
                    <Icon name="close" onPress={onclose} />
                </TouchableOpacity>
                <Text style={{ margin: 10, marginBottom: 0, fontWeight: "bold", fontSize: 16 }}>{text}</Text>

                <AirbnbRating
                    starContainerStyle={{ backgroundColor: "white", width: width * 0.65, justifyContent: "space-between" }}
                    onFinishRating={(value) => onChangeRating(value)}
                    count={5}
                    reviewSize={16}
                    reviews={["Terrible", "Bad", "Average", "Good", "Excelent"]}
                    defaultRating={rating}
                    size={20} />
                <Text style={{ marginTop: 10, marginLeft: 20 }}>Comments (required)</Text>
                <TextInput
                    onChangeText={(text) => onChangeComment(text)}
                    value={comments} multiline={true} style={{
                        borderColor: "grey",
                        borderWidth: 1,
                        margin: 5,
                        marginTop: 0,
                        width: width * 0.7,
                        alignSelf: "center",
                        // backgroundColor: "blue",
                        height: 60
                    }} />
                <View style={{ width: width * 0.7, alignSelf: "center", }}>
                    <CustomButton
                        disabled={!rating || !comments}
                        onPress={submit}
                        height={40}
                        color="white"
                        value="Submit"
                        backgroundColor={colors.primaryBtn}
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
        justifyContent: "space-between",
        // alignItems: "center",

        // flex:1,
        width: width * 0.8,
        height: height * 0.55,
        backgroundColor: "white",
        borderRadius: 15,
        paddingBottom: 10
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
export default RatingModal;