import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: {
            allUsers: null,
            allProducts: null,
            allOrders: null,
            allListOrders: null,
            currentProduct: null,
            searchResults: null,
            isFetching: false,
            error: false,
        },
        msg: '',
    },
    reducers: {
        getUserStart: (state) => {
            state.users.isFetching = true;
            state.msg = 'Cập nhật thông tin thành công';
        },
        getUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
        },
        getUserFailed: (state) => {
            state.users.error = false;
        },

        //delete user
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.msg = 'Xóa người dùng thành công';
        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //update user
        updateListUserStart: (state) => {
            state.users.isFetching = true;
        },
        updateListUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.msg = 'Cập nhật thông tin thành công';
        },
        updateListUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //get all product
        getProductStart: (state) => {
            state.users.isFetching = true;
        },
        getProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allProducts = action.payload;
        },
        getProductFailed: (state) => {
            state.users.error = false;
        },

        //delete product
        deleteProductStart: (state) => {
            state.users.isFetching = true;
        },
        deleteProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allProducts = action.payload;
            state.msg = 'Xóa sản phẩm thành công';
        },
        deleteProductFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //update product
        updateProductStart: (state) => {
            state.users.isFetching = true;
        },
        updateProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allProducts = action.payload;
            state.msg = 'Cập nhật thông tin thành công';
        },
        updateProductFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //create product
        createProductStart: (state) => {
            state.users.isFetching = true;
        },
        createProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allProducts = action.payload;
        },
        createProductFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //get product information from frontend
        sendInforProductStart: (state) => {
            state.users.isFetching = true;
        },
        sendInforProductSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.currentProduct = action.payload;
        },
        sendInforProductFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //get the search results
        getSearchResultsStart: (state) => {
            state.users.isFetching = true;
        },
        getSearchResultsSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.searchResults = action.payload;
        },
        getSearchResultsFailed: (state) => {
            state.users.error = false;
        },

        //create Order
        createOrdersStart: (state) => {
            state.users.isFetching = true;
        },
        createOrdersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allOrders = action.payload;
        },
        createOrdersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //get all Order
        getAllOrdersStart: (state) => {
            state.users.isFetching = true;
        },
        getAllOrdersSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allListOrders = action.payload;
        },
        getAllOrdersFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },

        //delete order
        deleteOrderStart: (state) => {
            state.users.isFetching = true;
        },
        deleteOrderSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allListOrders = action.payload;
            state.msg = 'Xóa đơn hàng thành công';
        },
        deleteOrderFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },

        //delete order
        updateOrderStart: (state) => {
            state.users.isFetching = true;
        },
        updateOrderSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allListOrders = action.payload;
            state.msg = 'Cập nhật đơn hàng thành công';
        },
        updateOrderFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },
    },
});

export const {
    getUserStart,
    getUserSuccess,
    getUserFailed,

    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,

    updateListUserStart,
    updateListUserSuccess,
    updateListUserFailed,

    getProductStart,
    getProductSuccess,
    getProductFailed,

    deleteProductStart,
    deleteProductSuccess,
    deleteProductFailed,

    updateProductStart,
    updateProductSuccess,
    updateProductFailed,

    createProductStart,
    createProductSuccess,
    createProductFailed,

    sendInforProductStart,
    sendInforProductSuccess,
    sendInforProductFailed,

    getSearchResultsStart,
    getSearchResultsSuccess,
    getSearchResultsFailed,

    createOrdersStart,
    createOrdersSuccess,
    createOrdersFailed,

    getAllOrdersStart,
    getAllOrdersSuccess,
    getAllOrdersFailed,

    deleteOrderStart,
    deleteOrderSuccess,
    deleteOrderFailed,

    updateOrderStart,
    updateOrderSuccess,
    updateOrderFailed,
} = userSlice.actions;

export default userSlice.reducer;
