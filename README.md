# Ecommerce SpectaStyle

> 基于 MERN 栈（MongoDB + Express + React + Node）的全栈电商鞋类购物平台，包含用户端商城与仓储管理后台。项目仓库：[github.com/rick-peng-li/EcommerceSpectastyle-web](https://github.com/rick-peng-li/EcommerceSpectastyle-web)

## 目录

- [项目简介](#项目简介)
- [技术架构](#技术架构)
- [项目结构](#项目结构)
- [模块与功能](#模块与功能)
  - [Backend 后端服务](#backend-后端服务)
  - [Frontend 用户商城](#frontend-用户商城)
  - [Dashboard 仓储后台](#dashboard-仓储后台)
- [接口设计](#接口设计)
- [环境变量](#环境变量)
- [启动方式](#启动方式)
- [默认账号](#默认账号)

## 项目简介

SpectaStyle 是一个面向鞋类商品的端到端电商系统，提供完整的浏览、购物、下单、支付流程，同时配套独立的仓储管理后台用于商品、用户与代理的运营管理。

- 用户端：商品浏览、搜索、筛选、购物车、下单、地址管理、Stripe 支付、评论、反馈
- 仓储后台：管理员 / 代理登录、商品增删改查、用户与代理列表管理
- 安全：用户端使用 JWT + bcrypt 进行鉴权与密码加密

## 技术架构

| 层级 | 技术 |
| --- | --- |
| 前端 | React 18、Vite 4、React Router 6、Axios、MUI、react-hot-toast、react-parallax-tilt |
| 后端 | Node.js、Express 4、Mongoose 7、jsonwebtoken、bcryptjs、Stripe、CORS |
| 数据库 | MongoDB 6.0 |
| 状态管理 | 用户端使用 React Context（购物车），后台使用 Redux |
| 容器化 | Docker、docker-compose |
| 部署 | 前端可部署 Vercel，后端可部署 Render，数据库可使用云集群 |

## 项目结构

```
EcommerceSpectastyle-web/
├── Backend/                 # 后端 API 服务
│   ├── Controller/          # 业务控制器
│   ├── Middelware/          # 鉴权中间件
│   ├── Models/              # Mongoose 数据模型
│   ├── Routes/              # 路由定义
│   ├── dockerfile
│   ├── index.js             # 应用入口
│   ├── package.json
│   └── .sample.env
├── Frontend/                # 用户端商城
│   ├── public/              # 静态资源（海报、Logo 等）
│   ├── src/
│   │   ├── Components/      # 公共组件
│   │   ├── CSS/             # 页面样式
│   │   ├── Pages/           # 页面组件
│   │   ├── App.jsx          # 路由根组件
│   │   └── main.jsx         # 应用入口
│   ├── dockerfile
│   ├── vite.config.js
│   └── package.json
├── Dashboard/               # 仓储管理后台
│   └── Frontend/
│       ├── src/
│       │   ├── Components/  # 后台组件
│       │   ├── actions/     # Redux actions
│       │   ├── reducers/    # Redux reducers
│       │   ├── css/         # 后台样式
│       │   ├── App.jsx
│       │   └── store.jsx
│       ├── dockerfile
│       └── vite.config.js
├── docker-compose.yml
└── README.md
```

## 模块与功能

### Backend 后端服务

后端基于 Express 构建，提供 RESTful API，统一前缀 `/ecommerce`。

| 文件 | 功能 |
| --- | --- |
| [index.js](Backend/index.js) | 应用入口，挂载路由、CORS、Stripe 支付、健康检查 |
| [Controller/user-controller.js](Backend/Controller/user-controller.js) | 用户注册、登录、资料查询、头像更新、重置密码 |
| [Controller/product-controller.js](Backend/Controller/product-controller.js) | 商品 CRUD、购物车增删查、商品评论 |
| [Controller/user-address.js](Backend/Controller/user-address.js) | 用户收货地址增删改查 |
| [Controller/dashboard-controller.js](Backend/Controller/dashboard-controller.js) | 仓储 Manager 注册与登录 |
| [Controller/dashboardagent-controller.js](Backend/Controller/dashboardagent-controller.js) | 仓储 Agent 注册与登录 |
| [Controller/contact-controller.js](Backend/Controller/contact-controller.js) | 联系表单提交与查询 |
| [Controller/feedback-controller.js](Backend/Controller/feedback-controller.js) | 用户反馈提交与查询 |
| [Controller/visit-count-controller.js](Backend/Controller/visit-count-controller.js) | 站点访问计数 |
| [Middelware/authMiddelware.js](Backend/Middelware/authMiddelware.js) | JWT 鉴权中间件 |
| [Models/User.js](Backend/Models/User.js) | 用户模型（含购物车、地址引用） |
| [Models/Product.js](Backend/Models/Product.js) | 商品模型（含评论） |
| [Models/UserAddress.js](Backend/Models/UserAddress.js) | 收货地址模型 |
| [Models/Manager.js](Backend/Models/Manager.js) | 仓储管理员模型 |
| [Models/Agents.js](Backend/Models/Agents.js) | 仓储代理模型 |
| [Models/Contact.js](Backend/Models/Contact.js) | 联系消息模型 |
| [Models/Feedback.js](Backend/Models/Feedback.js) | 反馈模型 |
| [Models/VisitCount.js](Backend/Models/VisitCount.js) | 访问计数模型 |

### Frontend 用户商城

用户端基于 React + Vite，通过 `VITE_backendUrl` 环境变量连接后端。

| 页面 / 组件 | 功能 |
| --- | --- |
| [Home.jsx](Frontend/src/Pages/Home.jsx) | 首页：Hero 展示、产品入口、推荐、用户证言 |
| [Product.jsx](Frontend/src/Pages/Product.jsx) | 商品列表：搜索、价格排序、分类筛选、发布日期排序 |
| [ProductDetail.jsx](Frontend/src/Components/ProductDetail.jsx) | 商品详情弹窗：加入购物车、查看评论 |
| [Cart.jsx](Frontend/src/Pages/Cart.jsx) | 购物车：数量增减、删除、合计、结算入口 |
| [PlaceOrder.jsx](Frontend/src/Pages/PlaceOrder.jsx) | 下单页：收货地址增删改查、选择地址 |
| [ConformOrder.jsx](Frontend/src/Pages/ConformOrder.jsx) | 订单确认：地址、商品、GST、折扣、Stripe 支付 |
| [Success.jsx](Frontend/src/Pages/Success.jsx) | 支付成功页 |
| [Profile.jsx](Frontend/src/Pages/Profile.jsx) | 登录 / 注册页（含头像上传） |
| [UserProfile.jsx](Frontend/src/Pages/UserProfile.jsx) | 用户中心：头像更新、重置密码、登出 |
| [Contact.jsx](Frontend/src/Pages/Contact.jsx) | 联系页面：信息展示 + 表单提交到后端 |
| [Feedback.jsx](Frontend/src/Pages/Feedback.jsx) | 反馈页面：评分 + 文本提交到后端 |
| [About.jsx](Frontend/src/Pages/About.jsx) | 关于页：品牌介绍、使命、视频 |
| [FAQ.jsx](Frontend/src/Pages/FAQ.jsx) | 常见问题页 |
| [404page.jsx](Frontend/src/Pages/404page.jsx) | 404 页面 |
| [Navbar.jsx](Frontend/src/Components/Navbar.jsx) | 导航栏 + 访问计数 |
| [Footer.jsx](Frontend/src/Components/Footer.jsx) | 页脚 |
| [CartContext.jsx](Frontend/src/Components/CartContext.jsx) | 购物车 Context |
| [VisitCount.jsx](Frontend/src/Components/VisitCount.jsx) | 站点访问统计 |
| [AddReview.jsx](Frontend/src/Components/AddReview.jsx) | 商品评论提交 |

### Dashboard 仓储后台

独立的后台管理应用，基于 React + Redux + Vite，通过 `VITE_backendUrl` 连接后端。

| 组件 | 功能 |
| --- | --- |
| [MainDashboardLogin.jsx](Dashboard/Frontend/src/Components/MainDashboardLogin.jsx) | Agent 登录入口 |
| [Dashboard.jsx](Dashboard/Frontend/src/Components/Dashboard.jsx) | 后台主界面：侧边栏导航 |
| [Products.jsx](Dashboard/Frontend/src/Components/Products.jsx) | 新增商品表单 |
| [AllProducts.jsx](Dashboard/Frontend/src/Components/AllProducts.jsx) | 商品列表：搜索、删除、更新 |
| [AllUsers.jsx](Dashboard/Frontend/src/Components/AllUsers.jsx) | 用户列表 |
| [AllAgents.jsx](Dashboard/Frontend/src/Components/AllAgents.jsx) | Agent 列表 |
| [ManagerLogin.jsx](Dashboard/Frontend/src/Components/ManagerLogin.jsx) | Manager 登录 + Agent 注册 |

## 接口设计

所有 API 均以 `VITE_backendUrl` 为前缀，默认 `http://localhost:4000`。

### 用户 `/ecommerce/user`

| 方法 | 路径 | 功能 |
| --- | --- | --- |
| GET | `/ecommerce/user` | 获取全部用户 |
| POST | `/ecommerce/user/signup` | 注册（name、email、password、profileImg） |
| POST | `/ecommerce/user/login` | 登录（email、password），返回 JWT |
| POST | `/ecommerce/user/updateProfileImage` | 更新头像 |
| POST | `/ecommerce/user/resetPassword` | 重置密码 |

### 商品 `/ecommerce/product`

| 方法 | 路径 | 功能 |
| --- | --- | --- |
| GET | `/ecommerce/product` | 获取全部商品 |
| GET | `/ecommerce/product/products/:productId` | 获取单个商品 |
| POST | `/ecommerce/product/products` | 新增商品 |
| PUT | `/ecommerce/product/products/:productId` | 更新商品 |
| DELETE | `/ecommerce/product/products/:productId` | 删除商品 |
| POST | `/ecommerce/product/addProductToCart/:userId` | 加入购物车 |
| GET | `/ecommerce/product/shopping-cart/:userId` | 获取购物车 |
| DELETE | `/ecommerce/product/shopping-cart/:userId/:productId` | 删除购物车项 |
| POST | `/ecommerce/product/products/:productId/reviews/:userId` | 添加评论 |

### 收货地址 `/ecommerce/user-address`

| 方法 | 路径 | 功能 |
| --- | --- | --- |
| POST | `/ecommerce/user-address/addAddress/:userId` | 新增地址 |
| PUT | `/ecommerce/user-address/updateAddress/:userId/:addressId` | 更新地址 |
| DELETE | `/ecommerce/user-address/deleteAddress/:userId/:addressId` | 删除地址 |
| GET | `/ecommerce/user-address/getAddresses/:userId` | 查询地址列表 |

### 仓储管理 `/ecommerce/manager` & `/ecommerce/agent`

| 方法 | 路径 | 功能 |
| --- | --- | --- |
| GET | `/ecommerce/manager` | 获取全部 Manager |
| POST | `/ecommerce/manager/signup` | Manager 注册 |
| POST | `/ecommerce/manager/login` | Manager 登录 |
| GET | `/ecommerce/agent` | 获取全部 Agent |
| POST | `/ecommerce/agent/signup` | Agent 注册 |
| POST | `/ecommerce/agent/login` | Agent 登录 |

### 联系与反馈

| 方法 | 路径 | 功能 |
| --- | --- | --- |
| POST | `/ecommerce/contact` | 提交联系表单 |
| GET | `/ecommerce/contact` | 查询联系消息 |
| POST | `/ecommerce/feedback` | 提交反馈 |
| GET | `/ecommerce/feedback` | 查询反馈列表 |

### 其他

| 方法 | 路径 | 功能 |
| --- | --- | --- |
| GET | `/` | 健康检查 |
| GET | `/visitcount` | 获取访问计数 |
| POST | `/visitcount/increment` | 访问计数 +1 |
| POST | `/checkout` | 创建 Stripe Checkout Session |

## 环境变量

### Backend（参考 `Backend/.sample.env`）

```env
MONGO_URL="your_mongodb_connection_url"
SECRET="your_jwt_secret_key"
PORT=4000
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend（`Frontend/.env`）

```env
VITE_backendUrl=http://localhost:4000
```

### Dashboard（`Dashboard/Frontend/.env`）

```env
VITE_backendUrl=http://localhost:4000
```

## 启动方式

### 方式一：Docker Compose（推荐）

前置条件：本地已安装并启动 Docker。

```bash
docker-compose up --build
```

启动后访问：

- 用户商城：http://localhost:5173
- 仓储后台：http://localhost:5174
- 后端 API：http://localhost:4000
- MongoDB：localhost:27017

### 方式二：本地开发

1. 启动 MongoDB（本地实例或 Docker 容器）。
2. 配置后端环境变量：复制 `Backend/.sample.env` 为 `Backend/.env` 并填写。
3. 启动后端：

   ```bash
   cd Backend
   npm install
   npm start
   ```

4. 启动用户商城：

   ```bash
   cd Frontend
   npm install
   npm run dev
   ```

5. 启动仓储后台：

   ```bash
   cd Dashboard/Frontend
   npm install
   npm run dev
   ```

## 默认账号

项目首次启动时数据库为空，需先注册账号：

- **用户端**：访问 http://localhost:5173/profile，点击「Don't have an account? Signup」注册新用户后即可登录。
- **仓储后台 Agent**：访问 http://localhost:5174，需先由 Manager 登录后创建 Agent。首次使用 Manager 账号需通过接口注册：

  ```bash
  curl -X POST http://localhost:4000/ecommerce/manager/signup \
    -H "Content-Type: application/json" \
    -d '{"name":"admin","password":"admin123"}'
  ```

  随后使用 `admin / admin123` 在后台「Login as Manager」入口登录，再注册 Agent，Agent 即可在 http://localhost:5174 登录。
