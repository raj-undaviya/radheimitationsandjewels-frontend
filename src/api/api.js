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

//========================== CART API =====================================
const AddToCart = "/orders/cart";

//========================== WHISHLIST API =================================
const Wishlist = "/orders/wishlist";

// ================= ORDER API =================

// CREATE ORDER (Checkout)
const CreateOrder = "/orders/";

// VERIFY PAYMENT
const VerifyPayment = "/orders/payment/verify/";






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

//============================ CART API ===============================
// ADD TO CART
export const AddToCartAPI = () => AddToCart;
//in product page add to cart api
export const GetCartAPI = () => "/orders/cart";

// UPDATE QUANTITY
export const UpdateCartItemAPI = (id) => `/orders/cart/${id}`;

// REMOVE ITEM FROM CART
export const RemoveCartItemAPI = (id) => `/orders/cart/${id}`;

//========================== WHISHLIST FUNCTION API ====================
//add to whishlist
export const AddToWishlistAPI = () => Wishlist;

//remove whishlist
export const RemoveWishlistAPI = (id) => `/orders/wishlist/${id}`;

//view whishlist
export const GetWishlistAPI = () => Wishlist;

// ================= EXPORT =================

export const CreateOrderAPI = () => CreateOrder;
export const VerifyPaymentAPI = () => VerifyPayment;