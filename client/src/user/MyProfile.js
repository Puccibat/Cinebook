import React from 'react';
import { isAuth } from '../auth/ApiAuth';

const MyProfile = () => {
  const { user } = isAuth();
  return (
    <div>
      <h1>I'm a {user.email}</h1>
    </div>
  );
};

export default MyProfile;
