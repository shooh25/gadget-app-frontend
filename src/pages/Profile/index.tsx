import React from "react";
import { Link } from "react-router-dom";
import styles from "./style.scss";
import { AuthProvider, logout } from "../../lib/auth";

const Profile = () => {
  const [user, isLoading] = AuthProvider();

  return (
    <>
    </>
  );
};

export default Profile;
