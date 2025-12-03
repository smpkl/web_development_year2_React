import React from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = React.useState([]);

  async function getMedia() {
    try {
      const temp = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      await Promise.all(
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

  /**
   * Delete a post.
   *
   * @param {JWTToken} token JWTToken of user
   * @param {string} id Id of post
   */
  async function deleteMedia(token, id) {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media/' + id,
        options,
      );

      console.log(response);
    } catch (error) {
      console.log('Error:', error);
    }
  }

  async function updateMedia(token, id, values) {
    try {
      // values.id = id;
      console.log(values);
      const options = {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      };
      const response = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media/' + id,
        options,
      );

      return response;
    } catch (error) {
      console.log('Error:', error);
    }
  }

  // React.useEffect(() => {
  //  getMedia();
  // }, []);

  return {mediaArray, getMedia, deleteMedia, updateMedia};
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
      const response = await fetch(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        fetchOptions,
      );

      const {ok, status} = response;
      const result = {
        ok,
        status,
        body: await response.json(),
      };
      return result;
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
      let response = await fetch(
        import.meta.env.VITE_AUTH_API + '/users',
        options,
      );
      const {ok, status} = response;
      const result = {
        ok,
        status,
        body: await response.json(),
      };
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  return {getUserByToken, postUser};
};

const useLike = () => {
  /**
   * Post like for a post.
   *
   * @param {JWTToken} token JWT token of user.
   * @param {integer} id Id of post to like.
   */
  const postLike = async (token, id) => {
    try {
      const body = {
        media_id: id,
      };
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };
      const response = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes',
        options,
      );
      console.log(response);
      return true;
    } catch (error) {
      console.log('Error:', error);
      return false;
    }
  };

  /**
   * Remove like from a post.
   *
   * @param {JWTToken} token JWT token of user.
   * @param {integer} id Id of post.
   */
  const deleteLike = async (token, id) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: id,
        }),
      };
      const response = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/' + id,
        options,
      );
      console.log(response);
      return true;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  /**
   * Get likes of specified post.
   *
   * @param {integer} id Id of post
   */
  const getLikeCountByMediaId = async (id) => {
    try {
      const response = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/count/' + id,
      );
      // console.log(response);
      return response;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  /**
   * Get likes of user.
   *
   * @param {JWTToken} token JWT token of user.
   */
  const getLikesByUser = async (token, id) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/byuser/' + id,
        options,
      );
      console.log('Likes of user:', response);
      return response;
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return {
    postLike,
    deleteLike,
    getLikeCountByMediaId,
    getLikesByUser,
  };
};

export {useMedia, useAuthentication, useUser, useLike};
