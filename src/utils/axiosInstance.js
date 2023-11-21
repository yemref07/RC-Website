import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.rapp.com.tr',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default instance;