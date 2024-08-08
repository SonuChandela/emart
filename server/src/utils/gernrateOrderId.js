import crypto from 'crypto';

const generateOrderId = () => {
    const prefix = 'ORD';
    const timestamp = Date.now().toString();
    const randomString = crypto.randomBytes(4).toString('hex'); // Generates a random string of 8 characters
    return `${prefix}-${timestamp}-${randomString}`;
  };
  
  export default generateOrderId;