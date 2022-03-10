const router = require("express").Router();
const {
  getAllProduct,
  createProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require("../Controllers/productC");
const upload = require("../middlewares/imageUpload");

router.route("/product").get(getAllProduct).post(upload, createProduct);

router
  .route("/product/:id")
  .get(getSingleProduct)
  .delete(deleteProduct)
  .patch(updateProduct);

module.exports = router;
