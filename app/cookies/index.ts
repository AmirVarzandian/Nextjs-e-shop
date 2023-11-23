import { deleteCookie, setCookie } from 'cookies-next';
export const setClientCookie = () => {
    setCookie('token', 'cookieValue', {
      maxAge: 60 * 60 * 24 * 30, 
      path: '/',
      sameSite: 'strict',
    });
  };


export const setIdClientCookie = () => {
    setCookie('token2', 'cookieValue', {
      maxAge: 60 * 60 * 24 * 30, 
      path: '/',
      sameSite: 'strict',
    });
  };



  
  

 export const deleteClientCookie = () => {
    deleteCookie('token');
  };
