const statusCode={
    SUCCESS: 200,
    ACCEPT:202,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VADIDATION_ERROR:422,
    METHOD_NOT_ALLOWED: 405,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
}
const message={
    SERVER_ERROR: "Internal Server Error",
    VALIDATION_ERROR: "Invalid Credentials",
    MISSING_FIELD: "please fill all fields",
    ADD_PRODUCT: "Product Added",
    PRODUCT_NOT_FOUND: "Product not found",
    DATA_DELETED:"Data successfully Deleted",
    DATA_UPDATED:"Data updated",
    NOT_FOUND:"Page not found",
    USER_NOT_FOUND:"User not found",
    PRODUCT_ADDED_IN_CART:"product added into cart",
    INVALID_TOKEN:"Invalid token",
    NOT_AUTHORIZE:"Not authorized",
    ORDER_SUCCESS:"your order is accepted",
    REGISTERED:"Email already registerd",
    LOGEDIN:"Login successfully",
    LOGOUT:"User logout",
    LOGINFIRTS:"Login first",


}
module.exports={statusCode,message}