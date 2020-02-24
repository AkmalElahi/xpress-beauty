import React from 'react';

import { View, TextInput } from 'react-native';


export const Input = () => (
    <View style={styles.picker}>
    <Item picker style={styles.pickerItem}>
        <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "50%" }}
            placeholder="Select your SIM"
            // placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#ffffff"
        // selectedValue={this.state.selected2}
        // onValueChange={this.onValueChange2.bind(this)}
        >
            <Picker.Item label="DOB" value="key" />
            <Picker.Item label="Wallet" value="key0" />
            <Picker.Item label="ATM Card" value="key1" />
            <Picker.Item label="Debit Card" value="key2" />
            <Picker.Item label="Credit Card" value="key3" />
            <Picker.Item label="Net Banking" value="key4" />
        </Picker>
    </Item>
    <Item picker style={styles.pickerItem}>
        <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: "50%" }}
            placeholder="Year"
            // placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#ffffff"
        // selectedValue={this.state.selected2}
        // onValueChange={this.onValueChange2.bind(this)}
        >
            <Picker.Item label="Year" value="key" />
            <Picker.Item label="Wallet" value="key0" />
            <Picker.Item label="ATM Card" value="key1" />
            <Picker.Item label="Debit Card" value="key2" />
            <Picker.Item label="Credit Card" value="key3" />
            <Picker.Item label="Net Banking" value="key4" />
        </Picker>
    </Item>
</View>
)