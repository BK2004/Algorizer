import { BackgroundColorMap } from "../../types/Colors";
import { GridBlock } from "../../types/Pathfinding";

const Grid = ({ data }: { data: GridBlock[] }) => {
    return <div className="w-full h-auto grid grid-rows-[repeat(15,minmax(0,1fr))] grid-cols-[repeat(20,minmax(0,1fr))] gap-[2px]">
        {data.map((val) => <div key={val.id} className={`${BackgroundColorMap[val.color]} aspect-square rounded-md transition-all duration-150 cursor-pointer ease-in-out`}></div>)}
    </div>;
}

export default Grid;