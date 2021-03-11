import React from 'react';
import { isAuth } from '../api/ApiAuth';

const MyProfile = () => {
  const { user } = isAuth();
  return (
    <div>
      <h1>I'm a {user.userName}</h1>
    </div>
  );
};

export default MyProfile;
