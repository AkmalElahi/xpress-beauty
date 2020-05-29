import React from 'react';
import { Content, ListItem, Text, View, Icon, Toast } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, Image } from 'react-native';
import { CustomButton } from '../buttons/Buttons'
import clock from '../../assets/clock.png'
import { colors } from '../../configs/colors'
import { connect } from 'react-redux';
import { removeServiceFromCart } from '../../redux/cart/cart.actions';

const DATA = [
    {
        id: 1,
        heading: "Clasical Facial",
        duration: "80 min"
    },
    {
        id: 2,
        heading: "Herbal Facial",
        duration: "60 min"
    }
    ,
    {
        id: 1,
        heading: "Clasical Facial",
        duration: "80 min"
    },
    {
        id: 2,
        heading: "Herbal Facial",
        duration: "60 min"
    }
    ,
    {
        id: 1,
        heading: "Clasical Facial",
        duration: "80 min"
    },
    {
        id: 2,
        heading: "Herbal Facial",
        duration: "60 min"
    }
]
const Review = ({cart, total, totalDuration, deleteItemFromCart, navigation}) =>  { 
    return cart.services.length ? <Content contentContainerStyle={{ marginTop: "5%" , }} scrollEnabled={false}>
        <View style={{ height: 430, justifyContent: "space-between", alignSelf:"center", width:"100%" }}>
            <View style={{ maxHeight:"85%"}}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{ alignSelf: "center", width:"95%", }}
                    data={cart && cart.services}
                    renderItem={({ item }) => (
                        <ListItem style={styles.listItem}>
                            <Text style={{width:"50%" , textAlign:"left"}}>{item.service}</Text>
                            <Text style={{width:"20%" , textAlign:"center"}}>{item.duration} mins</Text>
                            <View style={{width:"30%", flexDirection:"row",alignItems:"center", justifyContent:"space-around"}}>
                                <Text style={{textAlign:"right", width:"70%"}}>Rs.{item.price}</Text>
                                <Icon  name="close-circle-outline" style={{alignSelf:"flex-end",fontSize:18}} onPress={()=>{
                                    deleteItemFromCart(item)
                                    Toast.show({
                                        text: "Service Removed from Cart",
                                        // style:{width:"90%", alignSelf:"center", borderRadius:10,},
                                        textStyle:{textAlign:"center"},
                                        position: "bottom",
                                        type:'warning',
                                        duration:2000
                                      })
                                    }}/>
                            </View>
                        </ListItem>
                    )}
                    keyExtractor={item => item.id}
                />
            <View style={styles.durationView}>
                    <Text style={{ width:"35%", fontWeight:"bold",textAlign:"left", fontSize:18}}>
                        Total
                    </Text>
                <View style={styles.duration}>
                    <Image source={clock} style={styles.img} />
                    <Text style={{ fontWeight:"bold" }}>{totalDuration} mins</Text>
                </View>
                    <Text style={{width:"30%", fontWeight:"bold", textAlign:"center", fontSize:18}}>Rs. {total}</Text>
            </View>
            </View>
        </View>
            {/* <View style={{ position:'absolute', bottom:0, right:0, width:"100%" }}><CustomButton
                value="Continue" backgroundColor={colors.primaryBtn} height={60} color="white" fontSize={25} />
            </View> */}
    </Content> : <View >{ navigation.navigate("Services")}</View>
                    }
const styles = StyleSheet.create({
    listItem: {
        marginVertical: "1%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        borderBottomWidth: 0.5, borderBottomColor: "grey",
        marginLeft:0,
        paddingLeft:0
    },
    durationView: {
        marginTop:"2%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignSelf: "center",
    },
    duration: {
        // marginTop: "2%",
        flexDirection: "row",
        width: "30%",
        alignItems:"center",
        justifyContent: "center",
        // backgroundColor:"blue"
    },
    img: {
        height: 18,
        width: 18,
    }

})

const mapStateToProps = ({cart}) => ({
    cart:cart,
    total: cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + parseInt(cartItem.price), 0),
    totalDuration: cart.services.reduce((accumulatedValue, cartItem) => accumulatedValue + parseInt(cartItem.duration), 0)

})
const mapDispatchToProps = dispatch => ({
    deleteItemFromCart: data => dispatch(removeServiceFromCart(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Review);