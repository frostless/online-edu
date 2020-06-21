import AppLayout from "../../components/appLayout";
import AddCourse from "../../components/course/AddCourse";

const HomePage = () => {
    return <AppLayout content={new AddCourse()} />
};

export default HomePage;
