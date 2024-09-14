import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../reducers/auth/auth-reducer";
import { setCredentials } from "../../reducers/user";

export const Register = () => {
  /* ----- Initialize ----- */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { error: registerError }] = useRegisterMutation();

  /* ----- Setup state ----- */
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /* ----- Setup subscriptions ----- */
  /* On register error log message */
  useEffect(() => {
    if (registerError) {
      console.log(registerError);
    }
  }, [registerError]);

  /* ----- Functions ----- */
  /* On submit button call register request from RTK */
  const onSubmit = async () => {
    // Call login request
    const loggedInUser = await register({
      username,
      password
    }).unwrap();

    // Set credentials in redux store
    dispatch(setCredentials(loggedInUser));

    // Navigate to root
    navigate('/');
  }

  /* ----- Render ----- */
  return (
    <div>
      <div>
        <h1>Register page</h1>
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