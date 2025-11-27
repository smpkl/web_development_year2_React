import {useUser} from '../hooks/apiHooks';
import {useUserContext} from '../hooks/contextHooks';
import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';

const RegisterForm = () => {
  const initValues = {
    username: '',
    email: '',
    password: '',
  };
  const {postUser} = useUser();
  const {handleLogin} = useUserContext();
  const navigate = useNavigate();
  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  async function doRegister() {
    console.log(inputs);

    const response = await postUser(inputs);
    if (response.ok) {
      const credentials = {
        username: inputs.username,
        password: inputs.password,
      };
      handleLogin(credentials).then(() => {
        navigate('/');
      });
    } else {
      alert(response.body.message);
    }
  }

  return (
    <>
      <h1>Register</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div>
          <label htmlFor="registeruser">Username</label>
          <input
            name="username"
            type="text"
            id="registeruser"
            onChange={(e) => {
              handleInputChange(e);
            }}
            autoComplete="username"
            value={inputs.username}
          />
        </div>
        <div>
          <label htmlFor="registeremail">Email</label>
          <input
            name="email"
            type="email"
            id="registeremail"
            onChange={(e) => {
              handleInputChange(e);
            }}
            autoComplete="email"
            value={inputs.email}
          />
        </div>
        <div>
          <label htmlFor="registerpassword">Password</label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={(e) => {
              handleInputChange(e);
            }}
            autoComplete="current-password"
            value={inputs.password}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default RegisterForm;
