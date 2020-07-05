import { useEffect } from 'react';
import Router from 'next/router'
import Login from '../lib/login'

function HomePage() {

  useEffect(() => {
    let isLogin = false;
    if (Login.getToken()) isLogin = true;

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