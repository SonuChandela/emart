const PaymentSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    method: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    transaction_id: {
        type: String,
        required: true
    }
});

const Payment = mongoose.model('Payment', PaymentSchema);