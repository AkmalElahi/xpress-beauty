export default class Path {

    static BASE_URL = 'http://devwebapps.xpressbeauty.pk/index.php/Api'

    static GENERATE_OTP = `${this.BASE_URL}/GenerateOtp`

    static VERIFY_OTP = `${this.BASE_URL}/VerifyOtp`
    
    static GET_PROMOTIONS = `${this.BASE_URL}/get_promotions`

    static GET_CATAGORIES = `${this.BASE_URL}/get_categories`

    static GET_ALL_CATAGORIES = `${this.BASE_URL}/get_allcategories`
    
    static GET_COUNTRIES = `${this.BASE_URL}/get_country`

    static UPDATE_PROFILE = `${this.BASE_URL}/UserProfile`


}