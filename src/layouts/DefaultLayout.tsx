import { Outlet } from "react-router-dom";

import Header from "../components/Header";

const DefaultLayout = () => {
    return <div className="h-full min-h-screen w-full bg-gray-100 dark:bg-neutral-850 text-gray-800 dark:text-neutral-200 flex flex-col justify-start items-center">
        <Header />
        <Outlet />
    </div>;
}

export default DefaultLayout;