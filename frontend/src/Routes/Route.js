import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import Home from '../Components/UserRoutes/Home/Home';
import Admin from '../Components/Admin/Admin';
import Product from '../Components/UserRoutes/Product/Product';
import ListUsers from '../Components/AdminRoutes/ListUsers/ListUers';
import ListProducts from '../Components/AdminRoutes/ListProducts/ListProducts';
import User from '../Components/UserRoutes/User/User';
import Search from '../Components/UserRoutes/Search/Search';
import Cart from '../Components/UserRoutes/Cart/Cart';
import Payment from '../Components/UserRoutes/Payment/Payment';
import Order from '../Components/UserRoutes/Order/Order';
import EditUser from '../Components/UserRoutes/EditUser/EditUser';
import OrdersNotification from '../Components/UserRoutes/OrdersNotification/OrdersNotification';
import ListOrders from '../Components/AdminRoutes/ListOrders/ListOrders';
import About from '../Components/About/About';
import Products from '../Components/Products/Products';
import News from '../Components/News/News';
import Support from '../Components/Support/Support';
import Recruitment from '../Components/Recruitment/Recruitment';
import ApplyForm from '../Components/ApplyForm/ApplyForm';

//public route chưa login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/dang-nhap', component: Login },
    { path: '/dang-ky', component: Register },
    { path: '/san-pham/thong-tin-chi-tiet', component: Product },
    { path: '/danh-sach-san-pham', component: Search },
    { path: '/gioi-thieu', component: About },
    { path: '/san-pham', component: Products },
    { path: '/tin-tuc', component: News },
    { path: '/ho-tro', component: Support },
    { path: '/tuyen-dung', component: Recruitment },
    { path: '/applyform', component: ApplyForm },
];

//private routes đã login
const privateRoutes = [
    { path: '/admin', component: Admin },
    { path: '/quan-li-nguoi-dung', component: ListUsers },
    { path: '/quan-li-san-pham', component: ListProducts },
    { path: '/quan-li-don-hang', component: ListOrders },
    { path: '/tai-khoan', component: User },
    { path: '/tai-khoan/tai-khoan-cua-toi', component: EditUser },
    { path: '/tai-khoan/don-hang', component: Order },
    { path: '/tai-khoan/thong-bao', component: OrdersNotification },
    { path: '/gio-hang', component: Cart },
    { path: '/gio-hang/thanh-toan', component: Payment },
];

export { publicRoutes, privateRoutes };
