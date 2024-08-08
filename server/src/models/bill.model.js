const BillSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    payment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Payment',
        required: true
    },
    billing_date: {
        type: Date,
        default: Date.now
    },
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    gross_total: {
        type: Number,
        required: true
    },
    shipping_charge: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    shipping_address: {
        type: String,
        required: true
    },
    billing_address: {
        type: String,
        required: true
    },
    created_at: {
        type: Date, default: Date.now
    }
});


export const Bill = mongoose.model('Bill', BillSchema);