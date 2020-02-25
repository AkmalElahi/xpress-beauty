import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Container, Content, Card, CardItem, Text, View } from 'native-base';
import { CustomButton } from '../../components/buttons/Buttons';
import { colors } from '../../configs/colors'

const height = Dimensions.get('window').height
const width = Dimensions.get('window').width;
const Promotion = ({ img, heading, onPress }) => (
    <Container style={{ justifyContent: "space-between", height }} >
        <Content  >
            <Card style={{

                justifyContent: "space-between",
                paddingLeft: 0,
                paddingRight: 0,
                paddingTop: 0,
                paddingBottom: 0,
                height
            }}
            >
                <CardItem cardBody style={{ justifyContent: "flex-start", alignItems: "center", flexDirection: "column" }} >
                    <Image source={img} style={{ height: height * 0.485, width: width * 0.9, marginTop: "3%" }} />
                    <View style={{ justifyContent: "center", width: width * 0.9, marginTop: 5 }} >
                        <Text style={{ fontWeight: "bold", fontSize: 25 }}>{heading} </Text>
                        <Text style={{ fontSize: 15, paddingTop: 6 }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                             sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                             Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                             Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        </Text>
                    </View>
                </CardItem>

            </Card>
        </Content>
        <View style={{
            // height:100,
            paddingLeft: 0,
            paddingRight: 0,
            paddingTop: 0,
            paddingBottom: 0,
            flexDirection: "column",
            justifyContent: "flex-end",
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 80,
        }}>
            <Text onPress={onPress} style={{ color: colors.primaryBtn, alignSelf: "flex-end", marginBottom: "2%", marginRight: "2%" }}>Skip</Text>
            <CustomButton color="white" backgroundColor={colors.primaryBtn} height={60} value="Login" onPress={onPress} />
        </View>
    </Container>
);

export default Promotion