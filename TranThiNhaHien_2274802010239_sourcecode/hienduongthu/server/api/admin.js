// module.exports = router;
const express = require("express"); // import express module
const router = express.Router(); // create a router object
const JwtUtil = require("../utils/JwtUtil"); // import JwtUtil module
const jwt = require("jsonwebtoken"); // import jsonwebtoken module
const MyConstants = require("../utils/MyConstants"); // import MyConstants module
const AdminDAO = require("../models/AdminDAO"); // import AdminDAO module
const CategoryDAO = require("../models/CategoryDAO"); // import CategoryDAO module
const ProductDAO = require("../models/ProductDAO");
const OrderDAO = require("../models/OrderDAO");
const Models = require("../models/Models");
const mongoose = require("mongoose"); // import mongoose module

// Admin login
router.post("/login", async (req, res) => {
  // async (req, res) => {} là Đây là một hàm bất đồng bộ (async function) dùng để xử lý request, req là yêu cầu từ phía client gửi lên (chứa dữ liệu đăng nhập). res là phản hồi từ phía server gửi về client (chứa kết quả xử lý).
  const { username, password } = req.body; // const { username, password } = req.body; là cách destructuring assignment để lấy giá trị của username và password từ req.body (body của request).
  if (username && password) {
    // if (username && password) là kiểm tra xem username và password có tồn tại hay không.
    const admin = await AdminDAO.selectByUsernameAndPassword(
      username,
      password,
    ); // const admin = await AdminDAO.selectByUsernameAndPassword(username, password); là gọi hàm selectByUsernameAndPassword của AdminDAO để lấy thông tin admin từ cơ sở dữ liệu.
    if (admin) {
      // if (admin) là kiểm tra xem có admin nào được tìm thấy hay không.
      const token = JwtUtil.genToken({ userId: admin._id, role: "admin" }); // const token = JwtUtil.genToken({ userId: admin._id, role: 'admin' }); là tạo token cho admin với thông tin userId và role.
      res.json({ success: true, message: "Authentication successful", token }); // res.json({ success: true, message: 'Authentication successful', token }); là gửi phản hồi về client với thông tin thành công và token.
    } else {
      // else là nếu không tìm thấy admin nào.
      res.json({ success: false, message: " username or password không đúng" }); // res.json({ success: false, message: 'Incorrect username or password' }); là gửi phản hồi về client với thông tin lỗi.
    }
  } else {
    // else là nếu không có username hoặc password.
    res.json({ success: false, message: "Vui lòng nhập username and password" }); // res.json({ success: false, message: 'Please input username and password' }); là gửi phản hồi về client với thông tin lỗi.
  }
});

// Category CRUD
router.get("/categories", JwtUtil.checkToken, async (req, res) => {
  // JwtUtil.checkToken là middleware để kiểm tra token của client gửi lên.
  const categories = await CategoryDAO.selectAll(); // const categories = await CategoryDAO.selectAll(); là gọi hàm selectAll của CategoryDAO để lấy tất cả các danh mục từ cơ sở dữ liệu.
  res.json(categories); // res.json(categories); là gửi phản hồi về client với danh sách các danh mục.
});

router.post("/categories", JwtUtil.checkToken, async (req, res) => {
  // JwtUtil.checkToken là middleware để kiểm tra token của client gửi lên.
  try {
    const { name } = req.body; // const { name } = req.body; là cách destructuring assignment để lấy giá trị của name từ req.body (body của request).
    if (!name)
      return res.status(400).json({ error: "Category name is required" }); // if (!name) return res.status(400).json({ error: 'Category name is required' }); là kiểm tra xem name có tồn tại hay không.

    const category = { name }; // const category = { name }; là tạo một đối tượng category với thông tin name.
    const result = await CategoryDAO.insert(category); // const result = await CategoryDAO.insert(category); là gọi hàm insert của CategoryDAO để thêm danh mục vào cơ sở dữ liệu.
    res.json(result); // res.json(result); là gửi phản hồi về client với kết quả thêm danh mục.
  } catch (error) {
    console.error("Error Adding Category:", error);   // console.error('Error Adding Category:', error); là in ra lỗi để debug.
    res.status(500).json({ error: "Failed to add category" });      // res.status(500).json({ error: 'Failed to add category' }); là gửi phản hồi về client với thông tin lỗi.
  }
});

