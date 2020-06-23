import AppLayout from "../../components/layout/appLayout";
import EditCourse from "../../components/course/editcourse";
import { useRouter } from 'next/router'

const HomePage = () => {
    const router = useRouter()
    const { id } = router.query
    return <AppLayout content={new EditCourse({id:id})} />
};

export default HomePage;