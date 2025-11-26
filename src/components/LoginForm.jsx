import {useAuthentication} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';

function LoginForm() {
  const initValues = {
    username: '',
    password: '',
  };

  const {postLogin} = useAuthentication();

  const navigate = useNavigate();

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doLogin,
    initValues,
  );

  async function doLogin() {
    console.log(inputs);
    // TODO: add login functionalities here
    const token = await postLogin(inputs);

    if (token) {
      localStorage.setItem('token', token);
      navigate('/');
    } else {
      console.log('Login failed');
    }
  }

  console.log(inputs);

  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="loginuser">Username</label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={(e) => {
              handleInputChange(e);
            }}
            autoComplete="username"
            value={inputs.username}
          />
        </div>
        <div>
          <label htmlFor="loginpassword">Password</label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={(e) => {
              handleInputChange(e);
            }}
            autoComplete="current-password"
            value={inputs.password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default LoginForm;
