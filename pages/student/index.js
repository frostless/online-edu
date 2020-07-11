import AppLayout from "../../components/layout/appLayout";
import StudentList from "../../components/student/studentlist";

function HomePage() {
  return <AppLayout content={new StudentList()} />
}

export default HomePage;