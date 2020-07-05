import AppLayout from "../../components/layout/appLayout";
import Selections from "../../components/student/selections/home";

const HomePage = () => {
  return <AppLayout content={new Selections()} />;
};

export default HomePage;