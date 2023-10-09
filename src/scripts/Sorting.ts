import { SortingAlgorithms, type SortingAlgorithm, type SortingBlock, type SortingStep } from "../types/Sorting";
import { Colors } from "../types/Colors";

const swap = (arr: any[], i: number, j: number) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const clearTempStack = (stack: number[], step: SortingStep) => {
    while (stack.length > 0) {
        const i = stack.pop()!;
        step.data[i].color = Colors.DEFAULT;
    }
}

const copyLast = (steps: SortingStep[]): SortingStep => {
    const out = [];
    for (let i = 0; i < steps[steps.length - 1].data.length; i++) {
        out.push({ id: steps[steps.length - 1].data[i].id, color: steps[steps.length - 1].data[i].color, height: steps[steps.length - 1].data[i].height });
    }

    return {data: out, message: { content: "", color: Colors.DEFAULT }};
}

const generateBubbleSteps = (steps: SortingStep[]) => { 
    const tempStack: number[] = [];

    for (let i = 0; i < steps[0].data.length; i++) {
        for (let j = 1; j < steps[0].data.length - i; j++) {
            // if there are elements in stack, they need to be reset to default
            steps.push(copyLast(steps));
            clearTempStack(tempStack, steps[steps.length - 1]);

            // compare j and j - 1
            steps[steps.length - 1].data[j].color = Colors.COMPARE;
            steps[steps.length - 1].data[j - 1].color = Colors.COMPARE;
            steps[steps.length - 1].message = {content: `Comparing elements ${j - 1} and ${j}`, color: Colors.COMPARE};
            tempStack.push(j);
            tempStack.push(j - 1);

            if (steps[steps.length - 1].data[j].height < steps[steps.length - 1].data[j - 1].height) {
                // swap them
                steps.push(copyLast(steps));
                swap(steps[steps.length - 1].data, j, j - 1);
                steps[steps.length - 1].data[j].color = Colors.SWAP;
                steps[steps.length - 1].data[j - 1].color = Colors.SWAP;
                steps[steps.length - 1].message = {content: `Swapping elements ${j - 1} and ${j}`, color: Colors.SWAP};
            }
        }
        
        // change last element to finished
        steps.push(copyLast(steps));
        clearTempStack(tempStack, steps[steps.length - 1]);
        steps[steps.length - 1].data[steps[0].data.length - i - 1].color = Colors.FINISHED;
        steps[steps.length - 1].message = {content: `Element ${steps[0].data.length - i - 1} finished`, color: Colors.FINISHED};
    }
}

const algorithmGenerators: {[name in SortingAlgorithms]: (steps: SortingStep[]) => void} = {
    0: generateBubbleSteps,
}

const generateHeights = (min: number, max: number, numElements: number) => {
    const out: SortingBlock[] = [];
    for (let i = 0; i < numElements; i++) {
        out.push({ color: Colors.DEFAULT, height: Math.floor(Math.random() * (max - min + 1) + min), id: `el-${i}` });
    }

    return out;
}

const generateSteps = (algo: SortingAlgorithm, min: number, max: number, numElements: number) => {
    const steps: SortingStep[] = [{data: generateHeights(min, max, numElements), message: { content: "", color: Colors.DEFAULT }}];
    algorithmGenerators[SortingAlgorithms[algo]](steps);

    return steps;
}

export const SortingFactory = {
    generateHeights,
    generateSteps,
}