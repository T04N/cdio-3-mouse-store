# 🖱️ CDIO-3 Mouse Store — Website Bán Laptop Trực Tuyến

> **Đồ án CDIO lần 3** — Xây dựng website thương mại điện tử bán laptop với đầy đủ chức năng quản lý sản phẩm, giỏ hàng, đặt hàng và quản trị hệ thống.

---

## 📋 Mục lục

- [Tổng quan dự án](#-tổng-quan-dự-án)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Kiến trúc hệ thống](#-kiến-trúc-hệ-thống)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Hướng dẫn cài đặt và chạy](#-hướng-dẫn-cài-đặt-và-chạy)
- [Biến môi trường](#-biến-môi-trường)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Quản lý State (Redux)](#-quản-lý-state-redux)
- [Hệ thống định tuyến (Routing)](#-hệ-thống-định-tuyến-routing)
- [Xác thực & Phân quyền](#-xác-thực--phân-quyền)
- [Tính năng chính](#-tính-năng-chính)
- [Ảnh chụp màn hình](#-ảnh-chụp-màn-hình)

---

## 🎯 Tổng quan dự án

**Mouse Store** là một website thương mại điện tử chuyên bán laptop, được phát triển theo mô hình **Client-Server** với kiến trúc **RESTful API**. Hệ thống hỗ trợ hai nhóm người dùng:

| Vai trò                   | Chức năng chính                                                    |
| ------------------------- | ------------------------------------------------------------------ |
| **Khách hàng (User)**     | Xem sản phẩm, tìm kiếm, thêm giỏ hàng, đặt hàng, quản lý tài khoản |
| **Quản trị viên (Admin)** | Quản lý người dùng, sản phẩm, đơn hàng                             |

---

## 🛠 Công nghệ sử dụng

### Backend

| Công nghệ                | Phiên bản | Mô tả                                           |
| ------------------------ | --------- | ----------------------------------------------- |
| **Node.js**              | —         | Runtime JavaScript phía server                  |
| **Express.js**           | ^4.18.2   | Web framework xử lý HTTP request                |
| **MongoDB Atlas**        | —         | Cơ sở dữ liệu NoSQL trên cloud                  |
| **Mongoose**             | ^6.8.0    | ODM (Object Document Mapping) cho MongoDB       |
| **JSON Web Token (JWT)** | ^9.0.3    | Xác thực và phân quyền người dùng               |
| **bcryptjs**             | ^3.0.3    | Mã hóa mật khẩu (hiện chưa áp dụng trong login) |
| **cookie-parser**        | ^1.4.6    | Phân tích cookie trong HTTP request             |
| **cors**                 | ^2.8.5    | Cho phép Cross-Origin Resource Sharing          |
| **dotenv**               | ^16.0.3   | Quản lý biến môi trường                         |
| **nodemon**              | ^2.0.20   | Tự động restart server khi code thay đổi        |

### Frontend

| Công nghệ            | Phiên bản | Mô tả                                    |
| -------------------- | --------- | ---------------------------------------- |
| **React**            | ^18.2.0   | Thư viện xây dựng UI theo component      |
| **React Router DOM** | ^6.4.5    | Điều hướng SPA (Single Page Application) |
| **Redux Toolkit**    | ^1.9.1    | Quản lý state toàn cục                   |
| **React Redux**      | ^8.0.5    | Kết nối Redux với React                  |
| **Redux Persist**    | ^6.0.0    | Lưu state vào localStorage               |
| **Axios**            | ^1.2.1    | HTTP client gửi request đến API          |
| **jwt-decode**       | ^3.1.2    | Giải mã JWT token phía client            |
| **react-slick**      | ^0.29.0   | Slider/Carousel cho banner               |
| **slick-carousel**   | ^1.8.1    | CSS/JS hỗ trợ cho react-slick            |
| **Font Awesome**     | ^6.2.1    | Thư viện icon                            |
| **SASS**             | ^1.57.0   | CSS preprocessor                         |

---

## 🏗 Kiến trúc hệ thống

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│                     http://localhost:3000                        │
│                                                                 │
│   ┌─────────┐  ┌──────────┐  ┌───────────────┐  ┌───────────┐  │
│   │  React   │  │  Redux   │  │  Axios +      │  │  React    │  │
│   │  UI      │──│  Store   │──│  Interceptor  │──│  Router   │  │
│   │Components│  │  (Persist)│  │  (JWT refresh)│  │  DOM v6   │  │
│   └─────────┘  └──────────┘  └───────┬───────┘  └───────────┘  │
└──────────────────────────────────────┼──────────────────────────┘
                                       │ HTTP (REST API)
                                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                      SERVER (Node.js)                           │
│                     http://localhost:8000                        │
│                                                                 │
│   ┌─────────┐  ┌──────────────┐  ┌──────────────┐              │
│   │ Express │  │  Middleware   │  │  Controllers │              │
│   │ Router  │──│  (JWT Verify) │──│  (Business   │              │
│   │         │  │               │  │   Logic)     │              │
│   └─────────┘  └──────────────┘  └──────┬───────┘              │
│                                          │                      │
│                                   ┌──────▼───────┐              │
│                                   │   Mongoose   │              │
│                                   │   Models     │              │
│                                   └──────┬───────┘              │
└──────────────────────────────────────────┼──────────────────────┘
                                           │
                                    ┌──────▼───────┐
                                    │  MongoDB     │
                                    │  Atlas       │
                                    │  (Cloud DB)  │
                                    └──────────────┘
```

---

## 📁 Cấu trúc thư mục

```
cdio-3-mouse-store/
├── backend/                          # Server-side (Node.js + Express)
│   ├── controllers/                  # Xử lý business logic
│   │   ├── authControllers.js        #   Đăng ký, đăng nhập, JWT, cập nhật user
│   │   ├── middlewareController.js   #   Middleware xác thực token & phân quyền
│   │   └── userControllers.js        #   CRUD: Users, Products, Cart, Orders
│   ├── models/                       # Mongoose Schema (cấu trúc dữ liệu)
│   │   ├── User.js                   #   Schema người dùng
│   │   ├── Product.js                #   Schema sản phẩm (laptop)
│   │   ├── Cart.js                   #   Schema giỏ hàng
│   │   └── Orders.js                 #   Schema đơn hàng
│   ├── routes/                       # Định nghĩa API endpoints
│   │   ├── auth.js                   #   Routes: /v1/auth/*
│   │   └── user.js                   #   Routes: /v1/user/*
│   ├── .env                          # Biến môi trường (DB URI, JWT keys)
│   ├── index.js                      # Entry point — khởi động Express server
│   ├── package.json                  # Dependencies & scripts
│   └── package-lock.json
│
├── frontend/                         # Client-side (React)
│   ├── public/                       # Static files (index.html, favicon)
│   ├── src/
│   │   ├── assets/                   # Tài nguyên tĩnh (ảnh slider)
│   │   │   └── imgs/                 #   slide1.png → slide6.png
│   │   ├── Components/               # React components
│   │   │   ├── About/                #   Trang giới thiệu
│   │   │   ├── Admin/                #   Dashboard quản trị
│   │   │   ├── AdminRoutes/          #   Các trang quản trị
│   │   │   │   ├── ListUsers/        #     Quản lý người dùng
│   │   │   │   ├── ListProducts/     #     Quản lý sản phẩm
│   │   │   │   └── ListOrders/       #     Quản lý đơn hàng
│   │   │   ├── ApplyForm/            #   Form ứng tuyển
│   │   │   ├── Footer/               #   Footer chung
│   │   │   ├── Login/                #   Trang đăng nhập
│   │   │   ├── NavBar/               #   Thanh điều hướng
│   │   │   ├── News/                 #   Trang tin tức
│   │   │   ├── Products/             #   Trang danh sách sản phẩm
│   │   │   ├── Recruitment/          #   Trang tuyển dụng
│   │   │   ├── Register/             #   Trang đăng ký
│   │   │   ├── Support/              #   Trang hỗ trợ
│   │   │   └── UserRoutes/           #   Các trang người dùng
│   │   │       ├── Home/             #     Trang chủ (slider + sản phẩm)
│   │   │       ├── Product/          #     Chi tiết sản phẩm
│   │   │       ├── Search/           #     Kết quả tìm kiếm
│   │   │       ├── Cart/             #     Giỏ hàng
│   │   │       ├── Payment/          #     Thanh toán
│   │   │       ├── Order/            #     Lịch sử đơn hàng
│   │   │       ├── OrdersNotification/ #   Thông báo đơn hàng
│   │   │       ├── User/             #     Trang tài khoản
│   │   │       └── EditUser/         #     Chỉnh sửa thông tin
│   │   ├── Routes/
│   │   │   └── Route.js              # Cấu hình public & private routes
│   │   ├── redux/                    # Quản lý state toàn cục
│   │   │   ├── store.js              #   Cấu hình Redux store + persist
│   │   │   ├── authSlice.js          #   State: login, register, cart
│   │   │   ├── userSlice.js          #   State: users, products, orders
│   │   │   └── apiRequest.js         #   Tất cả hàm gọi API (Axios)
│   │   ├── axiosInterceptor.js       # Global interceptor log request/response
│   │   ├── createInstance.js         # Axios instance với JWT auto-refresh
│   │   ├── App.js                    # Root component + Router
│   │   ├── App.css                   # Global styles
│   │   └── index.js                  # Entry point React
│   ├── package.json
│   └── package-lock.json
│
├── .prettierrc                       # Cấu hình code formatter
├── .vscode/                          # Cấu hình VSCode
└── README.md                         # Tài liệu dự án (file này)
```

---

## 🚀 Hướng dẫn cài đặt và chạy

### Yêu cầu hệ thống

- **Node.js** >= 16.x
- **npm** >= 8.x
- Kết nối Internet (để truy cập MongoDB Atlas)

### Bước 1: Clone dự án

```bash
git clone https://github.com/T04N/cdio-3-mouse-store.git
cd cdio-3-mouse-store
```

### Bước 2: Cài đặt dependencies

```bash
# Cài đặt Backend
cd backend
npm install

# Cài đặt Frontend
cd ../frontend
npm install
```

### Bước 3: Chạy dự án

Mở **2 terminal** riêng biệt:

**Terminal 1 — Backend (port 8000):**

```bash
cd backend
npx nodemon index.js
```

> ✅ Output mong đợi:
>
> ```
> SERVER IS RUNNING! http://localhost:8000
> CONNECT MONGOOSE SUCCESS!
> ```

**Terminal 2 — Frontend (port 3000):**

```bash
cd frontend
npm start
```

> ✅ Output mong đợi:
>
> ```
> Compiled successfully!
> Local: http://localhost:3000
> ```

### Bước 4: Truy cập

| Dịch vụ                | URL                   |
| ---------------------- | --------------------- |
| **Frontend (Web App)** | http://localhost:3000 |
| **Backend (REST API)** | http://localhost:8000 |

---

## 🔐 Biến môi trường

File `backend/.env` chứa các cấu hình nhạy cảm:

| Biến              | Mô tả                           |
| ----------------- | ------------------------------- |
| `MONGOOSEDB_URL`  | Connection string MongoDB Atlas |
| `JWT_ACCESS_KEY`  | Secret key để tạo Access Token  |
| `JWT_REFRESH_KEY` | Secret key để tạo Refresh Token |

```env
MONGOOSEDB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?appName=Cluster0
JWT_ACCESS_KEY=your_access_token_secret
JWT_REFRESH_KEY=your_refresh_token_secret
```

> ⚠️ **Lưu ý**: Không commit file `.env` lên Git trong dự án thực tế. Sử dụng `.gitignore` để loại trừ.

---

## 📡 API Documentation

Base URL: `http://localhost:8000/v1`

### 🔑 Authentication — `/v1/auth`

| Method | Endpoint           | Mô tả                   | Auth     |
| ------ | ------------------ | ----------------------- | -------- |
| `POST` | `/auth/register`   | Đăng ký tài khoản mới   | ❌       |
| `POST` | `/auth/login`      | Đăng nhập               | ❌       |
| `POST` | `/auth/refresh`    | Làm mới Access Token    | ❌       |
| `POST` | `/auth/logout`     | Đăng xuất               | ✅ Token |
| `PUT`  | `/auth/update/:id` | Cập nhật thông tin user | ❌       |

#### `POST /auth/register`

```json
// Request Body
{
  "fullname": "Nguyễn Văn A",
  "email": "nguyenvana@gmail.com",
  "phone": "0901234567",
  "address": "Đà Nẵng",
  "username": "nguyenvana",
  "password": "matkhau123"
}

// Response 200
{
  "_id": "64...",
  "fullname": "Nguyễn Văn A",
  "email": "nguyenvana@gmail.com",
  "admin": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### `POST /auth/login`

```json
// Request Body
{
  "username": "nguyenvana",
  "password": "matkhau123"
}

// Response 200
{
  "_id": "64...",
  "fullname": "Nguyễn Văn A",
  "admin": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

### 👤 Users — `/v1/user`

| Method   | Endpoint                     | Mô tả                      | Auth     |
| -------- | ---------------------------- | -------------------------- | -------- |
| `GET`    | `/user`                      | Lấy danh sách tất cả users | ✅ Admin |
| `DELETE` | `/user/:id`                  | Xóa user                   | ✅ Admin |
| `PUT`    | `/user/update-listusers/:id` | Admin cập nhật user        | ❌       |

---

### 📦 Products — `/v1/user`

| Method   | Endpoint                   | Mô tả               | Auth     |
| -------- | -------------------------- | ------------------- | -------- |
| `GET`    | `/user/all-products`       | Lấy tất cả sản phẩm | ❌       |
| `POST`   | `/user/create-product`     | Tạo sản phẩm mới    | ❌       |
| `PUT`    | `/user/update-product/:id` | Cập nhật sản phẩm   | ❌       |
| `DELETE` | `/user/delete-product/:id` | Xóa sản phẩm        | ✅ Admin |

#### `POST /user/create-product`

```json
// Request Body
{
    "name": "Dell",
    "product": {
        "avatar": "https://example.com/dell-xps-15.png",
        "description": "Dell XPS 15 9530 Gaming",
        "number": 10,
        "price": 25000000,
        "cost": 28000000,
        "percent": 10,
        "cpu": "Intel Core i7-13700H",
        "hardrive": "SSD 512GB NVMe",
        "muxSwitch": "Có",
        "creen": "15.6 inch FHD+ 120Hz",
        "webcam": "HD 720p",
        "connection": "Wifi 6E, Bluetooth 5.3",
        "weight": "1.86 kg",
        "pin": "86Wh",
        "operetingSystem": "Windows 11 Home"
    }
}
```

---

### 🛒 Cart — `/v1/user`

| Method   | Endpoint                | Mô tả                      | Auth |
| -------- | ----------------------- | -------------------------- | ---- |
| `POST`   | `/user/add-to-cart`     | Thêm sản phẩm vào giỏ hàng | ❌   |
| `GET`    | `/user/get-all-cart`    | Lấy tất cả giỏ hàng        | ❌   |
| `DELETE` | `/user/delete-cart/:id` | Xóa sản phẩm khỏi giỏ      | ❌   |

#### `POST /user/add-to-cart`

```json
// Request Body
{
  "userId": "64abc...",
  "productId": "64def...",
  "description": "Dell XPS 15 9530 Gaming",
  "avatar": "https://example.com/dell.png",
  "price": 25000000,
  "count": 1
}

// Response 200 — Trả về danh sách giỏ hàng đã cập nhật
[
  {
    "_id": "64...",
    "userId": "64abc...",
    "productId": "64def...",
    "description": "Dell XPS 15 9530 Gaming",
    "price": 25000000,
    "count": 1,
    "productTotal": 25000000
  }
]
```

> **Lưu ý**: Nếu sản phẩm đã tồn tại trong giỏ, hệ thống tự động cộng dồn số lượng. Kiểm tra tồn kho trước khi thêm.

---

### 📋 Orders — `/v1/user`

| Method   | Endpoint                 | Mô tả                        | Auth |
| -------- | ------------------------ | ---------------------------- | ---- |
| `POST`   | `/user/create-order`     | Tạo đơn hàng mới             | ❌   |
| `GET`    | `/user/all-orders`       | Lấy tất cả đơn hàng          | ❌   |
| `PUT`    | `/user/update-order/:id` | Cập nhật trạng thái đơn hàng | ❌   |
| `DELETE` | `/user/delete-order/:id` | Xóa đơn hàng                 | ❌   |

#### `POST /user/create-order`

```json
// Request Body
{
    "listproduct": [
        {
            "productId": "64...",
            "description": "Dell XPS 15",
            "count": 1,
            "price": 25000000
        }
    ],
    "paymentMethods": "COD",
    "total": 25000000,
    "tradingCode": "MGH20240101001",
    "isPayment": false,
    "istransported": false,
    "isSuccess": false
}
```

---

### 🔒 Headers xác thực

Các API yêu cầu xác thực cần gửi header:

```
token: Bearer <accessToken>
```

---

## 🗄 Database Schema

### Collection: `users`

```javascript
{
  fullname:  String,    // Họ tên (5-30 ký tự)
  email:     String,    // Email (unique)
  phone:     String,    // Số điện thoại (unique)
  address:   String,    // Địa chỉ
  username:  String,    // Tên đăng nhập (unique)
  password:  String,    // Mật khẩu
  admin:     Boolean,   // Quyền admin (default: false)
  createdAt: Date,      // Tự động tạo
  updatedAt: Date       // Tự động cập nhật
}
```

### Collection: `products`

```javascript
{
  name: String,           // Hãng sản phẩm: "Dell", "Asus", "Macbook", "HP", "Acer", "Lenovo", "Msi"
  product: {
    number:          Number,   // Số lượng tồn kho
    avatar:          String,   // URL ảnh sản phẩm
    description:     String,   // Tên/mô tả sản phẩm
    price:           Number,   // Giá bán (VND)
    cost:            Number,   // Giá gốc (VND)
    percent:         Number,   // Phần trăm giảm giá
    cpu:             String,   // Thông số CPU
    hardrive:        String,   // Ổ cứng
    muxSwitch:       String,   // MUX Switch
    creen:           String,   // Màn hình
    webcam:          String,   // Webcam
    connection:      String,   // Kết nối (Wifi, Bluetooth)
    weight:          String,   // Trọng lượng
    pin:             String,   // Pin
    operetingSystem: String    // Hệ điều hành
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Collection: `carts`

```javascript
{
  userId:       String,   // ID người dùng
  productId:    String,   // ID sản phẩm
  description:  String,   // Tên sản phẩm
  avatar:       String,   // URL ảnh
  price:        Number,   // Đơn giá
  count:        Number,   // Số lượng
  productTotal: Number,   // Thành tiền (price × count)
  createdAt:    Date,
  updatedAt:    Date
}
```

### Collection: `orders`

```javascript
{
  listproduct:    Object,    // Danh sách sản phẩm trong đơn
  paymentMethods: String,    // Phương thức thanh toán
  total:          Number,    // Tổng tiền đơn hàng (VND)
  tradingCode:    String,    // Mã giao dịch
  isPayment:      Boolean,   // Đã thanh toán? (default: false)
  istransported:  Boolean,   // Đang vận chuyển? (default: false)
  isSuccess:      Boolean,   // Giao hàng thành công? (default: false)
  createdAt:      Date,
  updatedAt:      Date
}
```

### Sơ đồ quan hệ (ERD)

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│  Users   │  1:N  │  Carts   │  N:1  │ Products │
│          │──────▶│          │◀──────│          │
│ _id      │       │ userId   │       │ _id      │
│ fullname │       │ productId│       │ name     │
│ email    │       │ count    │       │ product  │
│ admin    │       │ price    │       │  ├ avatar │
└──────────┘       └──────────┘       │  ├ price  │
      │                               │  └ ...    │
      │ (implicit)                    └──────────┘
      ▼
┌──────────┐
│  Orders  │
│          │
│ listprod │
│ total    │
│ status   │
└──────────┘
```

---

## 🔄 Quản lý State (Redux)

Hệ thống sử dụng **Redux Toolkit** kết hợp **Redux Persist** để quản lý state toàn cục và lưu trữ state vào `localStorage`.

### Store Configuration

```
Redux Store
├── auth (authSlice)          — Persist ✅
│   ├── login
│   │   ├── currentUser       // Thông tin user đang đăng nhập
│   │   ├── allCarts          // Danh sách giỏ hàng
│   │   ├── isFetching        // Trạng thái loading
│   │   └── error             // Trạng thái lỗi
│   ├── register
│   │   ├── isFetching
│   │   ├── error
│   │   └── success
│   └── msg                   // Thông báo lỗi
│
└── users (userSlice)         — Persist ✅
    └── users
        ├── allUsers          // DS tất cả users (admin)
        ├── allProducts       // DS tất cả sản phẩm
        ├── allOrders         // DS tất cả đơn hàng
        ├── searchResults     // Kết quả tìm kiếm
        ├── currentProduct    // Sản phẩm đang xem chi tiết
        ├── isFetching
        ├── error
        └── msg
```

### Các Redux Actions

| Slice       | Action Pattern                             | Mô tả                     |
| ----------- | ------------------------------------------ | ------------------------- |
| `authSlice` | `login{Start,Success,Failed}`              | Xử lý đăng nhập           |
| `authSlice` | `register{Start,Success,Failed}`           | Xử lý đăng ký             |
| `authSlice` | `logOut{Start,Success,Failed}`             | Xử lý đăng xuất           |
| `authSlice` | `updateUser{Start,Success,Failed}`         | Cập nhật user             |
| `authSlice` | `createCart{Start,Success,Failed}`         | Thêm giỏ hàng             |
| `authSlice` | `getAllCarts{Start,Success,Failed}`        | Lấy giỏ hàng              |
| `authSlice` | `deleteProductCarts{Start,Success,Failed}` | Xóa khỏi giỏ              |
| `userSlice` | `getProduct{Start,Success,Failed}`         | Lấy sản phẩm              |
| `userSlice` | `createProduct{Start,Success,Failed}`      | Tạo sản phẩm              |
| `userSlice` | `updateProduct{Start,Success,Failed}`      | Sửa sản phẩm              |
| `userSlice` | `deleteProduct{Start,Success,Failed}`      | Xóa sản phẩm              |
| `userSlice` | `createOrders{Start,Success,Failed}`       | Tạo đơn hàng              |
| `userSlice` | `getAllOrders{Start,Success,Failed}`       | Lấy đơn hàng              |
| `userSlice` | `sendInforProduct{Start,Success,Failed}`   | Gửi SP đến trang chi tiết |
| `userSlice` | `getSearchResults{Start,Success,Failed}`   | Lấy kết quả tìm kiếm      |

---

## 🗺 Hệ thống định tuyến (Routing)

### Public Routes (Không cần đăng nhập)

| Path                           | Component     | Mô tả                                             |
| ------------------------------ | ------------- | ------------------------------------------------- |
| `/`                            | `Home`        | Trang chủ — Slider + Danh sách sản phẩm theo hãng |
| `/dang-nhap`                   | `Login`       | Trang đăng nhập                                   |
| `/dang-ky`                     | `Register`    | Trang đăng ký                                     |
| `/san-pham`                    | `Products`    | Danh sách sản phẩm                                |
| `/san-pham/thong-tin-chi-tiet` | `Product`     | Chi tiết sản phẩm                                 |
| `/danh-sach-san-pham`          | `Search`      | Kết quả tìm kiếm                                  |
| `/gioi-thieu`                  | `About`       | Giới thiệu                                        |
| `/tin-tuc`                     | `News`        | Tin tức                                           |
| `/ho-tro`                      | `Support`     | Hỗ trợ khách hàng                                 |
| `/tuyen-dung`                  | `Recruitment` | Tuyển dụng                                        |
| `/applyform`                   | `ApplyForm`   | Form ứng tuyển                                    |

### Private Routes (Cần đăng nhập)

| Path                           | Component            | Mô tả               |
| ------------------------------ | -------------------- | ------------------- |
| `/admin`                       | `Admin`              | Dashboard quản trị  |
| `/quan-li-nguoi-dung`          | `ListUsers`          | Quản lý người dùng  |
| `/quan-li-san-pham`            | `ListProducts`       | Quản lý sản phẩm    |
| `/quan-li-don-hang`            | `ListOrders`         | Quản lý đơn hàng    |
| `/tai-khoan`                   | `User`               | Trang tài khoản     |
| `/tai-khoan/tai-khoan-cua-toi` | `EditUser`           | Chỉnh sửa thông tin |
| `/tai-khoan/don-hang`          | `Order`              | Lịch sử đơn hàng    |
| `/tai-khoan/thong-bao`         | `OrdersNotification` | Thông báo đơn hàng  |
| `/gio-hang`                    | `Cart`               | Giỏ hàng            |
| `/gio-hang/thanh-toan`         | `Payment`            | Thanh toán          |

---

## 🔐 Xác thực & Phân quyền

### Luồng xác thực (Authentication Flow)

```
                        ┌─────────────┐
                        │   Đăng nhập  │
                        │  (username   │
                        │  + password) │
                        └──────┬──────┘
                               │
                               ▼
                     ┌─────────────────┐
                     │  Server kiểm tra │
                     │  username/pass   │
                     └────────┬────────┘
                              │
                    ┌─────────▼─────────┐
                    │ Tạo Access Token  │  (JWT, hạn 365 ngày)
                    │ Tạo Refresh Token │  (JWT, hạn 365 ngày)
                    └─────────┬─────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼                               ▼
    ┌─────────────────┐             ┌─────────────────┐
    │  Access Token   │             │  Refresh Token  │
    │  → Response body│             │  → HTTP Cookie  │
    │  → Redux Store  │             │  (httpOnly)     │
    └─────────────────┘             └─────────────────┘
```

### Middleware phân quyền

| Middleware                | Mô tả                                                  |
| ------------------------- | ------------------------------------------------------ |
| `verifyToken`             | Xác thực Access Token trong header `token: Bearer xxx` |
| `verifyTokenAndAdminAuth` | Xác thực token + kiểm tra quyền Admin hoặc chính chủ   |

### Auto Refresh Token (Client-side)

File `createInstance.js` tạo Axios instance với interceptor tự động:

1. Trước mỗi request, giải mã JWT để kiểm tra `exp` (expiration)
2. Nếu token hết hạn → Gọi `POST /v1/auth/refresh` để lấy token mới
3. Cập nhật token mới vào Redux Store và header request

---

## ✨ Tính năng chính

### 👤 Người dùng (Customer)

- [x] Đăng ký / Đăng nhập / Đăng xuất
- [x] Xem danh sách sản phẩm theo hãng (Dell, Asus, Macbook, HP, Acer, Lenovo, MSI)
- [x] Lọc sản phẩm theo danh mục
- [x] Tìm kiếm sản phẩm
- [x] Xem chi tiết sản phẩm (thông số kỹ thuật đầy đủ)
- [x] Thêm sản phẩm vào giỏ hàng (kiểm tra tồn kho)
- [x] Quản lý giỏ hàng (xóa sản phẩm)
- [x] Đặt hàng / Thanh toán
- [x] Xem lịch sử đơn hàng
- [x] Chỉnh sửa thông tin cá nhân
- [x] Slider banner tự động chuyển

### 🛡️ Quản trị viên (Admin)

- [x] Dashboard quản trị
- [x] CRUD Người dùng (xem, sửa, xóa)
- [x] CRUD Sản phẩm (tạo, xem, sửa, xóa)
- [x] CRUD Đơn hàng (xem, cập nhật trạng thái, xóa)
- [x] Phân quyền (chỉ Admin mới truy cập được các trang quản trị)

### 🔧 Kỹ thuật

- [x] RESTful API
- [x] JWT Authentication (Access Token + Refresh Token)
- [x] Auto Refresh Token
- [x] Redux State Management + Persist
- [x] Axios Interceptor (log request/response)
- [x] Responsive Design (SCSS)
- [x] SPA (Single Page Application) với React Router

---

## 📸 Ảnh chụp màn hình

> _Chưa có ảnh. Bổ sung sau khi hoàn thiện giao diện._

---

## 📝 Ghi chú kỹ thuật

### Lưu ý quan trọng

1. **Mật khẩu chưa được mã hóa**: Hiện tại mật khẩu được lưu dạng plain text trong database. Cần tích hợp `bcryptjs` để hash mật khẩu trước khi lưu.

2. **Ảnh sản phẩm**: Trường `avatar` trong Product cần lưu **URL đầy đủ** (ví dụ: `https://...`). Nếu lưu tên file local (ví dụ: `dell2.png`), ảnh sẽ không hiển thị.

3. **Giảm tồn kho khi đặt hàng**: Logic giảm số lượng sản phẩm trong kho sau khi đặt hàng thành công hiện đang bị comment out (chưa hoàn thiện).

4. **Private Routes**: Các route private hiện chưa có guard kiểm tra trên frontend — người dùng có thể truy cập trực tiếp bằng URL nếu biết đường dẫn.

---

## 👥 Nhóm phát triển

> _Bổ sung thông tin thành viên nhóm tại đây._

| STT | Họ tên | MSSV | Vai trò |
| --- | ------ | ---- | ------- |
| 1   |        |      |         |
| 2   |        |      |         |
| 3   |        |      |         |

---

## 📄 License

Dự án được phát triển phục vụ mục đích học tập trong khuôn khổ đồ án CDIO tại trường Đại học Duy Tân.
