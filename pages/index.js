import { useEffect } from 'react';
import Router from 'next/router'
import Token from '../lib/token'

function HomePage() {

  useEffect(() => {
    let isLogin = false;
    if (Token.getToken()) isLogin = true;

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