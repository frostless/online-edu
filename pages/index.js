import { useEffect } from 'react';
import Router from 'next/router'
import User from '../lib/User'

function HomePage() {

  useEffect(() => {
    let isLogin = false;
    if (User.getToken()) isLogin = true;

    if (!isLogin) {
      Router.push("/login");
    } else {
      Router.push("/student");
    }
  });

  return (
    <React.Fragment>
    </React.Fragment>
  );
}

export default HomePage