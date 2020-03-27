import React, { Component } from 'react';
import { } from 'react-native';
import { connect } from 'react-redux';
import Loader from '../../../components/loader/Loader';
import { getCurrentUser } from '../../../redux/user/user.actions';
import { View } from 'native-base';

class AuthFreelancer extends Component {
    constructor(props) {
        super(props);
        this.state = {
    }
}
    componentDidMount() {
        this.props.getCurrentUser()
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("USER TYPE BEFORE IF", nextProps.user.user_type)
    //     if (nextProps.user.user_type === prevState.user_type) {
    //         console.log("USER TYPE", nextProps.user_type)
    //         return { authenticated: true }
    //     }
    //     else return null
    // }
    // componentDidUpdate(prevProps, prevState){
    //     if(prevProps.user.user_type !== prevState.authenticated ){
    //         this.props.navigation.navigate("customerApp") 
    //     }
    //     else {
    //         this.props.navigation.navigate("registerCustomer") 
    //     }
    // }
    // componentWillReceiveProps({user}) { 
    //     console.log("nextProps", user)
    //     user.user_type === "customer" ? this.props.navigation.navigate("customerApp") 
    //     : this.props.navigation.navigate("registerCustomer") 
    // }
    render() {
        return (
            <View>
                <Loader />
                {
                    this.props.user.isProfileComplete  ? this.props.navigation.navigate("FreelancerApp") 
                        : this.props.navigation.navigate("RegisterFreelancer") 
                }
            </View>
            
        );
    }
}
const mapStateToProps = (state) => {
    console.log("STATE", state.user)
    return { user: state.user }
}

const mapDispatchToProps = dispatch => ({
    getCurrentUser: () => dispatch(getCurrentUser())
})
export default connect(mapStateToProps, mapDispatchToProps)(AuthFreelancer);