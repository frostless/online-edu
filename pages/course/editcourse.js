import AppLayout from "../../components/layout/appLayout";
import EditCourse from "../../components/course/editcourse";

const HomePage = ({ id }) => {
  return <AppLayout content={new EditCourse({ id: id })} />;
};

HomePage.getInitialProps = async ({ query }) => {
  const { id } = query;
  return { id: id };
};

export default HomePage;