import Bar from "./Bar";
import { type SortingBlock } from "../../types/Sorting";

const BarGraph = ({ data }: { data: SortingBlock[] }) => {
    return <div className="w-full h-[400px] aspect-square relative flex flex-row">
        {data.map((val, i) => <Bar key={`bar-${val.id}`} height={val.height} maxHeight={10} />)}
    </div>;
}

export default BarGraph;