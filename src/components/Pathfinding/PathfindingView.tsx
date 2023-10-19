import { useState } from "react";
import Grid from "../DataModels/Grid";
import { GridBlock, PathfindingAlgorithms } from "../../types/Pathfinding";
import { Colors } from "../../types/Colors";
import { PathfindingFactory } from "../../scripts/Pathfinding";

const PathfindingView = () => {
    const [algorithm, setAlgorithm] = useState("A*");
    const [steps, setSteps] = useState<GridBlock[][]>([PathfindingFactory.generateGrid(20, 15)]);
    const [step, setStep] = useState(0);

    return <div className="pathfinding-view w-[90%] max-w-[800px] flex-1 flex flex-col justify-start px-4">
        <div className="top-bar py-2 w-full flex gap-1">
            <select className="bg-white dark:bg-neutral-900 rounded-md border-0 outline-0 py-1 px-2" value={algorithm} onChange={(e) => setAlgorithm(e.currentTarget.value)}>
                {Object.keys(PathfindingAlgorithms).filter((k) => isNaN(Number(k))).map((k) => 
                    <option value={k} key={"algo-" + k}>{k}</option>
                )}
            </select>
        </div>
        <Grid data={steps[step]} />
    </div>;
}

export default PathfindingView;