import AppLayout from "../../components/appLayout";
import StudentList from "../../components/student/studentList";

function HomePage() {
  return <AppLayout content={new StudentList()} />
}

export default HomePage;