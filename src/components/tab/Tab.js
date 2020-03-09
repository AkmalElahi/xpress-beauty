import React from 'react';

import { connect } from 'react-redux'

import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import { Image, StyleSheet, FlatList } from 'react-native';
import facialBanner from '../../assets/facialbanner.png';
import { colors } from '../../configs/colors';
import { RoundButton } from '../buttons/Buttons'
import clock from '../../assets/clock.png'

const Tab = ({ services, serviceId, onPress }) => (
    <Container>
        {console.log("FACIAL COMPONENT", services)}
        <Content>
            <View style={styles.imageContainer}>
                <Image source={facialBanner} style={styles.img} />
            </View>
            <FlatList
                // contentContainerStyle={{
                //     flexDirection: 'row',
                //     flexWrap: 'wrap',
                //     flex: 1,
                //     alignItems: "center"
                // }}
                data={services}
                renderItem={({ item }) => (
                    <View style={{ width: "100%", borderBottomColor: "grey", borderBottomWidth: 0.3 }} >
                        <Card transparent style={styles.listCard} >
                            <CardItem
                                button
                                onPress={()=>onPress(item)}
                                style={{
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    width: "50%",
                                }}>
                                <Text style={{ fontWeight: "normal", textAlign: "left", fontSize: 18, width: "100%" }}>{item.service}</Text>
                                <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"100%", marginLeft:-15}}>
                                    <Image source={clock} style={{ width: 20, height: 20,  }} />
                                    <Text style={{ textAlign:"left", justifyContent:"center", alignItems:"center", }}>{item.duration}</Text>
                                    <Text>Rs.</Text>
                                    <Text style={{  textAlign:"left"}}>{item.price}</Text>
                                </View>

                            </CardItem>
                            <CardItem style={{
                                justifyContent: 'center',
                                width: "30%"
                            }}>
                                <RoundButton
                                    backgroundColor={colors.primaryBtn}
                                    color="white"
                                    height={20}
                                    value="More Details"
                                    fontSize={10} />
                            </CardItem>
                        </Card>
                    </View>
                )
                }
                keyExtractor={item => item.id}
            />
        </Content>
    </Container>
)


const styles = StyleSheet.create({
    imageContainer: {
        height: 175,
        width: "100%",
    },
    img: {
        width: "100%",
        height: "100%"
    },
    listCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%"

    }
})

// const mapStateToProps = ({ services }) => (
//     services
// )
export default Tab;