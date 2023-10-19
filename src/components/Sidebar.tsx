const Routes: { [name: string]: string } = {
    "Sorting": "/sorting",
    "Pathfinding": "/pathfinding",
}

const Sidebar = ({ visible }: { visible: boolean }) => {
    return <div className={`fixed top-0 ${visible ? "left-0" : "left-[-370px]"} shadow-md transition-all duration-300 text-blue-500 dark:text-blue-400 ease-in-out h-screen w-[350px] bg-white dark:bg-neutral-900`}>
        <a href="/" className="homepage-frame sidebar-link text-3xl tracking-widest py-4 px-4 block">ALGORIZER</a>
        <hr className="border-0 h-[2px] bg-blue-500 dark:bg-blue-400 mx-2 my-1" />
        {Object.keys(Routes).map((name: string) => 
            <a key={`link-${name}`} href={Routes[name]} className="block text-2xl pl-8 pr-4 py-2 sidebar-link text-gray-700 dark:text-neutral-300 w-full">
                {name}
            </a>
        )}
    </div>;
}

export default Sidebar;