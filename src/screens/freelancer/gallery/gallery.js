import React, { Component } from 'react';
import { Container, Content, Text, Header, Left, Button, Icon, Body, Right } from 'native-base';
import { TouchableOpacity, StyleSheet, Image, ImageBackground, FlatList, Dimensions } from 'react-native';
import { colors } from '../../../configs/colors';
import p1 from '../../../assets/promotion1.png'
import p2 from '../../../assets/promotion2.png'
import p3 from '../../../assets/promotion3.png'

const gallery = [
    p1, p2, p3, p1
]

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            selected: []
        }
    }
    setFocus = (id) => {
        const { selected } = this.state
        selected.push(id)
        this.setState((ps) => ({ focused: !ps.focused, selected }))
    }
    addId = (id) => {
        const { selected } = this.state
        if (selected.indexOf(id) === -1) {
            console.log("SELETED IN IF", selected)
            selected.push(id)
            this.setState({ selected })
            return
        }
        console.log("SELETED IN ELSE", selected)

        const newSelected = selected.filter(item => item !== id)
        let focused = newSelected.length > 0 ? true : false
        this.setState({ selected: newSelected, focused })

    }
    render() {
        const { focused, selected } = this.state
        return (
            <Container>
                <Header style={styles.header} androidStatusBarColor={"white"} iosBarStyle="dark-content">
                    <Left >
                        <Button transparent>
                            <Icon name='arrow-back' style={{ color: "black" }} onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Body />
                    {focused &&
                        <Right>
                            <Button transparent>
                                <Icon name="share" style={{ color: "black" }} onPress={() => this.props.navigation.goBack()} />
                            </Button>
                            <Button transparent>
                                <Icon name="remove" style={{ color: "black" }} onPress={() => this.props.navigation.goBack()} />
                            </Button>
                        </Right>
                    }
                </Header>
                <Content contentContainerStyle={{ width: "100%", alignSelf: "center" }}>
                    {/* <TouchableOpacity style={{
                        backgroundColor: "green",
                        width:"45%",
                        margin:"2%",
                        height:180
                    }} onLongPress={() => this.setState({ focused: true })}>
                        <Text>
                            ABCD
                    </Text>
                    </TouchableOpacity> */}
                    <FlatList
                        data={gallery}
                        // horizontal={true}
                        numColumns={2}
                        contentContainerStyle={{
                            // justifyContent:"center",
                            // width:"90%",
                            // alignItems:"center",
                            alignSelf: "center"
                        }}
                        renderItem={({ item, index }) => (
                            index === 0 ? (
                                <TouchableOpacity style={{
                                    backgroundColor: "grey",
                                    width: Dimensions.get('window').width / 2,
                                    margin: "2%",
                                    height: 180,
                                    justifyContent: "center",
                                    alignItems: "center"
                                }} onLongPress={() => this.setState({ focused: true })}>
                                    <Text style={{ textAlign: "center" }}>
                                        ADD IMAGE ICON WILL COME HERE
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                    <TouchableOpacity style={{
                                        backgroundColor: "grey",
                                        width: Dimensions.get('window').width / 2,
                                        margin: 5,
                                        height: 180
                                    }} onLongPress={() => !focused && this.setFocus(item)}
                                        onPress={() => focused && this.addId(item)}>
                                        <ImageBackground source={item} style={{
                                            width: "100%",
                                            height: 180,
                                            opacity: selected.includes(item) ? 0.2 : 1
                                        }}
                                        // onLongPress={() => this.setState({ focused: true })}
                                        >
                                        </ImageBackground >
                                    </TouchableOpacity>
                                )
                        )}
                        keyExtractor={item => item}
                    />


                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: "transparent",
        elevation: 0,
        borderBottomWidth: 0
    },
})
export default Gallery;