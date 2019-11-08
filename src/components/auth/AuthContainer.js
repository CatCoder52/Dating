import decode from 'jwt-decode';
import axios from 'axios';

export const getToken = () => {
  return localStorage.getItem('token');
};

export const checkAuthentification = async (data, setSecureAuth) => {
  if (isTokenExpired(data.token)) {
    setSecureAuth(false);
  }
  const isAuthenticaded = await axios.get('http://localhost:3001/auth/checkToken', {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'x-access-token': data.token,
    },
  });
  setSecureAuth(isAuthenticaded.data.success);
};

export const isTokenExpired = token => {
  const currentTime = Date.now() / 1000;
  try {
    const decoded = decode(token);
    if (decoded.exp < currentTime) {
      console.log('Your token is expired');
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return true;
  }
};
