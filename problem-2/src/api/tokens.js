// Use axios to call api

import axios from 'axios';

export default {
  // Get all tokens
  getTokens() {
    return axios.get('https://interview.switcheo.com/prices.json');
  }
};