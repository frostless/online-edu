import AppLayout from "../../components/layout/appLayout";
import DashBoad from "../../components/home/dashboard";

function HomePage() {
  return <AppLayout content={new DashBoad()} />
}

export default HomePage;