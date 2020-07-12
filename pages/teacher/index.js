import AppLayout from "../../components/layout/appLayout";
import TeacherList from "../../components/teacher/teacherlist";

function HomePage() {
  return <AppLayout content={new TeacherList()} />
}

export default HomePage;