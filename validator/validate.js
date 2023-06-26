const{check}=require("express-validator")

const loginValidator=[
    [check("email").exists().withMessage('email is required').isEmail().withMessage('please enter valid email'),
    check("password","Password must be 5 character").notEmpty().isLength({min:5})]
]
const signUpValidator=[check("userName").exists()
.withMessage('userName is required'),
  check("email").exists()
  .withMessage('email is required').isEmail().withMessage('please enter valid email'),
  check("password","Password must be 5 character").isLength({min:5})]

  const productValidator=[    
    check("title")
      .exists()
      .withMessage("Title is required")
      .isString()
      .withMessage("Title is only String"),
    check("price")
      .exists()
      .withMessage("Price is required")
      .isInt()
      .withMessage("Price is only number"),
    check("description")
      .exists()
      .withMessage("Description is required")
      .isLength({ min: 5, max: 100 })
      .withMessage("required min 5 character and max 100 character"),
  ]

module.exports={loginValidator,signUpValidator,productValidator}