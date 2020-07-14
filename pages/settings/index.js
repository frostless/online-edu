import AppLayout from "../../components/layout/appLayout";
import ChangePassword from "../../components/settings/changepassword";

function HomePage() {
  return <AppLayout content={new ChangePassword()} />
}

export default HomePage;