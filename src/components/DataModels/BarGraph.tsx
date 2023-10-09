import Bar from "./Bar";
import { type SortingBlock } from "../../types/Sorting";
import { BackgroundColorMap } from "../../types/Colors";

const BarGraph = ({ data, maxHeight }: { data: SortingBlock[], maxHeight: number }) => {
    return <div className="w-full h-full aspect-square relative flex flex-row">
        {data.map((val, i) => <Bar key={`bar-${val.id}`} height={val.height} maxHeight={maxHeight} color={BackgroundColorMap[val.color]} />)}
    </div>;
}

export default BarGraph;