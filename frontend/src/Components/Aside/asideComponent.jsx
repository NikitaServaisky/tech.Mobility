import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/buttonComponent";
import "./asideStyle.css";
import GoogleIconComponent from "../../images/GoogleIcon/googleIconSvg";
import FacebookIcon from "../../images/FacebookIcon/facebookIconSvg";
import BusIconSvg from "../../images/BusIcon/BusIconSvg";
import Login from "../Login/loginComponent";

const AsideComponent = () => {
  return (
    <aside>
      <div className="container">
        <div className="image_place">
          <BusIconSvg />
        </div>
        <h1>Log in to your Account</h1>
        <span>Don`t have an account? <Link>Sing Up</Link></span>
        <Button child={'Google'} logo={<GoogleIconComponent />}/>
        <Button child={'facebook'} logo={<FacebookIcon />}/>
        <Login />
      </div>
    </aside>
  );
};

export default AsideComponent;
