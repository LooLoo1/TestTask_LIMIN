import React from "react";
import { useSelector } from "react-redux";

import "./avatar.scss";

export const Avatar = () => {
  const { user } = useSelector((state) => state.authReducer);
  const name = user.email || user.displayName;
  return (
    <div className="avatar">
      {user.photoURL ? (
        <img className="avatar-img" src={user.photoURL} alt="avatar" />
      ) : (
        <div className="avatar-img">{name[0].toUpperCase()}</div>
      )}
      <p>{name}</p>
    </div>
  );
};
export default Avatar;
