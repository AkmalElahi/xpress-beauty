import React, { Component } from 'react';
import { View, Text } from 'react-native'
import ApprovalScreen from '../approvalScreen/approvalScreen'
import { Content } from 'native-base';

class Notification extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
                <ApprovalScreen/>
        )
    }
}

export default Notification;