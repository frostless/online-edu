import { useEffect, useState } from 'react';
import Router from 'next/router'

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
      <div>Welcom to onlineEdu</div>}
    </React.Fragment>
  );
}

export default HomePage