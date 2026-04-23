// ================= AUTH APIs =================

// Register endpoint
const registerUser = "/users/auth";

//Login endpoint
const loginUser = "/users/auth";

//Collections endpoint
const CollectionSection = "/products/category";

//product Collection endpoint 
const ProductSection = "/products/";

//Product Gallery endpoint
const ProductGallery = "/products";

//Home page custom jwelley inquiry endpoint
const JewelleryInquiry = "/appointments/";






// ================= EXPORT FUNCTIONS =================
export const registerUserAPI = () => registerUser;
export const loginUserAPI = () => loginUser;
export const CollectionAPI = () => CollectionSection;
export const ProductSectionAPI = () => ProductSection;
export const ProductGalleryAPI = (id) => `${ProductGallery}/${id}`;
export const JewelleryInquiryAPI = () => JewelleryInquiry;

//booking appointment 
export const getTimeSlotsAPI = (date) => {
    return `/appointments/time-slots?date=${date}`;
};