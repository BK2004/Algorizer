import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

const Header = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    // Detect mouse click outside of sidebar and close
    useEffect(() => {
        document.addEventListener("click", (e) => {
            if (e.clientX > 350) {
                // Won't cause rerender if sidebarVisible is already false
                setSidebarVisible(false);
            }
        });
    }, []);

    return <>
        <div className="p-6 bg-white dark:bg-neutral-900 flex items-center justify-start gap-8 w-full">
            <button onClick={() => setSidebarVisible(!sidebarVisible)} className="dropdown-button hover:opacity-80 transition-opacity duration-150 ease-in-out h-8 aspect-[4/3] relative">
                <div className="top-bar hamburger-bar absolute w-full h-1 bg-blue-500 dark:bg-blue-400 top-0 left-0"></div>
                <div className="middle-bar hamburger-bar absolute w-full h-1 bg-blue-500 dark:bg-blue-400 top-1/2 -translate-y-1/2 left-0"></div>
                <div className="bottom-bar hamburger-bar absolute w-full h-1 bg-blue-500 dark:bg-blue-400 bottom-0 left-0"></div>
            </button>
            <a href="/" className="text-blue-500 dark:text-blue-400 text-3xl tracking-widest">ALGORIZER</a>
        </div>
        <Sidebar visible={sidebarVisible} />      
    </>;
}

export default Header;