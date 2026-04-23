import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';
import Admin from '../../Admin/Admin';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';

// Import files slider
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import slide1 from '../../../assets/imgs/slide1.png';
import slide2 from '../../../assets/imgs/slide2.png';
import slide3 from '../../../assets/imgs/slide3.png';
import slide4 from '../../../assets/imgs/slide4.png';
import slide5 from '../../../assets/imgs/slide5.png';
import slide6 from '../../../assets/imgs/slide6.png';
import { getAllCarts, getAllProducts, sendCurrentProduct } from '../../../redux/apiRequest';
import { useEffect, useState } from 'react';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';

let productArr = [
    {
        id: 1,
        name: 'Dell',
        list: [],
    },
    {
        id: 2,
        name: 'Asus',
        list: [],
    },
    {
        id: 3,
        name: 'Macbook',
        list: [],
    },
    {
        id: 4,
        name: 'HP',
        list: [],
    },
    {
        id: 5,
        name: 'Acer',
        list: [],
    },
    {
        id: 6,
        name: 'Lenovo',
        list: [],
    },
    {
        id: 7,
        name: 'Msi',
        list: [],
    },
];

function Home() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const listProduct = useSelector((state) => state.users.users.allProducts);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [currentList, setCurrentList] = useState('All');

    useEffect(() => {
        if (user) {
            getAllCarts(dispatch, axiosJWT, user.accesstoken);
        }
        //lấy tất cả sản phẩm
        getAllProducts(dispatch);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (!listProduct) return;
        // Reset list trước khi điền lại (tránh duplicate khi re-render)
        productArr.forEach((p) => (p.list = []));
        for (let i = 0; i < productArr.length; i++) {
            for (let j = 0; j < listProduct.length; j++) {
                if (productArr[i].name === listProduct[j].name) {
                    const id = listProduct[j]._id;
                    productArr[i].list.push({ ...listProduct[j].product, id });
                }
            }
        }
        // eslint-disable-next-line
    }, [listProduct]);

    //slider
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true, // Thêm dòng này để tự động chuyển slide
        autoplaySpeed: 3500, // Thời gian chuyển slide (ms), ví dụ 3.5 giây
    };

    const handleShowproduct = (product) => {
        if (product) {
            sendCurrentProduct(dispatch, navigate, product);
        }
    };

    console.log(productArr);
    return (
        <>
            {user?.admin ? (
                <>
                    <Admin />
                </>
            ) : (
                <div className="home-container">
                    <NavBar />
                    <section className="home-slider">
                        <Slider {...settings}>
                            <img className="slide" src={slide1} alt="slide1" />
                            <img className="slide" src={slide2} alt="slide2" />
                            <img className="slide" src={slide3} alt="slide3" />
                            <img className="slide" src={slide4} alt="slide4" />
                            <img className="slide" src={slide5} alt="slide5" />
                            <img className="slide" src={slide6} alt="slide6" />
                        </Slider>
                    </section>
                    <div className="home-wrapper">
                        <div className="home-menu">
                            <Link className="home-menu-item" onClick={(e) => setCurrentList('Dell')}></Link>
                            <Link className="home-menu-item" onClick={(e) => setCurrentList('Asus')}></Link>
                            <Link className="home-menu-item" onClick={(e) => setCurrentList('Macbook')}></Link>
                            <Link className="home-menu-item" onClick={(e) => setCurrentList('HP')}></Link>
                            <Link className="home-menu-item" onClick={(e) => setCurrentList('Acer')}></Link>
                            <Link className="home-menu-item" onClick={(e) => setCurrentList('Lenovo')}></Link>
                            <Link className="home-menu-item" onClick={(e) => setCurrentList('Msi')}></Link>
                        </div>

                        <div className="home-product">
                            {productArr.map((item) => {
                                return currentList === 'All' ? ( //hiện tất cả
                                    <div key={item.id} className="home-product-items">
                                        <h3>{item.name}</h3>
                                        <div className="home-product-items-box">
                                            {item.list.map((list) => {
                                                return (
                                                    <div
                                                        key={`${list.id}${Math.random(10)}`}
                                                        className="home-product-items-box-item"
                                                        onClick={(e) => handleShowproduct(list)}
                                                    >
                                                        <div className="home-product-items-box-item-img">
                                                            <span>{list.percent}%</span>
                                                        </div>
                                                        <img src={list.avatar} alt="" />
                                                        <p>{list.description}</p>
                                                        <span className="home-product-items-box-item-discount">
                                                            {Intl.NumberFormat('de-DE', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(list.cost)}
                                                        </span>
                                                        <span>
                                                            {Intl.NumberFormat('de-DE', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(list.price)}
                                                        </span>
                                                        
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : item.name === currentList ? ( //hiện theo danh mục(asus, acer,..)
                                    <div key={item.id} className="home-product-items">
                                        <h3>{item.name}</h3>
                                        <div className="home-product-items-box">
                                            {item.list.map((list) => {
                                                return (
                                                    <div
                                                        key={`${list.id}${Math.random(10)}`}
                                                        className="home-product-items-box-item"
                                                        onClick={(e) => handleShowproduct(list)}
                                                    >
                                                        <div className="home-product-items-box-item-img">
                                                            <span>{list.percent}%</span>
                                                        </div>
                                                        <img src={list.avatar} alt="" />
                                                        <p>{list.description}</p>
                                                        <span>
                                                            {Intl.NumberFormat('de-DE', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(list.price)}
                                                        </span>
                                                        <span className="home-product-items-box-item-discount">
                                                            {Intl.NumberFormat('de-DE', {
                                                                style: 'currency',
                                                                currency: 'VND',
                                                            }).format(list.cost)}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                );
                            })}
                        </div>
                    </div>
                    <Footer />
                </div>
            )}
        </>
    );
}

export default Home;
