import React from "react";
import "./avatar.css";
import img from '../../assests/images/panda.png'
const HomeAvatar = () => <div className="logo">
    <img src={img} alt='panda img' style={{ width: '2.5rem', height: 'auto' }} />
</div>;

export default HomeAvatar;
