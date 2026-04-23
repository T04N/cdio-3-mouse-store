import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './Products.scss';
import { getAllProducts, sendCurrentProduct } from '../../redux/apiRequest';
import { useNavigate } from 'react-router-dom'; // Thêm dòng này

const categories = [
    'All',
    'Dell',
    'MacBook',
    'ASUS',
    'Acer',
    'HP',
    'Lenovo',
    // ...thêm các hãng khác nếu có
];

export default function Products() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Thêm dòng này
    const listProduct = useSelector((state) => state.users.users?.allProducts) || [];
    const [currentCategory, setCurrentCategory] = useState('All');

    useEffect(() => {
        // Lấy sản phẩm từ database nếu chưa có
        if (!listProduct || listProduct.length === 0) {
            getAllProducts(dispatch);
        }
        // eslint-disable-next-line
    }, []);

    // Lọc sản phẩm theo hãng
    const filteredProducts =
        currentCategory === 'All'
            ? listProduct
            : listProduct.filter((item) => item.name?.toLowerCase().includes(currentCategory.toLowerCase()));

    return (
        <>
            <NavBar />
            <div className="products-container">
                <h1>Sản phẩm</h1>
                <div className="products-categories">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={currentCategory === cat ? 'active' : ''}
                            onClick={() => setCurrentCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="products-grid">
                    {filteredProducts && filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className="product-card" key={product._id}>
                                <img src={product.product?.avatar} alt={product.product?.description} />
                                <h2>{product.product?.description}</h2>
                                <p className="product-price">
                                    {Intl.NumberFormat('de-DE', {
                                        style: 'currency',
                                        currency: 'VND',
                                    }).format(product.product?.price || 0)}
                                </p>
                                <button
                                    className="product-btn"
                                    onClick={() => {
                                        sendCurrentProduct(dispatch, navigate, {
                                            ...product.product,
                                            id: product._id,
                                        });
                                    }}
                                >
                                    Xem chi tiết
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="no-product">Không có sản phẩm nào!</div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}
