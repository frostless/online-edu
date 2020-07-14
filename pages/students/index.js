import AppLayout from "../../components/layout/appLayout";
import StudentList from "../../components/students/studentlist";

function HomePage() {
  return <AppLayout content={new StudentList()} />
}

export default HomePage;