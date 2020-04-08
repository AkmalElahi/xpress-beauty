import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { TextInput } from 'react-native';
import { connect } from 'react-redux';
import { CustomButton } from '../../../components/buttons/Buttons';
import { colors } from '../../../configs/colors';
import FreelancerFooter from '../../../components/footer/freelancerFooter';
class Personal extends Component {
    // console.log("PERSONAL", username, setChange)
    constructor(props) {
        super(props)
        this.state = {
            username: ""
        }
    }
    componentDidMount() {
        console.log("USER IN PERSONLA", this.props.user)
        const { user } = this.props
        this.setState({
            username: user.username,
            email: user.email,
            cnic: user.cnic,
            phone: user.mobile,
            dob: user.dob,
            house: user.house,
            building: user.building,
            street: user.street,
            city: user.city,
            area: user.area

        })
    }
    render() {
        const { username, email, cnic, dob, house, building, street, city, area, phone } = this.state
        return (
            <Content contentContainerStyle={{width:"85%", alignSelf:"center"}}>
                <Form style={{marginBottom:15}}>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input
                            value={username}
                            onChangeText={(text) => this.setState({ username: text })} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Email</Label>
                        <Input value={email}
                            onChangeText={(text) => this.setState({ email: text })} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Phone</Label>
                        <Input value={phone} disabled={true} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>CNIC</Label>
                        <Input value={cnic}
                            onChangeText={(text) => this.setState({ cnic: text })} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>DOB</Label>
                        <Input value={dob}
                            onChangeText={(text) => this.setState({ dob: text })} />
                    </Item>
                    <Item floatingLabel>
                        <Label>House</Label>
                        <Input
                            value={house}
                            onChangeText={(text) => this.setState({ house: text })} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Building</Label>
                        <Input value={building}
                            onChangeText={(text) => this.setState({ building: text })} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Street</Label>
                        <Input value={street}
                            onChangeText={(text) => this.setState({ street: text })} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Area</Label>
                        <Input value={area}
                            onChangeText={(text) => this.setState({ area: text })} />
                    </Item>
                    <Item floatingLabel last>
                        <Label>City</Label>
                        <Input value={city}
                            onChangeText={(text) => this.setState({ city: text })} />
                    </Item>
                </Form>
                <CustomButton
                    backgroundColor={colors.freelancerButton}
                    color={"white"}
                    value="Save"
                    height={50}
                />
                {/* <FreelancerFooter navigation={this.props.navigation} isActive='profile' /> */}
            </Content>
        );
    }
}
const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = null
export default connect(mapStateToProps, mapDispatchToProps)(Personal)