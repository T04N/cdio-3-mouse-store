const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema(
    {
        listproduct: {
            type: Object,
            require: true,
        },
        paymentMethods: {
            type: String,
            require: true,
        },
        total: {
            type: Number,
            require: true,
        },
        tradingCode: {
            type: String,
            require: true,
        },
        isPayment: {
            type: Boolean,
            default: false,
        },
        istransported: {
            type: Boolean,
            default: false,
        },
        isSuccess: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Orders', ordersSchema);
