import React, { Component } from 'react';
import { StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { View, Card, Body, CardItem, Container, Content, Text, Header, Drawer } from 'native-base';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import facial from '../../../assets/facial.png';
import makeup from '../../../assets/makeup.png';
import haircare from '../../../assets/hair-care.png';
// import manicure from '../../../assets/manicure.png';
import pedicure from '../../../assets/pedicure.png';
// import wax from '../../../assets/wax.png';
import CustomHeader from '../../../components/header/customHeader';
import CustomFooter from '../../../components/footer/customfooter';
import { connect } from 'react-redux';
import { catagoriesMiddleware } from '../../../redux/catagories/catagories.middleware'
import { timing } from 'react-native-reanimated';
import DrawerContent from '../../../components/Drawer/Drawer';
import Loader from '../../../components/loader/Loader';
import { notificationsMiddleware } from '../../../redux/notifications/notifications.middleware';


class Services extends Component {
    state = {
        DATA: [
            {
                id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
                source: facial,
                text: "Facial"
            },
            {
                id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
                source: makeup,
                text: "Mekaup"
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                source: haircare,
                text: "Hair Care"
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d33',
                source: pedicure,
                text: "Manicure"

            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d72',
                source: pedicure,
                text: "Padicure"
            },
            {
                id: '58694a0f-3da1-471f-bd96-145571e29d33',
                source: makeup,
                text: "Wax"
            },
        ]
    }
    componentDidMount() {
        const { user } = this.props
        this.props.getCatagories({ appuid: user.appuid, token: user.token })
        this.props.getNotifications({ appuid: user.appuid, token: user.token })

    }
    openDrawer = () => {
        this.drawer._root.open()
    };
    closeDrawer = () => {
        this.drawer._root.close()
    }
    render() {


        return (
            <Drawer
                panOpenMask={.25}
                side="left"
                acceptPan={false}
                tapToClose={true}
                ref={(ref) => { this.drawer = ref; }}
                content={<DrawerContent navigation={this.props.navigation} close={this.closeDrawer} />}
                onClose={() => this.closeDrawer()} >
                <Container style={styles.container} >
                    <CustomHeader icon={"menu"} leftButton={() => this.openDrawer()} header="Services" rightButton={() => this.props.navigation.navigate("Notification")} />
                    <Content height="80%">
                        {this.props.categories.message === "categories found" &&
                            <FlatList
                                contentContainerStyle={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    flex: 1,
                                    // alignItems: "center"
                                }}
                                data={this.props.categories.categories}
                                renderItem={({ item, index }) => (
                                    <View style={{ width: width * 0.5, height: height * 0.25, }} >
                                        <Card style={styles.listCard} >
                                            <CardItem button style={{
                                                justifyContent: 'center',
                                                // paddingTop: 20,
                                                alignItems: "center",
                                                flexDirection: "column"

                                            }}
                                                onPress={() => {
                                                    this.props.navigation.navigate("ServicesTabs", {
                                                        serviceId: item.id,
                                                        currentTab: index
                                                    })
                                                }}
                                            >
                                                <Image source={{ uri: item.image }} style={styles.img} />
                                                <Text style={{ textAlign: "center", marginTop: "10%" }}>{item.category}</Text>
                                            </CardItem>
                                        </Card>
                                    </View>
                                )
                                }
                                keyExtractor={item => item.id}
                            />}
                        {this.props.categories.message === "get categories request" && <Loader />}
                    </Content>
                    <CustomFooter navigation={this.props.navigation} isActive='treatment' />
                </Container>
            </Drawer>
        )

    }
}


const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        marginTop: "3%",
        marginBottom: 0,
        paddingBottom: 0
        // justifyContent: "flex-end",
    },
    listCard: {
        width: width * 0.5,
        height: height * 0.25,
        elevation: 0,
        justifyContent: "center"

    },
    img: {
        width: 58,
        height: 60,
    }
})
const mapStataToProps = ({ user, categories }) => ({ user, categories })
const mapDispatchToProps = dispatch => ({
    getCatagories: data => dispatch(catagoriesMiddleware(data)),
    getNotifications: data => dispatch(notificationsMiddleware(data))
})
export default connect(mapStataToProps, mapDispatchToProps)(Services);