router.put("/categories/:id", JwtUtil.checkToken, async (req, res) => {      // JwtUtil.checkToken là middleware để kiểm tra token của client gửi lên.
  try {        // try-catch để bắt lỗi
    const _id = req.params.id;        // const _id = req.params.id; là lấy giá trị của id từ req.params (params của request).
    const { name } = req.body;      // const { name } = req.body; là cách destructuring assignment để lấy giá trị của name từ req.body (body của request).
    if (!_id || !name)        // if (!_id || !name) là kiểm tra xem _id và name có tồn tại hay không.
      return res        // if (!_id || !name) return res là gửi phản hồi về client với thông tin lỗi.  
        .status(400)      // res.status(400) là gửi phản hồi về client với mã trạng thái 400 (Bad Request).
        .json({ error: "Category ID and name are required" });        // res.json({ error: 'Category ID and name are required' }); là gửi phản hồi về client với thông tin lỗi.
    const result = await CategoryDAO.update({ _id, name });      // const result = await CategoryDAO.update({ _id, name }); là gọi hàm update của CategoryDAO để cập nhật danh mục vào cơ sở dữ liệu.
    if (!result) return res.status(404).json({ error: "Category not found" });      // if (!result) return res.status(404).json({ error: 'Category not found' }); là kiểm tra xem có danh mục nào được cập nhật hay không.

    res.json(result);     // res.json(result); là gửi phản hồi về client với kết quả cập nhật danh mục.
  } catch (error) {      // catch (error) là bắt lỗi nếu có.
    console.error("Error updating category:", error);        // console.error('Error updating category:', error); là in ra lỗi để debug.
    res.status(500).json({ error: "Failed to update category" });      // res.status(500).json({ error: 'Failed to update category' }); là gửi phản hồi về client với thông tin lỗi.
  }
});

router.delete("/categories/:id", JwtUtil.checkToken, async (req, res) => {        // JwtUtil.checkToken là middleware để kiểm tra token của client gửi lên.
  try {        // try-catch để bắt lỗi
    const _id = req.params.id;        // const _id = req.params.id; là lấy giá trị của id từ req.params (params của request).
    if (!_id || !_id.match(/^[0-9a-fA-F]{24}$/))          // if (!_id || !_id.match(/^[0-9a-fA-F]{24}$/)) là kiểm tra xem _id có tồn tại và có đúng định dạng ObjectId của MongoDB hay không.
      return res.status(400).json({ error: "Invalid Category ID" });          // if (!_id || !_id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ error: 'Invalid Category ID' }); là gửi phản hồi về client với thông

    const result = await CategoryDAO.delete(_id);
    if (!result) return res.status(404).json({ error: "Category not found" });

    res.json({ message: "Category deleted successfully", data: result });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Failed to delete category" });
  }
});

// Product CRUD
router.get("/products", JwtUtil.checkToken, async (req, res) => {
  let products = await ProductDAO.selectAll();
  const sizePage = 4;
  const noPages = Math.ceil(products.length / sizePage);
  const curPage = parseInt(req.query.page) || 1;
  const offset = (curPage - 1) * sizePage;
  products = products.slice(offset, offset + sizePage);
  res.json({ products, noPages, curPage });
});

router.post("/products", JwtUtil.checkToken, async (req, res) => {
  const { name, price, category: cid, image } = req.body;
  const now = Date.now();
  const category = await CategoryDAO.selectByID(cid);
  const product = { name, price, image, cdate: now, category };
  const result = await ProductDAO.insert(product);
  res.json(result);
});

router.put("/products/:id", JwtUtil.checkToken, async (req, res) => {
  const _id = req.params.id;
  const { name, price, category: cid, image } = req.body;
  const now = Date.now();
  const category = await CategoryDAO.selectByID(cid);
  const product = { _id, name, price, image, cdate: now, category };
  const result = await ProductDAO.update(product);
  res.json(result);
});

