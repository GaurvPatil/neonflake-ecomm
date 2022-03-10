const { product } = require("../modules/ProductShcema")
const mongoose = require("mongoose")
const path = require("path");

const  getAllProduct = async (req, res) => {
    try {
      const data = await product.find({});
      res.status(201).json({ data, length: data.length });
    } catch (error) {
      //server error status code
      res.status(500).json({ msg: error });
    }
  };
  
  const createProduct = async (req, res) => {
  

    let info = {
      title:req.body.title,
      description:req.body.description,
      price:req.body.price,
      image:req.body.image,
    }
    try {
      const data = await product.create(info);
      res.status(201).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };
  
  const getSingleProduct = async (req, res) => {
    try {
      const { id: postID } = req.params;
      const data = await product.findOne({ _id: postID });
      if (!data) {
        return res.status(404).json({ msg: `No Post With ID: ${postID}` });
      }
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };


  const updateProduct = async (req, res) => {
    console.log(req.body)
    try {
      const { id: postID } = req.params;
      const data = await product.findOneAndUpdate({ _id: postID }, req.body, {
        new: true,
        runValidators: true,
      });
      if (!data) {
        return res.status(404).json({ msg: `No Post With ID: ${postID}` });
      }
      res.status(200).json({ id: postID, data: req.body });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };


  const   deleteProduct = async (req, res) => {
    console.log(req)
    try {
      const { id: postID } = req.params;
      const data = await product.findOneAndDelete({ _id: postID });
      if (!data) {
        return res.status(404).json({ msg: `No Post With ID: ${postID}` });
      }
      res.status(200).json({ data: null, status: "success" });
    } catch (error) {
      res.status(500).json({ msg: error });
    }
  };

  module.exports = {
    getAllProduct,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
  }