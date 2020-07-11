import AppLayout from "../../components/layout/appLayout";
import CourseList from "../../components/course/courselist";

function HomePage() {
  return <AppLayout content={new CourseList()} />
}

export default HomePage;