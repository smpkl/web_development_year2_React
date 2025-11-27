import React from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = React.useState([]);

  async function getMedia() {
    try {
      const temp = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      Promise.all(
        temp.map(async (item) => {
          const result = await fetchData(
            `${import.meta.env.VITE_AUTH_API}/users/${item.user_id}`,
          );
          return {...item, username: result.username};
        }),
      ).then((newArray) => {
        setMediaArray(newArray);
      });
    } catch (error) {
      console.log('Error:', error);
    }
  }

  React.useEffect(() => {
    getMedia();
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      const loginResult = await fetchData(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        fetchOptions,
      );

      console.log('login result:', loginResult);
      return loginResult;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const result = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users/token',
        options,
      );
      return result.user;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const postUser = async (user) => {
    try {
      const body = {
        username: user.username,
        password: user.password,
        email: user.email,
      };
      console.log('BODY', body);
      const options = {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users',
        options,
      );
      if (!response.ok) {
        return false;
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return {getUserByToken, postUser};
};

export {useMedia, useAuthentication, useUser};
