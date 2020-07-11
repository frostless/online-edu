import AppLayout from "../../components/layout/appLayout";
import ManagerList from "../../components/manager/managerlist";

function HomePage() {
  return <AppLayout content={new ManagerList()} />
}

export default HomePage;