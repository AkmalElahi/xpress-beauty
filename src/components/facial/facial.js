import React from 'react';
import { Container, Content, View, Text, Card, CardItem } from 'native-base';
import { Image, StyleSheet, FlatList } from 'react-native';
import facialBanner from '../../assets/facialbanner.png';
import { colors } from '../../configs/colors';
import { RoundButton } from '../../components/buttons/Buttons'

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
    },
    {
        id: 4,
        heading: "Clasical Facial",
        duration: "80 min"
    },
    {
        id: 5,
        heading: "Herbal Facial",
        duration: "60 min"
    },
    {
        id: 6,
        heading: "Cleansing",
        duration: "20 min"
    }
]

const Facial = () => (
    <Container>
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
                data={DATA}
                renderItem={({ item }) => (
                    <View style={{ width: "100%", borderBottomColor:"grey", borderBottomWidth:0.3 }} >
                        <Card transparent style={styles.listCard} >
                            <CardItem style={{
                                justifyContent:"flex-start",
                                flexDirection:"column",
                                width:"50%"
                            }}>
                                <Text style={{fontWeight:"normal", textAlign:"left", fontSize:18}}>{item.heading}</Text>
                                <Text style={{textAlign:"left", fontSize:12}}>{item.duration}</Text>
                            </CardItem>
                            <CardItem style={{
                                justifyContent: 'center',
                                width:"30%"
                            }}>
                                <RoundButton 
                                backgroundColor={colors.primaryBtn} 
                                color="white" 
                                height={20} 
                                value="More Details" 
                                fontSize={10}/>
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
export default Facial;