import React from 'react';
import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import { Image, StyleSheet, FlatList } from 'react-native';
import moment from 'moment'
import { colors } from '../../configs/colors';
import NotFound from '../not found/NotFound';

const History = () => (
    <Container>
        <Content scrollEnabled={true} showsVerticalScrollIndicator={false}>
            <NotFound from="history"/>
        </Content>
    </Container>)
    export default History