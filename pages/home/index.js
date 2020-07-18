import AppLayout from "../../components/layout/appLayout";
import DashBoard from "../../components/home/dashboard";

function HomePage() {
  return <AppLayout noShareLayout="true" content={new DashBoard()} />
}

export default HomePage;