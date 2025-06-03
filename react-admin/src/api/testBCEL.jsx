import axios from 'axios';

export const testBCEL = async ({ amount, description, secretKey }) => {
  const url = `https://payment-gateway.lailaolab.com/v1/api/payment/generate-bcel-qr?amount=${encodeURIComponent(amount)}&description=${encodeURIComponent(description)}`;
  
  const data = new URLSearchParams({
    amount,
    description
  });

  const config = {
    headers: {
      secretKey: secretKey,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  return axios.post(url, data, config);
};

export const checkPayment = async (tranId, secretkey) => {
  return axios.get(`https://payment-gateway.lailaolab.com/v1/api/link/payment-status/${tranId}`, {
    headers: {
      secretKey: secretkey
    }
  })
}