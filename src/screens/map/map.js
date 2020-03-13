import React, { Component } from 'react';
import { Text, View, ActivityIndicator, Button, PermissionsAndroid, Dimensions } from 'react-native';
import MapView from "react-native-maps";
import styles from "./styles";
import Geolocation from '@react-native-community/geolocation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import AddressModal from '../../components/Modal/AddressModal'
import { connect } from 'react-redux';
let { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0062998339347544174 //Very high zoom level
const LONGITUDE_DELTA = 0.004023313891394764
// Disable yellow box warning messages
console.disableYellowBox = true;

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            region: null,
            isMapReady: false,
            marginTop: 1,
            userLocation: "",
            regionChangeProgress: false,
            addressComponents: "",
            addressType: "",
            modalVisible: false
        };
    }
    getPosition = async () => {
        console.log("INSIDE GET POSTION")
        Geolocation.getCurrentPosition(
            (position) => {
                const region = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                };
                console.log("REGION", position)
                this.setState({
                    region: region,
                    loading: false,
                    error: null,
                    initialRegion: null
                });
            },
            (error) => {
                // alert(error);
                this.setState({
                    error: error.message,
                    loading: false,
                    initialRegion: {
                        latitude: 24.926294,
                        longitude: 67.022095,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    },
                })
            },
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 5000 },
        );
    }
    componentDidMount() {
        console.log("USER FROM REDUX", this.props.user)
        const { user } = this.props
        console.log("FROM IN MAP", this.props.navigation.getParam("from"))
        const from = this.props.navigation.getParam("from")
        this.getPosition()
        if (from === "checkout") {
            this.setState({
                from,
                userLocation:user.house ? user.house : user.building,
                modalVisible: false,
                initialRegion: {
                    latitude: 24.926294,
                    longitude: 67.022095,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                },
                addressType: ["street_address"],
                addressComponents: [
                    {
                        "long_name": user.building,
                    },
                    {
                        "long_name": user.street,
                    },
                    {
                        "long_name": user.street,
                    },
                    {
                        "long_name": user.area,
                    },
                    {
                        "long_name": user.city,
                    }
                ]
            })
        }




        // ${user.street} ${user.area} ${user.city}`,
        // initialRegion:{
        //     latitude: 24.926294,
        //     longitude: 67.022095,
        //     latitudeDelta: LATITUDE_DELTA,
        //     longitudeDelta: LONGITUDE_DELTA,
        // }
        // userLocation : "G 6, Block 8 Clifton, Karachi, Karachi City, Sindh 75600, Pakistan"
        // this.fetchAddress()
        // this.setState({
        //     loading: false,
        //     initialRegion: {
        //         latitude: 24.926294,
        //         longitude: 67.022095,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421,
        //     },
        // })
        // Geolocation.getCurrentPosition(
        //     (position) => {
        //         const region = {
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude,
        //             latitudeDelta: 0.001,
        //             longitudeDelta: 0.001
        //         };
        //         this.setState({
        //             region: region,
        //             loading: false,
        //             error: null,
        //         });
        //     },
        //     (error) => {
        //         alert(error);
        //         this.setState({
        //             error: error.message,
        //             loading: false
        //         })
        //     },
        //     { enableHighAccuracy: true, timeout: 200000, maximumAge: 5000 },
        // );
    }

    onMapReady = () => {
        this.setState({ isMapReady: true, marginTop: 0 });
    }

    // Fetch location details as a JOSN from google map API
    fetchAddress = () => {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.region.latitude + "," + this.state.region.longitude + "&key=" + "AIzaSyBr2Ajtt8LqfpdhU3ZM9wH9T2J78L6latk")
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("Response", responseJson.results[0].types)
                const userLocation = responseJson.results[0].formatted_address;
                this.setState({
                    userLocation: userLocation,
                    regionChangeProgress: false,
                    addressComponents: responseJson.results[0].address_components,
                    addressType: responseJson.results[0].types,
                    modalVisible: true
                });
            });
    }

    // Update state on region change
    onRegionChange = region => {
        this.setState({
            region,
            regionChangeProgress: true
        }, 
       () => {
        !this.state.initialRegion && this.fetchAddress()}
        );
        // this.setState({
        //     region
        // })
    }

    // Action to be taken after select location button click
    onLocationSelect = () => alert(this.state.userLocation);
    createProfile = () => {
        const { } = this.state
    }
    render() {
        if (this.state.loading) {
            return (
                <View style={styles.spinnerView}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        } else {
            return (
                <View style={styles.container}>
                    <View style={{ width: "100%", height: "100%" }}>
                        {
                            (this.state.initialRegion || this.state.region) &&
                            // !!this.state.region.latitude && !!this.state.region.longitude &&
                            <MapView
                                style={{ flex: 1 }}
                                // initialRegion={this.state.initialRegion}
                                showsUserLocation={true}
                                autoFocus={true}
                                region={this.state.region ? this.state.region : this.state.initialRegion}
                                onMapReady={this.onMapReady}
                                onRegionChangeComplete={this.onRegionChange}
                            >

                                {this.state.region && <MapView.Marker
                                    coordinate={{ "latitude": this.state.region.latitude, "longitude": this.state.region.longitude }}
                                    title={"Your Location"}
                                    draggable
                                />}
                            </MapView>
                        }

                        {/* <View style={styles.mapMarkerContainer}>
                            <Text style={{ fontFamily: 'fontawesome', fontSize: 42, color: "#ad1f1f" }}>&#xf041;</Text>
                        </View> */}
                        {/* <View style={styles.deatilSection}>
                        <Text style={{ fontSize: 16, fontWeight: "bold", fontFamily: "roboto", marginBottom: 20 }}>Move map for location</Text>
                        <Text style={{ fontSize: 10, color: "#999" }}>LOCATION</Text>
                        <Text numberOfLines={2} style={{ fontSize: 14, paddingVertical: 10, borderBottomColor: "silver", borderBottomWidth: 0.5 }}>
                            {!this.state.regionChangeProgress ? this.state.userLocation : "Identifying Location..."}</Text>
                        <View style={styles.btnContainer}>
                            <Button
                                title="PICK THIS LOCATION"
                                disabled={this.state.regionChangeProgress}
                                onPress={this.onLocationSelect}
                            >
                            </Button>
                        </View>
                    </View> */}
                    </View>
                    <View style={{ position: "absolute", top: 100, width: "90%", alignSelf: "center", backgroundColor: "white" }}>
                        <GooglePlacesAutocomplete
                            styles={{
                                textInputContainer: {
                                    backgroundColor: 'rgba(0,0,0,0)',
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0
                                },
                                textInput: {
                                    marginLeft: 0,
                                    marginRight: 0,
                                    height: 38,
                                    color: '#5d5d5d',
                                    fontSize: 16
                                },
                                predefinedPlacesDescription: {
                                    color: '#1faadb'
                                },
                            }}
                            // currentLocation={true}
                            // getCurrentPosition={this.getPosition
                            // currentLocationLabel="Current location"
                            text={this.state.userLocation ? this.state.userLocation : ""}
                            placeholder='Enter your address'
                            minLength={1} // minimum length of text to search
                            autoFocus={true}
                            returnKeyType={'search'} // Can be left out for default return key 
                            listViewDisplayed={false}    // true/false/undefined
                            fetchDetails={true}
                            onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                                console.log("SEARCH RESULT", details.geometry.location);
                                const region = {
                                    latitudeDelta: LATITUDE_DELTA,
                                    longitudeDelta: LONGITUDE_DELTA,
                                    latitude: details.geometry.location.lat,
                                    longitude: details.geometry.location.lng
                                }
                                this.setState({
                                    region
                                }, () => this.fetchAddress())
                                // })
                            }
                            }

                            query={{
                                key: 'AIzaSyBr2Ajtt8LqfpdhU3ZM9wH9T2J78L6latk',
                                language: 'en',
                                components: "country:pk",
                                // types: '(address)'
                            }}
                            // GooglePlacesSearchQuery={{
                            //     // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                            //     rankby: 'distance',
                            //     type: 'address'
                            // }}
                            nearbyPlacesAPI="GoogleReverseGeocoding"
                            debounce={300}
                        // predefinedPlaces={[this.state.userLocation]}
                        />
                    </View>
                    <AddressModal from={this.state.from} navigation={this.props.navigation} modalVisible={this.state.modalVisible} addressComponents={this.state.addressComponents} addressType={this.state.addressType} />
                </View>
            );
        }
    }
}
const mapStateToProps = ({ user }) => ({ user: user })
export default connect(mapStateToProps)(Map)