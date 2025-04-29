const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Đảm bảo đã cài đặt cors
const app = express();
const PORT = process.env.PORT || 3000;

// Sử dụng middleware CORS
app.use(cors());

// Cấu hình body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sử dụng các routes API
app.use("/api/customer", require("./api/customer"));
app.use("/api/admin", require("./api/admin"));

const path = require("path");

// Cấu hình các static files cho admin
app.use(      // app.use là một hàm dùng để đăng ký middleware.
  "/admin",      // "/admin" là đường dẫn URL mà middleware sẽ xử lý.
  express.static(path.resolve(__dirname, "../client-admin/build")),    // path.resolve(__dirname, "../client-admin/build") là đường dẫn tới thư mục chứa các file static.
);
app.get("/admin/*", (req, res) => {      // app.get là một hàm dùng để đăng ký một route GET.
  res.sendFile(path.resolve(__dirname, "../client-admin/build", "index.html"));    // path.resolve(__dirname, "../client-admin/build", "index.html") là đường dẫn tới file index.html.
});      

// Cấu hình các static files cho customer
app.use(    // app.use là một hàm dùng để đăng ký middleware.
  "/",      // "/" là đường dẫn URL mà middleware sẽ xử lý.
  express.static(path.resolve(__dirname, "../client-customer/build")),    // path.resolve(__dirname, "../client-customer/build") là đường dẫn tới thư mục chứa các file static.
);
app.get("*", (req, res) => {    // app.get là một hàm dùng để đăng ký một route GET.
  res.sendFile(    // res.sendFile là một hàm dùng để gửi một file tới client.
    path.resolve(__dirname, "../client-customer/build", "index.html"),    // path.resolve(__dirname, "../client-customer/build", "index.html") là đường dẫn tới file index.html.
  );
});

// Lắng nghe server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
