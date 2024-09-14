import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState, persistor } from "../../store";
import Button from "../Button";

export const NavBar = () => {
  /* ----- Initialize ----- */
  const token = useSelector<RootState, string | undefined>(state => state.user.token);
  const navigate = useNavigate();

  /* ----- Functions ----- */
  /* Handle logout */
  const logout = () => {
    persistor.purge();
  }

  /* Render buttons based on logged in user */
  const renderButtons = () => {
    return token ?
      <Button text='Logout' onClick={logout}/>
      :
      <div>
        <Button text='Login' onClick={() => navigate('/login')}/>
        <Button text='Register' onClick={() => navigate('/register')}/>
      </div>
  }

  /* ----- Render ----- */
  return (
    <nav className="sticky top-0 flex items-center justify-between flex-wrap bg-teal-500 p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">Stratego</span>
      </div>
      <div className="block flex-grow flex items-center w-auto">
        <div className="text-sm flex-grow">
        </div>
        <div>
          { renderButtons() }
        </div>
      </div>
    </nav>
  )
}