import React, { Component } from 'react';
import { StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { View, Card, Body, CardItem, Container, Content, Text, Header } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import facial from '../../../assets/facial.png';
import makeup from '../../../assets/makeup.png';
import haircare from '../../../assets/hair-care.png';
import manicure from '../../../assets/manicure.png';
import pedicure from '../../../assets/pedicure.png';
import wax from '../../../assets/wax.png';
import CustomHeader from '../../../components/header/customHeader';
import CustomFooter from '../../../components/footer/customfooter';



class Services extends Component {
    state = {
        DATA: [
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                source: facial,
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                source: makeup,
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                source: haircare,
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d33',
                source: manicure
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                source: pedicure,
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d33',
                source: wax,
            },
        ]
    }
    render() {


        return (
            <Container style={styles.container} >
                <CustomHeader />
                <Content height="80%">
                    <FlatList
                        contentContainerStyle={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            flex: 1,
                            alignItems: "center"
                        }}
                        data={this.state.DATA}
                        renderItem={({ item }) => (
                            <View style={{ width: width * 0.5 }} >
                                <Card style={styles.listCard} >
                                    <CardItem button style={{
                                        justifyContent: 'center', 
                                        paddingTop: 20, 
                                       
                                    }} onPress={()=>{this.props.navigation.navigate("ServicesTabs")}}
                                        >
                                        <Image source={item.source} style={styles.img} s />
                                    </CardItem>
                                </Card>
                            </View>
                        )
                        }
                        keyExtractor={item => item.id}
                    />
                </Content>
                <CustomFooter />
            </Container>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        marginTop: "3%",
        justifyContent: "flex-end",
    },
    listCard: {
        width: width * 0.5,
        height: height * 0.25,
        elevation: 0,

    },
    img: {
        width: 80,
        height: 125,
    }
})

export default Services;