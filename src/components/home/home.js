import Dashboard from "../dashboard/dashboard";
import ApplyForm from '../applyForm/applyform';
import { useRef, useEffect } from "react";

const Home = () => {

    const mainRef = useRef(null);
    const formRef = useRef(null);

    useEffect(() => {
        mainRef.current.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    },[])

    return(
        <>
            <Dashboard formRef={formRef} mainRef={mainRef}/>
            <ApplyForm mainRef={mainRef} formRef={formRef}/>
        </>
    )
}

export default Home;