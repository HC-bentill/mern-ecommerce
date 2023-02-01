import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "../../redux/apiCalls";
import {ToastContainer, toast} from "react-toastify";
import "./login.css";
import {storeItem} from "../../utils";
import {setAppLoading} from "../../redux/appRedux";
import { setUser } from "../../redux/userRedux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const notifySuccess = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  const notifyError = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setAppLoading(true));
    login({username, password})
      .then((res) => {
        dispatch(setAppLoading(false));
        if (res.data.success) {
          dispatch(setUser({...res.data.data}));
          notifySuccess(res.data.message);
          storeItem("user", JSON.stringify(res.data.data));
        } else {
          notifyError(res.data.message);
        }
      })

      .catch((err) => {
        dispatch(setAppLoading(false));
        console.log("loginerr", err);
      });
  };

  return (
    <>
      <div className="login_container">
        <div style={{flex: "0.7"}}>
          <div className="title_conatiner">
            <h1 className="title">Luxe Market Admin</h1>
            <p style={{color: "white"}}>Welcome back</p>
          </div>
        </div>
        <div style={{flex: "0.3"}}>
          <div>
            <div className="form_container">
              <p className="" style={{marginBottom: "14px"}}>
                Enter your credentials
              </p>
              <div className="formFields">
                <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="formFields">
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button className="login_button" onClick={handleClick} style={{padding: 13, width: "100%"}}>
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
};

export default Login;
