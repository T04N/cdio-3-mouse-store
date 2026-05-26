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

const brandNames = ['Dell', 'Asus', 'Macbook', 'HP', 'Acer', 'Lenovo', 'Msi'];

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
        getAllProducts(dispatch);
        // eslint-disable-next-line
    }, []);

    // Flatten all products into one array with brand info
    const allProducts = listProduct
        ? listProduct.map((item) => ({
              ...item.product,
              id: item._id,
              brand: item.name,
          }))
        : [];

    // Filter products by selected brand
    const filteredProducts =
        currentList === 'All'
            ? allProducts
            : allProducts.filter((p) => p.brand === currentList);

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
    };

    const handleShowproduct = (product) => {
        if (product) {
            sendCurrentProduct(dispatch, navigate, product);
        }
    };

    const formatPrice = (price) => {
        return Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
        }).format(price);
    };

    return (
        <>
            {user?.admin ? (
                <Admin />
            ) : (
                <div className="home-container">
                    <NavBar />

                    {/* Hero Slider */}
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
                        {/* Brand Filter */}
                        <div className="home-menu">
                            <button
                                className={`home-menu-btn ${currentList === 'All' ? 'active' : ''}`}
                                onClick={() => setCurrentList('All')}
                            >
                                Tất cả
                            </button>
                            {brandNames.map((brand) => (
                                <Link
                                    key={brand}
                                    className={`home-menu-item ${currentList === brand ? 'active' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentList(brand);
                                    }}
                                >
                                </Link>
                            ))}
                        </div>

                        {/* Section Title */}
                        <div className="home-section-header">
                            <h2>
                                {currentList === 'All' ? '🔥 Tất cả sản phẩm' : `💻 ${currentList}`}
                            </h2>
                            <span className="home-section-count">
                                {filteredProducts.length} sản phẩm
                            </span>
                        </div>

                        {/* Product Grid */}
                        <div className="home-product-grid">
                            {filteredProducts.length === 0 ? (
                                <div className="home-empty">
                                    <p>Chưa có sản phẩm nào trong danh mục này</p>
                                </div>
                            ) : (
                                filteredProducts.map((product, index) => (
                                    <div
                                        key={product.id}
                                        className="product-card"
                                        onClick={() => handleShowproduct(product)}
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        {/* Sale Badge */}
                                        {product.percent > 0 && (
                                            <div className="product-card__badge">
                                                -{product.percent}%
                                            </div>
                                        )}

                                        {/* Brand Tag */}
                                        <div className="product-card__brand">{product.brand}</div>

                                        {/* Product Image */}
                                        <div className="product-card__img">
                                            <img src={product.avatar} alt={product.description} />
                                        </div>

                                        {/* Product Info */}
                                        <div className="product-card__info">
                                            <h4 className="product-card__name">{product.description}</h4>

                                            <div className="product-card__prices">
                                                <span className="product-card__price">
                                                    {formatPrice(product.price)}
                                                </span>
                                                {product.cost > product.price && (
                                                    <span className="product-card__cost">
                                                        {formatPrice(product.cost)}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Specs Preview */}
                                            {product.cpu && (
                                                <div className="product-card__specs">
                                                    <span>💻 {product.cpu}</span>
                                                    {product.hardrive && <span>💾 {product.hardrive}</span>}
                                                </div>
                                            )}
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="product-card__overlay">
                                            <span>Xem chi tiết →</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <Footer />
                </div>
            )}
        </>
    );
}

export default Home;
