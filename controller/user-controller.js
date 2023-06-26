const pdfkit = require("pdfkit");

const fs = require("fs");
const path = require("path");

const Product = require("../model/product");
const User = require("../model/user-model");
const Order = require("../model/order");

const { success, error } = require("../response-api/responseApi");
const { statusCode, message } = require("../constant/constant");

const getCart = async (req, res) => {
  console.log("Here");

  try {
    const cartsDetails = await req.user.cart;
    res
      .status(statusCode.SUCCESS)
      .json(success("success", { cart: cartsDetails }, res.statusCode));
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

const postCart = async (req, res) => {
  try {
    const { _id } = req.user;
    const user = await User.findById(_id);

    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (product) {
      const cartProductIndex = user.cart.items.findIndex(
        (cp) => cp.productId.toString() == product._id.toString()
      );

      let newQuantity = 1;
      const updatedCartItems = [...user.cart.items];

      if (cartProductIndex >= 0) {
        newQuantity = user.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
      } else {
        updatedCartItems.push({
          productId: product._id,
          quantity: newQuantity,
        });
      }

      const updatedCart = {
        items: updatedCartItems,
      };
      user.cart = updatedCart;

      await User.updateOne(
        { _id: req.user._id },
        { $set: { cart: user.cart } }
      );
      res.status(statusCode.SUCCESS).json(
        success(
          "success",
          {
            message: message.PRODUCT_ADDED_IN_CART,
          },
          res.statusCode
        )
      );
    } else {
      res
        .status(statusCode.NOT_FOUND)
        .json(error(message.PRODUCT_NOT_FOUND, res.statusCode));
    }
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};
const order = async (req, res) => {
  try {
    const userId = req.user._id;

    const userCart = await User.findById(userId);
    let orderItems = userCart.cart;
    const orders = new Order({ userId, orderItems });
    await orders.save();

    orderItems = {
      items: [],
    };

    await User.updateOne({ userId }, { $set: { cart: orderItems } });

    res.status(statusCode.SUCCESS).json(
      success(
        "success",
        {
          message: message.ORDER_SUCCESS,
        },
        res.statusCode
      )
    );
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

const getInvoice = async (req, res) => {
  try {
    const { orderId } = req.params;

    const allOrder = await Order.findById(orderId);

    const filRead = path.join("image", "ha.pdf");

    const filePdf = new pdfkit();

    res.setHeader("Content-Type", "application/pdf");

    filePdf.pipe(fs.createWriteStream(filRead));

    filePdf.pipe(res);

    const orderItems = allOrder.orderItems.items;
    let totalPrice = 0;

    const user = await User.findById(allOrder.userId);

    filePdf.text("").fontSize(40);
    filePdf.text(`Hello Mr/mrs ${user.userName} `).fontSize(20);
    filePdf.text(`----------------------------------`).fontSize(20);
    filePdf.text("").fontSize(20);

    filePdf.text(` Name    quantity    Price`);
    filePdf.text(`----------------------------------`).fontSize(20);

    await Promise.all(
      orderItems.map(async (items) => {
        const product = await Product.findById(items.productId);

        totalPrice += product.price * items.quantity;

        filePdf
          .text(`${product.title}  *  ${items.quantity}  =  ${product.price}`)
          .fontSize(40);
        filePdf.text("-------------------").fontSize(20);
      })
    );

    filePdf.text(`Total price =${totalPrice}`).fontSize(40);
    filePdf.end();
  } catch (err) {
    res
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .json(error(message.SERVER_ERROR, res.statusCode));
  }
};

module.exports = { postCart, getCart, order, getInvoice };
