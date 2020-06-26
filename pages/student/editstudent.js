import AppLayout from "../../components/layout/appLayout";
import EditStudent from "../../components/student/editstudent";

const HomePage = ({ id }) => {
  return <AppLayout content={new EditStudent({ id: id })} />;
};

HomePage.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id: id };
};

export default HomePage;