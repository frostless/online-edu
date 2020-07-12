import AppLayout from "../../components/layout/appLayout";
import CourseType from "../../components/course/courseType";

const HomePage = () => {
  return <AppLayout content={new CourseType()} />;
};

export default HomePage;