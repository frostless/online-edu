import AppLayout from "../../components/layout/appLayout";
import AddCourse from "../../components/course/AddCourse";

const HomePage = () => {
    return <AppLayout content={new AddCourse()} />
};

export default HomePage;
