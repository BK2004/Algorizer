import { Colors } from "../types/Colors";
import { GridBlock, SelectionTypes } from "../types/Pathfinding";

const generateGrid = (width: number, height: number) => {
    const out: GridBlock[] = [];

    for (let i = 0; i < width * height; i++) {
        out.push({id: i, color: Colors.DEFAULT, selectionType: SelectionTypes.DEFAULT});
    }

    // select random target
    const randomTarget = Math.floor(Math.random() * width * height)
    out[randomTarget].selectionType = SelectionTypes.TARGET;
    out[randomTarget].color = Colors.TARGET;

    // pick target while randomly selecting already chosen target
    let i;
    do {
        i = Math.floor(Math.random() * width * height);
    } while (out[i].selectionType !== SelectionTypes.DEFAULT);

    out[i].selectionType = SelectionTypes.START;
    out[i].color = Colors.START;
    
    return out;
}

export const PathfindingFactory = {
    generateGrid,
}