import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Admin from '../../Admin/Admin';
import './ListProducts.scss';
import { createProduct, deleteProduct, getAllProducts, updateProduct } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function ListProducts() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.auth.login?.currentUser);
    //Lấy tất cả người dùng
    const listProduct = useSelector((state) => state.users.users?.allProducts);

    //refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    //Hiện form chỉnh sửa
    const [newName, setNewName] = useState('');
    const [newAvatar, setNewAvatar] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newCost, setNewCost] = useState('');
    const [newPercent, setNewPercent] = useState('');
    const [newCpu, setNewCpu] = useState('');
    const [newHardrive, setNewHardrive] = useState('');
    const [newMuxSwitch, setNewMuxSwitch] = useState('');
    const [newCreen, setNewCreen] = useState('');
    const [newWebcam, setNewWebcam] = useState('');
    const [newConnection, setNewConnection] = useState('');
    const [newWeight, setNewWeight] = useState('');
    const [newPin, setNewPin] = useState('');
    const [newOperetingSystem, setNewOperetingSystem] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [currentBtn, setCurrentBtn] = useState('');
    const [currentTitle, setCurrentTitle] = useState('');

    const handleShowEdit = (product) => {
        setNewName(product.name);
        setNewAvatar(product.product.avatar);
        setNewDescription(product.product.description);
        setNewNumber(product.product.number);
        setNewPrice(product.product.price);
        setNewCost(product.product.cost);
        setNewPercent(product.product.percent);
        setNewCpu(product.product.cpu);
        setNewHardrive(product.product.hardrive);
        setNewMuxSwitch(product.product.muxSwitch);
        setNewCreen(product.product.creen);
        setNewWebcam(product.product.webcam);
        setNewConnection(product.product.connection);
        setNewWeight(product.product.weight);
        setNewPin(product.product.pin);
        setNewOperetingSystem(product.product.operetingSystem);
        setCurrentId(product._id);

        setCurrentBtn('Lưu');
        setCurrentTitle('Chỉnh sửa thông tin');
        document.querySelector('.listproduct-box').style.display = 'flex';
    };

    //đóng form chỉnh sửa
    const handleClearEdit = () => {
        document.querySelector('.listproduct-box').style.display = 'none';
    };

    //delete product
    const handleDelete = (id) => {
        deleteProduct(user.accessToken, dispatch, id, axiosJWT);
    };

    //show create product
    const handleShowProduct = () => {
        setNewName('');
        setNewAvatar('');
        setNewDescription('');
        setNewNumber('');
        setNewPrice('');
        setNewCost('');
        setNewPercent('');
        setNewCpu('');
        setNewHardrive('');
        setNewMuxSwitch('');
        setNewCreen('');
        setNewWebcam('');
        setNewConnection('');
        setNewWeight('');
        setNewPin('');
        setNewOperetingSystem('');
        setCurrentId('');

        setCurrentBtn('Thêm');
        setCurrentTitle('Thêm mới');
        document.querySelector('.listproduct-box').style.display = 'flex';
    };

    const handleProduct = (value) => {
        const newProduct = {
            name: newName,
            product: {
                description: newDescription,
                avatar: newAvatar,
                number: newNumber,
                price: newPrice,
                cost: newCost,
                percent: newPercent,
                cpu: newCpu,
                hardrive: newHardrive,
                muxSwitch: newMuxSwitch,
                creen: newCreen,
                webcam: newWebcam,
                connection: newConnection,
                weight: newWeight,
                pin: newPin,
                operetingSystem: newOperetingSystem,
            },
        };

        if (
            newName.length < 1 ||
            newDescription.length < 1 ||
            newNumber.length < 1 ||
            newPrice.length < 1 ||
            newCost.length < 1 ||
            newPercent.length < 1 ||
            newCpu.length < 1 ||
            newHardrive.length < 1 ||
            newMuxSwitch.length < 1 ||
            newCreen.length < 1 ||
            newWebcam.length < 1 ||
            newConnection.length < 1 ||
            newWeight.length < 1 ||
            newPin.length < 1 ||
            newOperetingSystem.length < 1
        ) {
            alert('Không được để trống thông tin');
        } else {
            if (value === 'Thêm') {
                //Tạo sản phẩm mới
                createProduct(dispatch, newProduct);
            } else if (value === 'Lưu') {
                //Chỉnh sửa thông tin người dùng
                updateProduct(user.accessToken, newProduct, currentId, axiosJWT, dispatch);
            }
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        if (user?.accessToken) {
            getAllProducts(dispatch);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="listproduct-box">
                <div className="wrapper">
                    <h3>{currentTitle} sản phẩm</h3>
                    <section className="wrapper-body">
                        <div className="wrapper-col">
                            <div className="wrapper-item">
                                <span>Hãng</span>
                                <input
                                    type="text"
                                    placeholder="Hãng"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Tên</span>
                                <input
                                    type="text"
                                    placeholder="Tên sản phẩm"
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                />
                            </div>
                            {currentBtn === 'Thêm' ? (
                                <div className="wrapper-item">
                                    <span>Ảnh</span>
                                    <input
                                        type="text"
                                        placeholder="Link ảnh mô tả"
                                        value={newAvatar}
                                        onChange={(e) => setNewAvatar(e.target.value)}
                                    />
                                </div>
                            ) : (
                                ''
                            )}
                            <div className="wrapper-item">
                                <span>Giá ưu đãi</span>
                                <input
                                    type="number"
                                    placeholder="Giá ưu đãi"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Giá gốc</span>
                                <input
                                    type="number"
                                    placeholder="Giá gốc"
                                    value={newCost}
                                    onChange={(e) => setNewCost(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Số lượng</span>
                                <input
                                    type="number"
                                    placeholder="Số lượng"
                                    value={newNumber}
                                    onChange={(e) => setNewNumber(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Giảm</span>
                                <input
                                    type="number"
                                    placeholder="Phần trăm giảm"
                                    value={newPercent}
                                    onChange={(e) => setNewPercent(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Khối lượng</span>
                                <input
                                    type="text"
                                    placeholder="Khối lượng"
                                    value={newWeight}
                                    onChange={(e) => setNewWeight(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="wrapper-col">
                            <div className="wrapper-item">
                                <span>CPU</span>
                                <input
                                    type="text"
                                    placeholder="CPU"
                                    value={newCpu}
                                    onChange={(e) => setNewCpu(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Ổ cứng</span>
                                <input
                                    type="text"
                                    placeholder="Ổ cứng"
                                    value={newHardrive}
                                    onChange={(e) => setNewHardrive(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>MUX Switch</span>
                                <input
                                    type="text"
                                    placeholder="MUX Switch"
                                    value={newMuxSwitch}
                                    onChange={(e) => setNewMuxSwitch(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Màn hình</span>
                                <input
                                    type="text"
                                    placeholder="Màn hình"
                                    value={newCreen}
                                    onChange={(e) => setNewCreen(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Webcam</span>
                                <input
                                    type="text"
                                    placeholder="Webcam"
                                    value={newWebcam}
                                    onChange={(e) => setNewWebcam(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Cổng kết nối</span>
                                <input
                                    type="text"
                                    placeholder="Cổng kết nối"
                                    value={newConnection}
                                    onChange={(e) => setNewConnection(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Pin</span>
                                <input
                                    type="text"
                                    placeholder="Pin"
                                    value={newPin}
                                    onChange={(e) => setNewPin(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Hệ điều hành</span>
                                <input
                                    type="text"
                                    placeholder="Hệ điều hành"
                                    value={newOperetingSystem}
                                    onChange={(e) => setNewOperetingSystem(e.target.value)}
                                />
                            </div>
                        </div>
                    </section>
                    <button className="btn-edit" onClick={(e) => handleProduct(currentBtn)}>
                        {currentBtn}
                    </button>
                    <button className="btn-delete" onClick={handleClearEdit}>
                        Hủy
                    </button>
                </div>
            </div>
            <div className="listproduct-container">
                <Admin />
                <div className="listproduct-header">Danh sách sản phẩm</div>
                <div className="listproduct-container-btn">
                    <button className="btn-add" onClick={(e) => handleShowProduct()}>
                        <FontAwesomeIcon icon={faPlus} />
                        Tạo mới
                    </button>
                </div>
                <table>
                    <tbody>
                        <tr>
                            <th>Hãng</th>
                            <th>Hình ảnh</th>
                            <th>Tên</th>
                            <th>Giá ưu đãi</th>
                            <th>Giá gốc</th>
                            <th>Khối lượng</th>
                            <th>Số lượng</th>
                        </tr>
                        {listProduct?.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <img src={item.product?.avatar} alt="" />
                                    </td>
                                    <td className="listproduct-description">{item.product?.description}</td>
                                    <td>
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.product?.price)}
                                    </td>
                                    <td>
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.product?.cost)}
                                    </td>
                                    <td>{item.product?.weight}</td>
                                    <td>{item.product?.number}</td>
                                    <td>
                                        <button className="btn-edit" onClick={(e) => handleShowEdit(item)}>
                                            Chỉnh sửa
                                        </button>
                                        <button className="btn-delete" onClick={(e) => handleDelete(item._id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListProducts;
