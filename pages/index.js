import { useEffect } from 'react';
import Router from 'next/router'
import Credential from '../lib/credential'

function HomePage() {

  useEffect(() => {
    let isLogin = false;
    if (Credential.getToken()) isLogin = true;

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