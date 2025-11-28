import React, {useEffect} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = React.useState(null);

  const {getUserByToken} = useUser();

  useEffect(() => {
    getUserByToken(localStorage.getItem('token')).then((resultUser) => {
      setUser(resultUser);
    });
  }, []);
  return (
    <div>
      {user && (
        <>
          <h1>Profile</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Created: {user.created_at}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
