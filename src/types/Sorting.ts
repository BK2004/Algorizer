import { Colors } from "./Colors";
import { Message } from "./Messages";

export enum SortingAlgorithms {"Bubble Sort"}; 

export type SortingAlgorithm = "Bubble Sort";

export type SortingBlock = { height: number, id: string, color: Colors }

export type SortingStep = { data: SortingBlock[], message: Message }