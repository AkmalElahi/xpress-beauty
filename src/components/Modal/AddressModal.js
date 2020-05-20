import React, { Component } from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image, TextInput, TouchableOpacity } from 'react-native';
import { Icon, Label } from 'native-base'
import { colors } from '../../configs/colors';
import { CustomButton } from '../buttons/Buttons'
import { connect } from 'react-redux';
import { userMiddleWare } from '../../redux/user/user.middlewares';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

class AddressModal extends Component {
    // <View style={styles.modal}>
    // </View>
    constructor(props) {
        super(props)
        this.state = {
            building: "",
            street: "",
            area: "",
            city: "",
            modalVisible: false,
            house: "",
            address_note: "",
            region: null

        }
    }
    componentDidMount() {
        const { addressComponents, modalVisible, region } = this.props
        if (addressComponents) {
            console.log("ADDRESS COMPONENTS", addressComponents, "Region", region)
            this.setState({
                building: addressComponents[0].long_name,
                street: addressComponents[1].long_name,
                area: addressComponents[2].long_name,
                city: addressComponents[3].long_name,
                modalVisible,
                region
                // :addressComponents[2].long_name,
            })
        }
    }
    componentDidUpdate(prevProps) {
        const { user, addressComponents, modalVisible, from, region } = this.props
        console.log("USER IN ADDRESS MODAL", user)
        if (modalVisible !== prevProps.modalVisible) {
            console.log("MODAL VISIBLE", modalVisible)
            this.setState({
                // building: addressComponents[0].long_name,
                // street: addressComponents[2].long_name,
                // area: addressComponents[3].long_name,
                // city: addressComponents[4].long_name,
                user: user,
                modalVisible,
                region
                // :addressComponents[2].long_name,
            })
        }
        // if (this.props.user.success !== prevProps.user.success) {
        //     console.log("USER CREATED")
        //     this.props.navigation.navigate("Services")

        // }
    }
    confirm = () => {
        const { user, building, street, area, city, house, address_note, region } = this.state
        console.log("UPDATED PROFILE", user, building, street, area, city)
        if (this.props.from === "checkout") {
            console.log("FROOOOOOOM", this.props.from)
            this.props.navigation.navigate('Checkout', {
                address: { building, street, area, city, house, address_note, region }
            })
        }
        // else {
        //     this.props.createProfile({
        //         building,
        //         street,
        //         area,
        //         city,
        //         house,
        //         address_note,
        //         user
        //     })
        // }
        // const address = `${building} ${street} ${area} ${city}`
        // const address = {
        //     building,
        //     street,
        //     area,
        //     city,
        //     house,address_note
        // }
        // console.log("ADDRESS", address)
        // this.props.navigation.navigate("Services")
    }
    render() {
        const { addressComponents, addressType, onClose } = this.props
        const { building, street, area, city, modalVisible, house, address_note } = this.state
        return (
            <Modal transparent={true}
                animationType={"fade"}
                visible={modalVisible}
            // onRequestClose={()=>this.setState({modalVisible:false})}
            // onRequestClose={this.closeModal}
            >
                <View style={styles.modal}>
                    {addressType && <View style={styles.modalView}>
                        <TouchableOpacity onPress={onClose} style={{ alignSelf: "flex-end", alignItems: "center", justifyContent: "center", width: "10%" }}>
                            <Icon name="close" />
                        </TouchableOpacity>
                        <View style={{width:"90%", justifyContent:"space-between", flex:1}}>
                            <Text style={{fontSize:20 , textAlign:"center"}}>Confirm your booking Address</Text>
                            <View style={styles.input}>
                                <Label style={styles.label}>Plot / Building</Label>
                                <TextInput placeholder="building / Plot" style={styles.inputField} value={building} onChangeText={(text) => this.setState({ building: text })} />
                            </View>
                            <View style={styles.input}>
                                <Label style={styles.label}>Street / block</Label>
                                <TextInput placeholder="street / block" style={styles.inputField} value={street} onChangeText={(text) => this.setState({ street: text })} />
                            </View>
                            <View style={styles.input}>
                                <Label style={styles.label}>Area</Label>
                                <TextInput placeholder="area" style={styles.inputField} value={area} onChangeText={(text) => this.setState({ area: text })} />
                            </View>
                            <View style={styles.input}>
                                <Label style={styles.label}>City</Label>
                                <TextInput placeholder="city" style={styles.inputField} value={city} onChangeText={(text) => this.setState({ city: text })} />
                            </View>
                            <View style={styles.input}>
                                <Label style={styles.label}>flat/Unit/house number (optional)</Label>
                                <TextInput placeholder="" style={styles.inputField} value={house} onChangeText={(text) => this.setState({ house: text })} />
                            </View>
                            <View style={styles.input}>
                                <Label style={styles.label}>additional note for freelancer (optional)</Label>
                                <TextInput placeholder="" style={styles.inputField} value={address_note} onChangeText={(text) => this.setState({ address_note: text })} />
                            </View>
                        </View>
                        <View style={{ width: "80%", marginTop: "10%", }}><CustomButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Confirm" onPress={this.confirm} /></View>
                    </View>}

                </View>
            </Modal>
        )
    }

}
{/* {console.log("ADDRESS IN MODAL", addressComponents, addressType)} */ }
{/* { addressType[0] === "street_address" && 
                    addressComponents.map(component => <Text>component.long_name</Text>)
                } */}
const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        // marginTop: 50,
        marginBottom: 0,
        // backgroundColor:"blue",        
        color: "grey"
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },
    modalView: {
        // paddingTop:"10%",
        justifyContent: "space-between",
        alignItems: "center",
        width: width * 0.95,
        height: height * 0.9,
        backgroundColor: "white",
        borderRadius: 15,
        paddingBottom: 15
    },
    img: {
        width: 60,
        height: 60
    },
    text: {
        // backgroundColor:"green",
        marginTop: "8%",
        fontSize: 16,
        textAlign: "center",
        width: "80%"
    },
    input: {
        // width: "90%",

        // justifyContent: "center",
        // marginBottom: "2%",
        height: "10%",
        // backgroundColor:"green"


    },
    inputField: {
        paddingTop: 0,
        paddingBottom: 0,
        marginBottom: 0,
        marginTop: 0,
        fontSize: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        // backgroundColor: "red"
    }
})
const mapStateToProps = ({ user }) => ({ user: user })
const mapDispatchToProps = dispatch => ({
    createProfile: data => dispatch(userMiddleWare(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(AddressModal);