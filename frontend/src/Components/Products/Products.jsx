import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './Products.scss';
import { getAllProducts, sendCurrentProduct } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom';

const categories = ['All', 'Dell', 'Asus', 'Macbook', 'HP', 'Acer', 'Lenovo', 'Msi'];

export default function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const listProduct = useSelector((state) => state.users.users?.allProducts) || [];
    const [currentCategory, setCurrentCategory] = useState('All');

    useEffect(() => {
        if (!listProduct || listProduct.length === 0) {
            getAllProducts(dispatch);
        }
        // eslint-disable-next-line
    }, []);

    // Flatten & filter products
    const allProducts = listProduct.map((item) => ({
        ...item.product,
        id: item._id,
        brand: item.name,
    }));

    const filteredProducts =
        currentCategory === 'All'
            ? allProducts
            : allProducts.filter((p) => p.brand?.toLowerCase() === currentCategory.toLowerCase());

    const formatPrice = (price) => {
        return Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'VND',
        }).format(price || 0);
    };

    const handleShowProduct = (product) => {
        sendCurrentProduct(dispatch, navigate, product);
    };

    return (
        <>
            <NavBar />
            <div className="products-page">
                {/* Page Header */}
                <div className="products-page__header">
                    <h1>💻 Sản phẩm</h1>
                    <p>Khám phá bộ sưu tập laptop chính hãng với giá tốt nhất</p>
                </div>

                {/* Category Filter */}
                <div className="products-page__filters">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`filter-btn ${currentCategory === cat ? 'active' : ''}`}
                            onClick={() => setCurrentCategory(cat)}
                        >
                            {cat === 'All' ? 'Tất cả' : cat}
                        </button>
                    ))}
                </div>

                {/* Results Count */}
                <div className="products-page__count">
                    <span>{filteredProducts.length} sản phẩm</span>
                </div>

                {/* Product Grid */}
                <div className="products-page__grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <div
                                className="product-card"
                                key={product.id}
                                onClick={() => handleShowProduct(product)}
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                {/* Sale Badge */}
                                {product.percent > 0 && (
                                    <div className="product-card__badge">-{product.percent}%</div>
                                )}

                                {/* Brand Tag */}
                                <div className="product-card__brand">{product.brand}</div>

                                {/* Image */}
                                <div className="product-card__img">
                                    <img src={product.avatar} alt={product.description} />
                                </div>

                                {/* Info */}
                                <div className="product-card__info">
                                    <h3 className="product-card__name">{product.description}</h3>

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

                                    {product.cpu && (
                                        <div className="product-card__specs">
                                            <span>💻 {product.cpu}</span>
                                            {product.hardrive && <span>💾 {product.hardrive}</span>}
                                        </div>
                                    )}

                                    <button className="product-card__btn">Xem chi tiết</button>
                                </div>

                                {/* Hover Overlay */}
                                <div className="product-card__overlay">
                                    <span>Xem chi tiết →</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="products-page__empty">
                            <p>😔 Không có sản phẩm nào trong danh mục này</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
