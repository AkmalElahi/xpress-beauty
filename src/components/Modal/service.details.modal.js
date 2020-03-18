import React, { useState } from 'react';
import { Modal, Text, View, Alert, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { Tab, Tabs, ScrollableTab, Icon, Button } from 'native-base'
import { colors } from '../../configs/colors';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const faqs = [{ q: "this is question one about the first service", ans: "this is answer one about the first service" }, { q: "q2", ans: "ans2" }, { q: "q3", ans: "ans3" }]
const DetailsModal = ({ modalVisible, service, duration, details, close, width, height }) => {
    const [index, setIndex] = useState(0)
    return (
        // <View style={styles.modal}>
        // </View>
        <Modal transparent={true}
            animationType={"fade"}
            visible={modalVisible}
        // onRequestClose={this.closeModal}
        >
            <View style={styles.modal}>
                <View style={styles.modalView}>
                    <TouchableOpacity onPress={close} style={{ alignSelf: "flex-end", alignItems: 'center', justifyContent: 'center', width: "10%" }}>
                        <Icon name="close" style={{textAlign:"center"}}/>
                    </TouchableOpacity>
                    <Text style={styles.text}>
                        {`${service.service} (${service.duration} min)`}
                    </Text>
                    {/* renderTabBar={() => <ScrollableTab style={{backgroundColor:"white", borderWidth:0}} />} */}
                    {service.faqs && <Tabs  tabBarBackgroundColor={{ backgroundColor: "white", borderWidth: 0 }} tabBarUnderlineStyle={{ backgroundColor: colors.primaryBtn }}>
                        <Tab heading="Details" tabStyle={styles.tabs} textStyle={{ color: 'grey' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                            <View style={styles.details}>
                                <Text backgroundColor="blue">{service.description}</Text>
                            </View>
                        </Tab>
                        <Tab heading="FAQs" tabStyle={styles.tabs} textStyle={{ color: 'grey' }} activeTabStyle={{ backgroundColor: 'white' }} activeTextStyle={{ color: '#000', fontWeight: 'bold' }}>
                            <View style={styles.details}>
                                <View style={{flexDirection:"row", justifyContent:'space-between', alignItems:"center"}}>
                                    <Icon name='md-help-circle-outline' style={{ fontSize: 18 }} />
                                    <Text style={{width:"90%", fontSize:18,}}>{service.faqs[index].question} ?</Text>
                                </View>
                                <Text style={{width:"90%", paddingLeft:"10%", marginTop:"2%"}}>{service.faqs[index].answer}</Text>
                            </View>
                            <Button transparent style={{
                                alignSelf: "flex-end",
                                position: "absolute",
                                bottom: 10,
                                right: 10
                            }}
                                onPress={() => index < service.faqs.length - 1 ? setIndex(index + 1) : setIndex(0)}>
                                <Icon name="arrow-forward" style={{ color: "black" }} />
                            </Button>
                        </Tab>
                    </Tabs>}
                </View>
            </View>
        </Modal>
    );
}

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
        // justifyContent:"center",
        alignItems: "center",
        width: width * 0.9,
        height: height * 0.7,
        backgroundColor: "white",
        borderRadius: 15
    },
    tabs: {
        backgroundColor: "white"
    },
    text: {
        marginTop: "2%",
        fontSize: 16,
        textAlign: "center",
        width: "80%",
        fontWeight: "bold"
    },
    details: {
        paddingTop: "3%",
        alignSelf: "center",
        width: "80%",
        height:"80%"
    }
})
export default DetailsModal;