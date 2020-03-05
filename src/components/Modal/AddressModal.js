import React, { Component } from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image, TextInput } from 'react-native';
import { colors } from '../../configs/colors';
import { CustomButton } from '../buttons/Buttons'
import { connect } from 'react-redux';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class AddressModal extends Component {
    // <View style={styles.modal}>
    // </View>
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount(){
        const { addressComponents } = this.props
        if(addressComponents){
            this.setState({
                building:addressComponents[0].long_name,
                street:addressComponents[2].long_name,
                area:addressComponents[3].long_name,
                city:addressComponents[4].long_name,
                // :addressComponents[2].long_name,
            })
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const { user, addressComponents } = nextProps
        console.log("USER IN ADDRESS MODAL", user)
        if(addressComponents){
            this.setState({
                building:addressComponents[0].long_name,
                street:addressComponents[2].long_name,
                area:addressComponents[3].long_name,
                city:addressComponents[4].long_name,
                user:user
                // :addressComponents[2].long_name,
            })
        }
    }
    confirm = () =>{
        const { user, building, street, area, city}= this.state
        console.log("UPDATED PROFILE", user, building, street, area, city)
        this.props.navigation.navigate("Services")
    }
    render() {
        const { addressComponents, addressType, modalVisible } = this.props
        const {building, street, area, city} = this.state
        return (
            <Modal transparent={true}
                animationType={"fade"}
                visible={modalVisible}
            // onRequestClose={this.closeModal}
            >
                <View style={styles.modal}>
                    {addressType && <View style={styles.modalView}>
                        {/* {console.log("ADDRESS IN MODAL", addressComponents, addressType)} */}
                        {/* { addressType[0] === "street_address" && 
                    addressComponents.map(component => <Text>component.long_name</Text>)
                } */}
                        <View style={styles.input}>
                            <TextInput style={styles.inputField} value={building} onChangeText={(text)=>this.setState({building:text})}/>
                        </View>
                        <View style={styles.input}>
                            <TextInput style={styles.inputField} value={street} onChangeText={(text)=>this.setState({street:text})}/>
                        </View>
                        <View style={styles.input}>
                            <TextInput style={styles.inputField} value={area} onChangeText={(text)=>this.setState({area:text})}/>
                        </View>
                        <View style={styles.input}>
                            <TextInput style={styles.inputField} value={city} onChangeText={(text)=>this.setState({city:text})}/>
                        </View>
                        <View style={{ width: "80%", marginTop: "20%", }}><CustomButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Confirm" onPress={this.confirm} /></View>
                    </View>}

                </View>
            </Modal>
        )
    }

}
const styles = StyleSheet.create({
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        // paddingTop:"10%",
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.95,
        height: height * 0.8,
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
    input: {
        width: "90%",
        justifyContent: "center",
        marginBottom: "2%",
        height: "10%"

    },
    inputField: {
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
    }
})
const mapStateToProps = ({ user }) => ({ user: user })
export default connect(mapStateToProps)(AddressModal);