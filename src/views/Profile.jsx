import React, {useEffect} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = React.useState(null);

  const {getUserByToken} = useUser();

  useEffect(() => {
    getUserByToken(localStorage.getItem('token')).then((resultUser) => {
      setUser(resultUser);
      console.log(resultUser);
    });
  }, []);
  return (
    <>
      <p>username: {user?.username ? user.username : ''}</p>
      <p>email: {user?.email ? user.email : ''}</p>
      <p>created: {user?.created_at ? user.created_at : ''}</p>
    </>
  );
};

export default Profile;
