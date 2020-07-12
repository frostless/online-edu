import AppLayout from "../../components/layout/appLayout";
import RoleList from "../../components/role/rolelist";

function HomePage() {
  return <AppLayout content={new RoleList()} />
}

export default HomePage;