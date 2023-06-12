const express=require('express')

const router= express.Router()

router.use((req,res)=>{
res.status(404).render("user/404",{pageTitle:"404",path:"/404"})
})

module.exports=router