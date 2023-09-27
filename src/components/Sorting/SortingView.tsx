import { useEffect, useState } from "react";
import { SortingAlgorithms, type SortingBlock } from "../../types/Sorting";
import BarGraph from "../DataModels/BarGraph";

const SortingView = () => {
    const [data, setData] = useState<SortingBlock[]>([{ height: Math.floor(Math.random() * 9 + 1), id: "1" }, { height: Math.floor(Math.random() * 9 + 1), id: "2" }, { height: Math.floor(Math.random() * 9 + 1), id: "3" }]);
    
    useEffect(() => {
        document.addEventListener("click", (e) => {
            const newData = [...data];

            const rand1 = Math.floor(Math.random() * 3);
            const rand2 = Math.floor(Math.random() * 3);
            const temp = newData[rand1];
            newData[rand1] = newData[rand2];
            newData[rand2] = temp;

            setData(newData);
        })
    }, [])
    
    return <div className="sorting-view w-[90%] max-w-[800px] flex-1 flex flex-col justify-start px-4">
        <div className="top-bar py-2 w-full flex justify-between">
            <select className="bg-white dark:bg-neutral-900 rounded-md border-0 outline-0 py-1 px-2">
                {Object.keys(SortingAlgorithms).filter((val) => isNaN(Number(val))).map((val) => {
                    return <option key={`option-${val}`} value={val}>{val}</option>
                })}
            </select>
        </div>
        <BarGraph data={data} />
    </div>
}

export default SortingView;