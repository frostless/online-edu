import { useEffect, useState } from 'react';
import Router from 'next/router'
import StudentManagement from './components/StudentManagement'


function HomePage() {
  const [isLogin, SetLoginStatus] = useState(false);

  useEffect(() => {
    const isLogin = Router.query["login"]
    SetLoginStatus(isLogin)

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