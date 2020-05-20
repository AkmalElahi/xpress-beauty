export default class Path {

    static BASE_URL = 'http://devwebapps.xpressbeauty.pk/index.php/Api'

    static GENERATE_OTP = `${this.BASE_URL}/GenerateOtp`

    static VERIFY_OTP = `${this.BASE_URL}/VerifyOtp`
    
    static GET_PROMOTIONS = `${this.BASE_URL}/get_promotions`

    static GET_CATAGORIES = `${this.BASE_URL}/get_categories`

    static GET_ALL_CATAGORIES = `${this.BASE_URL}/get_allcategories`
    
    static GET_COUNTRIES = `${this.BASE_URL}/get_country`

    static UPDATE_PROFILE = `${this.BASE_URL}/UserProfile`
    
    static CHECKOUT = `${this.BASE_URL}/set_job`

    static GET_BOOKINGS = `${this.BASE_URL}/get_jobs`
    
    static GET_BEAUTICIANS = `${this.BASE_URL}/get_beauticians`

    static GET_NOTIFICATIONS = `${this.BASE_URL}/get_notifications`
    
    static GET_TOOLS = `${this.BASE_URL}/get_tools`

    static GET_SKILLS = `${this.BASE_URL}/get_skills`

    static CHECK_STATUS = `${this.BASE_URL}/check_status`

    static GET_JOBS_FREELANCER = `${this.BASE_URL}/get_jobs_freelancer`

    static GET_JOBS_FREELANCER_HISTORY = `${this.BASE_URL}/get_jobs_freelancer_history`

    static UPDATE_JOBS_FREELANCER = `${this.BASE_URL}/update_jobs_freelancer`

    static UPDATE_FREELANCER_PROFILE = `${this.BASE_URL}/updateFreelancerProfile`

    static UPLOAD_GALLERY_IMAGE = `${this.BASE_URL}/upload_gallery_image` 

    static GET_GALLERY_IMAGE = `${this.BASE_URL}/get_gallery_image` 

    static UPDATE_NOTIFICATIONS = `${this.BASE_URL}/update_notifications`

    static SET_FREELANCER_STATUS = `${this.BASE_URL}/set_freelancer_status`

    static GET_JOBS_DETAILS = `${this.BASE_URL}/get_jobs_details`

    static UPDATE_JOBS = `${this.BASE_URL}/update_jobs`

    static SET_RATING = `${this.BASE_URL}/set_rating`

    static UPLOAD_PROFILE_IMAGE = `${this.BASE_URL}/upload_profile_image`

    
}