import React from "react";
import "./topbar.css";
import {NotificationsNone, Language, Settings} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../redux/userRedux";
import {ToastContainer, toast} from "react-toastify";

export default function Topbar() {
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

  const handleLogout = () => {
    setTimeout(() => {
      if (dispatch(logoutUser())) {
        notifySuccess("Successful Logout");
      }
    }, 100);
  };
  return (
    <>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">Luxe Admin</span>
          </div>
          <div className="topRight">
            <div onClick={() => handleLogout()} className="topbarIconContainer">
              Logout
            </div>
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
}
