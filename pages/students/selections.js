import AppLayout from "../../components/layout/appLayout";
import Selections from "../../components/students/selections/home";

const HomePage = () => {
  return <AppLayout content={new Selections()} />;
};

export default HomePage;