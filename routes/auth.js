const express=require("express")

const router = express.Router();

const isAuth=require("../middleware/isAuth")

const {register,login,logout}=require("../controller/auth")

router.post("/register",register)

router.post("/login",login)

router.post("/logout",isAuth,logout)


module.exports=router