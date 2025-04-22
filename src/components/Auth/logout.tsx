import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import AdminButton from '../AdminButton';

const LogoutComponent = () => {
  const { logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
    window.location.reload()
  }
  return (
    <AdminButton
      bgcolor="#980312"
      color="white"
      width="100%"
      text="Logout"
      fweight="500"
      onClick={handleLogout}
    />
  );
};

export default LogoutComponent;
