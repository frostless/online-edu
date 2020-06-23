import AppLayout from "../../components/layout/appLayout";
import EditStudent from "../../components/student/editstudent";
import { useRouter } from 'next/router'

const HomePage = () => {
    const router = useRouter()
    const { id } = router.query
    return <AppLayout content={new EditStudent({id:id})} />
};

export default HomePage;