import React from 'react';
import { Content, ListItem, Text, View } from 'native-base';
import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, Image } from 'react-native';
import clock from '../../assets/clock.png'

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
    },
    {
        id: 3,
        heading: "Cleansing",
        duration: "20 min"
    }
]
const Review = () =>(
    <Content contentContainerStyle={{marginTop:"5%"}}>
        <FlatList
            showsVerticalScrollIndicator={false}
            style={{borderBottomWidth:1, borderBottomColor:"grey", width:"90%", alignSelf:"center"}}
            data={DATA}
            renderItem={({item}) => (
                <ListItem style={styles.listItem}>
                    <Text>{item.heading}</Text>
                    <View>
                        <Text>{item.duration}</Text>
                        {/* <Image source={} /> */}
                    </View>
                </ListItem>
            )}
            keyExtractor={item=>item.id}
        />
        <View style={styles.durationView}>
            <View style={styles.duration}>
                <Image source={clock} style={styles.img}/>
            <Text style={{paddingTop:"3%"}}>
                Duration
            </Text>
            </View>
            <Text style={{paddingTop:"3%", textAlign:"center", width:90}}>160 min</Text>
        </View>
    </Content>
)
const styles = StyleSheet.create({
    listItem:{
        marginVertical:"1%",
        flexDirection:"row",
        justifyContent:"space-between",
        borderBottomWidth:0,
        // backgroundColor:"green",
    },
    durationView:{
        width:"90%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignSelf:"center"
    },
    duration:{
        marginTop:"2%",
        flexDirection:"row",
        width:"30%",
        justifyContent:"space-between",
        // backgroundColor:"blue"
    },
    img:{
        height:25,
        width:25
    }

})
export default Review;