import React, {useEffect} from 'react';
import {Link, Outlet} from 'react-router';
import {useUserContext} from '../hooks/contextHooks';

const Layout = () => {
  const {user, handleAutoLogin} = useUserContext();

  useEffect(() => {
    console.log('user', user);
    handleAutoLogin();
  }, []);

  return (
    <>
      <div>
        <nav>
          <ul>
            <li className="ml-2!">
              <Link
                to="/"
                className="px-3! py-2! border-2 border-transparent hover:border-fuchsia-300 hover:rounded-xl! hover:no-underline!"
              >
                Home
              </Link>
            </li>
            <li className="mx-2!">
              <Link
                to="/profile"
                className="px-3! py-2! border-2 border-transparent hover:border-fuchsia-300 hover:rounded-xl! hover:no-underline!"
              >
                Profile
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="px-3! py-2! border-2 border-transparent hover:border-fuchsia-300 hover:rounded-xl! hover:no-underline!"
              >
                Upload
              </Link>
            </li>
          </ul>
          {user ? (
            <Link
              to="/logout"
              className="my-auto px-3! py-2! border-2 border-transparent hover:border-fuchsia-300 hover:rounded-xl! hover:no-underline!"
            >
              Log out
            </Link>
          ) : (
            <Link
              to="/login"
              className="my-auto px-3! py-2! border-2 border-transparent hover:border-fuchsia-300 hover:rounded-xl! hover:no-underline!"
            >
              Login
            </Link>
          )}
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
