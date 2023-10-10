import { Colors } from "./Colors";
import { Message } from "./Messages";

export enum SortingAlgorithms {"Bubble Sort", "Optimized Bubble Sort", "Insertion Sort", "Selection Sort", "Merge Sort"}; 

export type SortingAlgorithm = "Bubble Sort" | "Optimized Bubble Sort" | "Insertion Sort" | "Selection Sort" | "Merge Sort";

export type SortingBlock = { height: number, id: string, color: Colors }

export type SortingStep = { data: SortingBlock[], message: Message }