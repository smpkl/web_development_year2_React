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
    <div className="flex flex-col items-center w-1/3 py-8 mx-auto border-2 border-fuchsia-300 rounded-xl! *:w-fit">
      {user && (
        <>
          <h1>Profile</h1>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Created: {new Date(user.created_at).toLocaleString('fi-FI')}</p>
        </>
      )}
    </div>
  );
};

export default Profile;
