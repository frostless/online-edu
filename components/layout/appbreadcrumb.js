import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Breadcrumb } from "antd";
import LayoutService from "./layoutservice";
import { useRouter } from 'next/router'

function AppBreadcrumb() {
  const [breadcrumbName, setbreadcrumbName] = useState([]);
  const router = useRouter();
  const path = router.pathname;

  useEffect(() => {
    const query = router.query;
    setbreadcrumbName(LayoutService.getBreadcrumbName(path, query));
  }, []);

  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <Link href="/">
          <a>Admin Panel</a>
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>{breadcrumbName}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default AppBreadcrumb;