router.delete("/products/:id", JwtUtil.checkToken, async (req, res) => {
  try {
    const _id = req.params.id;
    if (!_id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).json({ error: "Invalid Product ID" });

    const result = await ProductDAO.delete(_id);
    if (!result) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "Product deleted successfully", data: result });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

// Token check
router.get("/token", JwtUtil.checkToken, (req, res) => {
  res.json({
    success: true,
    message: "Token is valid",
    token: req.headers["authorization"],
  });
});

// Get all customers
router.get("/customers", JwtUtil.checkToken, async (req, res) => {
  try {
    const customers = await Models.Customer.find({});
    res.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET: Lấy danh sách đơn hàng cho admin
router.get("/orders", async (req, res) => {
  const token = req.headers["x-access-token"];

  if (!token) return res.status(401).json({ error: "No token provided" });
  
  try {                                            
    const decoded = jwt.verify(token, MyConstants.JWT_SECRET);        // Giải mã token để lấy thông tin người dùng
    // nếu muốn kiểm tra phân quyền thì thêm điều kiện decoded.role === 'admin'

    const orders = await OrderDAO.selectAllWithCustomer(); // phương thức này bạn cần có
    res.json({ success: true, orders });          // Trả về danh sách đơn hàng
  } catch (err) {            // Bắt lỗi nếu có
    console.error("Lỗi xác thực token:", err);        // In ra lỗi để debug
    res.status(403).json({ error: "Unauthorized" });      // Trả về lỗi không được phép
  }
});



// Cập nhật trạng thái đơn hàng
router.put("/orders/status/:id", async (req, res) => {                        // Định nghĩa route để cập nhật trạng thái đơn hàng
  const orderId = req.params.id;        // Lấy ID của đơn hàng từ URL
  const { status } = req.body; // Nhận trạng thái từ client gửi lên

  // Kiểm tra trạng thái có hợp lệ hay không
  if (!["APPROVED", "CANCELED"].includes(status)) {          // Kiểm tra xem trạng thái có nằm trong danh sách cho phép hay không
    return res.status(400).json({ error: "Invalid status" });      // Trả về lỗi nếu trạng thái không hợp lệ
  }

  try {
    const updatedOrder = await OrderDAO.updateOrderStatus(orderId, status); // Sử dụng phương thức trong OrderDAO

    if (!updatedOrder) {        // Kiểm tra xem có đơn hàng nào được cập nhật không
      return res.status(404).json({ error: "Order not found" });      // Trả về lỗi nếu không tìm thấy đơn hàng
    }

    return res.json({        // Trả về kết quả thành công
      success: true,      // Trả về thông báo thành công
      message: "Order status updated successfully",     // Trả về thông báo thành công
      updatedOrder,       // Trả về thông tin đơn hàng đã cập nhật
    });
  } catch (err) {        // Bắt lỗi nếu có
    console.error("Error updating order status:", err);  // In ra lỗi để debug
    res.status(500).json({ error: "Server error" });  // Trả về lỗi server
  }
});

// Lấy đơn hàng của khách hàng
router.get("/orders/customer/:cid", async (req, res) => {  // Định nghĩa route để lấy đơn hàng của khách hàng
  const customerId = req.params.cid; // Lấy ID của khách hàng từ URL

  try { // Sử dụng try-catch để bắt lỗi
    const orders = await OrderDAO.selectByCustomerID(customerId); // Gọi phương thức để lấy đơn hàng của khách hàng
    if (!orders) { // Kiểm tra xem có đơn hàng nào không
      return res.status(404).json({ error: "Orders not found" }); // Trả về lỗi nếu không tìm thấy đơn hàng
    }     
    res.json({ success: true, orders }); // Trả về danh sách đơn hàng của khách hàng
  } catch (error) { // Bắt lỗi và in ra console để debug
    console.error("Error fetching orders:", error); // In ra lỗi để debug
    res.status(500).json({ error: "Server error" }); // Trả về lỗi server
  }
});
module.exports = router; // export router object
