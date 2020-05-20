import React, { Component } from 'react';
import { Container, Content, Text, Header, Left, Button, Icon, Body, Right, View, Title } from 'native-base';
import { TouchableOpacity, StyleSheet, Image, ImageBackground, FlatList, Dimensions } from 'react-native';
import DocumentPicker from 'react-native-document-picker'
import { colors } from '../../../configs/colors';
import p1 from '../../../assets/promotion1.png'
import p2 from '../../../assets/promotion2.png'
import p3 from '../../../assets/promotion3.png'
import add from '../../../assets/add.png'
import checked from '../../../assets/checked.png'
import FreelancerFooter from '../../../components/footer/freelancerFooter';
import { connect } from 'react-redux';
import { getGalleryMiddleware, uploadGalleryMiddleware } from '../../../redux/gallery/gallery.middleware';

const gallery = [
    "add", p1, p2, p3, p1, p2, p1
]

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
            selected: [],
            file: null,
            user: null
        }
    }
    componentDidMount() {
        const { user } = this.props
        if (user) {
            console.log("USER IN GALLERY", user)
            this.setState({ user })
            this.props.getImages({ appuid: user.appuid, token: user.token })
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
    handleChoosePhoto = async () => {
        try {
            this.setState({
                uploading: true
            })
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.images],
            });
            console.log(res)
            this.setState({
                file: res,
                uploading: false
            })
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
                console.log("ERROR IN PICKER", err)
                this.setState({
                    uploading: false
                })
            } else {
                // throw err;
                this.setState({
                    uploading: false
                })
            }
        }
    }
    uploadImage = () => {
        const { file, user } = this.state
        console.log("INSIDE UPLOAD IMAGE")
        if (user && file) {
            console.log("INSIDE UPLOAD IMAGE")

            this.props.uploadImage({ image: file, appuid: user.appuid, token: user.token })
        }
    }
    componentDidUpdate(prevProps) {
        const { file, user } = this.state
        const { gallery } = this.props
        if (gallery !== prevProps.gallery) {
            if (gallery.message === "upload gallery image success") {
                this.setState({ file: null })
                this.props.getImages({ appuid: user.appuid, token: user.token })
            }
        }
    }
    render() {
        const { focused, selected, file } = this.state
        console.log("SELECTED", selected)
        return (
            <Container>
                <Header style={styles.header} androidStatusBarColor={"white"} iosBarStyle="dark-content">
                    <Left >
                        <Button transparent>
                            <Icon name='arrow-back' style={{ color: "black" }} onPress={() => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Body style={{ flex: 1, alignItems:"center" }}>
                        <Title style={{ color: "black", fontWeight: "normal" }} >Gallery</Title>
                    </Body>
                    <Right style={{flex:1,alignItems:"flex-end"}}>
                        {focused && <View style={{flexDirection:"row", flex:1}}>
                            <Button transparent>
                                <Icon name="share" style={{ color: "black" }} onPress={() => this.props.navigation.goBack()} />
                            </Button>
                            <Button transparent>
                                <Icon name="remove" style={{ color: "black" }} onPress={() => this.props.navigation.goBack()} />
                            </Button></View>}
                        <Button transparent>
                            <Icon name="home" style={{ color: "black" }} onPress={() => this.props.navigation.navigate("FreelancerNotification")} />
                        </Button>
                    </Right>
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
                        data={this.props.gallery.gallery ? ["add", ...this.props.gallery.gallery] : ["add"]}
                        // horizontal={true}
                        numColumns={2}
                        contentContainerStyle={{
                            // justifyContent:"center",
                            // width: "90%",
                            // alignItems: "center",
                            // justifyContent: "flex-start",
                            // alignSelf: "center"
                        }}
                        renderItem={({ item, }) => (
                            item === "add" ? (
                                <TouchableOpacity style={{
                                    backgroundColor: "white",
                                    width: Dimensions.get("window").width / 2,
                                    padding: 5,
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} onPress={this.handleChoosePhoto}>
                                    <Image source={file ? file : add} style={file ? { width: 150, height: 150 } : { width: 50, height: 50 }} />
                                    <View style={{ width: "70%", flexDirection: "row", justifyContent: "space-between" }}>
                                        <Text onPress={file && this.uploadImage} style={{ textAlign: "center", color: colors.freelancerButton }}>
                                            {file === null ? "Add new image in gallery" : "Upload"}
                                        </Text>
                                        {file && <Text style={{ color: "red" }} onPress={() => this.setState({ file: null })}>Cancel</Text>}
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                    <TouchableOpacity style={{
                                        backgroundColor: "white",
                                        width: Dimensions.get("window").width / 2,
                                        padding: 5,
                                        justifyContent: "center",
                                        alignItems: "center",
                                        // height: 180
                                    }} onLongPress={() => !focused && this.setFocus(item)}
                                        onPress={() => focused && this.addId(item)}>
                                        <ImageBackground source={{ uri: item.image }} style={{
                                            width: Dimensions.get('window').width / 2,
                                            height: Dimensions.get('window').width / 2,
                                            // justifyContent:"flex-start",
                                            opacity: selected.includes(item) ? 0.8 : 1
                                        }}
                                        // onLongPress={() => this.setState({ focused: true })}
                                        >
                                            {selected.includes(item) && <Image source={checked} style={{ marginLeft: 5, width: 20, height: 20 }} />}
                                        </ImageBackground >
                                    </TouchableOpacity>
                                )
                        )}
                        keyExtractor={item => item}
                    />


                </Content>
                <FreelancerFooter
                    isActive="gallery"
                    navigation={this.props.navigation}
                />
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
const mapStateToProps = ({ user, gallery }) => ({ user, gallery })
const mapDispatchToProps = (dispatch) => ({
    getImages: data => dispatch(getGalleryMiddleware(data)),
    uploadImage: data => dispatch(uploadGalleryMiddleware(data))
})
export default connect(mapStateToProps, mapDispatchToProps)(Gallery);