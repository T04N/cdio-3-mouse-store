const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
            minlenght: 1,
            maxlenght: 50,
            unique: false,
        },
        product: {
            number: {
                type: Number,
                require: true,
                minlenght: 1,
                maxlenght: 50,
            },
            avatar: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            description: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            price: {
                type: Number,
                require: true,
                minlenght: 1,
                maxlenght: 50,
            },
            cost: {
                type: Number,
                require: true,
                minlenght: 1,
                maxlenght: 50,
            },
            percent: {
                type: Number,
                require: true,
                minlenght: 1,
                maxlenght: 50,
            },
            cpu: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            hardrive: {
                type: String,
                require: true,
                minlenght: 2,
                maxlenght: 150,
            },
            muxSwitch: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            creen: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            webcam: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            connection: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            weight: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            pin: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
            operetingSystem: {
                type: String,
                require: true,
                minlenght: 1,
                maxlenght: 150,
            },
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Product', productsSchema);
