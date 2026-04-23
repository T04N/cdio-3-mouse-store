import './OrdersNotification.scss';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import User from '../User/User';

function OrdersNotification() {
    return (
        <div className="ordersNotification-container">
            <NavBar />
            <div className="ordersNotification-wrapper">
                <User />
                <div className="ordersNotification-right">Thông báo</div>
            </div>
            <Footer />
        </div>
    );
}

export default OrdersNotification;
