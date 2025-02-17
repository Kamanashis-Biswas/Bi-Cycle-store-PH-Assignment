import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MainLayouts = () => {
    return (
        <div>
            <Navbar />
            <Outlet></Outlet>
            <Footer />
        </div>
    );
};

export default MainLayouts;