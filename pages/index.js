import { useEffect, useState } from 'react';
import Router from 'next/router'
import Token from './lib/Token'
import StudentManagement from './components/StudentManagement'

function HomePage() {
  const [isLogin, SetLoginStatus] = useState(false);

  useEffect(() => {
    let isLogin = false;
    if (Token.getToken()) isLogin = true;

    SetLoginStatus(isLogin);

    if (!isLogin){
      Router.push("/login");
    }
  });

  return (
    <React.Fragment>
      {isLogin &&
      <StudentManagement />
      }
    </React.Fragment>
  );
}

export default HomePage