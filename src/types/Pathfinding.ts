import { Colors } from "./Colors"
import { Message } from "./Messages"

export enum PathfindingAlgorithms {
    "A*"
}

export enum SelectionTypes {
    DEFAULT,
    TARGET,
    START,
    WALL
}

export type PathfindingAlgorithm = "A*"

export type GridBlock = {
    color: Colors,
    selectionType: SelectionTypes,
    id: number
}