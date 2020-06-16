import AppLayout from "../../components/appLayout";
import StudentList from "../../components/studentList";

function HomePage() {
  return <AppLayout content={new StudentList()} />
}

export default HomePage;