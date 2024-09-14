import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../reducers/auth/auth-reducer";
import { setCredentials } from "../../reducers/user";

export const Login = () => {
  /* ----- Initialize ----- */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { error: loginError }] = useLoginMutation();

  /* ----- Setup state ----- */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /* ----- Setup subscriptions ----- */
  /* On login error log message */
  useEffect(() => {
    if (loginError) {
      console.log(loginError);
    }
  }, [loginError]);

  /* ----- Functions ----- */
  /* On submit button call login request from RTK */
  const onSubmit = async () => {
    // Call login request
    const loggedInUser = await login({
      username,
      password
    }).unwrap();

    // Set credentials in redux store
    dispatch(setCredentials(loggedInUser));

    // Navigate to root
    navigate('/')
  }

  /* ----- Render ----- */
  return (
    <div>
      <div>
        <h1>Login page</h1>
      </div>
      <div>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  )
}