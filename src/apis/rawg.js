import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '9131a6b6b852479bb1a79e8e5050bf9a',
  },
});
