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

const generateOptimizedBubbleSteps = (steps: SortingStep[]) => {
    const tempStack: number[] = [];

    for (let i = 0; i < steps[0].data.length; i++) {
        let swapped = false;

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

                swapped = true;
            }
        }

        if (!swapped) {
            // no changes made, end of process
            steps.push(copyLast(steps));
            clearTempStack(tempStack, steps[steps.length - 1]);
            steps[steps.length - 1].message = {content: "No swaps made. Finished.", color: Colors.EARLY_EXIT}
            for (let k = 0; k < steps[0].data.length - i; k++) {
                steps[steps.length - 1].data[k].color = Colors.FINISHED;
            }

            return;
        }

        // change last element to finished
        steps.push(copyLast(steps));
        clearTempStack(tempStack, steps[steps.length - 1]);
        steps[steps.length - 1].data[steps[0].data.length - i - 1].color = Colors.FINISHED;
        steps[steps.length - 1].message = {content: `Element ${steps[0].data.length - i - 1} finished`, color: Colors.FINISHED};
    }
}

const generateInsertionSteps = (steps: SortingStep[]) => {
    const tempStack: number[] = [];

    for (let i = 0; i < steps[0].data.length; i++) {
        const element = steps[steps.length - 1].data[i];
        for (let j = i - 1; j >= 0; j--) {
            // add comparison
            steps.push(copyLast(steps));
            clearTempStack(tempStack, steps[steps.length - 1]);
            steps[steps.length - 1].data[j].color = Colors.COMPARE;
            steps[steps.length - 1].data[j + 1].color = Colors.COMPARE;
            steps[steps.length - 1].message = {content: `Comparing element ${j} and element ${j + 1}`, color: Colors.COMPARE};
            tempStack.push(j);
            tempStack.push(j + 1);

            // if element greater than j, swap j and j + 1
            if (steps[steps.length - 1].data[j].height > element.height) {
                steps.push(copyLast(steps));
                swap(steps[steps.length - 1].data, j, j + 1);
                steps[steps.length - 1].data[j].color = Colors.SWAP;
                steps[steps.length - 1].data[j + 1].color = Colors.SWAP;
                steps[steps.length - 1].message = {content: `Swapping element ${j} and element ${j + 1}`, color: Colors.SWAP};
            } else {
                break;
            }
        }
    }

    // update all elements to finished
    steps.push(copyLast(steps));
    steps[steps.length - 1].data.forEach((b) => b.color = Colors.FINISHED);
    steps[steps.length - 1].message = {content: "Finished", color: Colors.FINISHED};
}

const generateSelectionSteps = (steps: SortingStep[]) => {
    const tempStack: number[] = [];

    for (let i = 0; i < steps[0].data.length; i++) {
        let maxN = 0;
        let maxIdx = -1;

        // search for max and move it to back of array
        for (let j = 0; j < steps[0].data.length - i; j++) {
            steps.push(copyLast(steps));
            clearTempStack(tempStack, steps[steps.length - 1]);
            steps[steps.length - 1].message = {content: `Comparing element ${j} with max`, color: Colors.COMPARE};
            steps[steps.length - 1].data[j].color = Colors.COMPARE;
            tempStack.push(j);

            // check if it is new max
            if (steps[steps.length - 1].data[j].height > maxN) {
                steps.push(copyLast(steps));
                clearTempStack(tempStack, steps[steps.length - 1]);
                maxN = steps[steps.length - 1].data[j].height;
                if (maxIdx > -1)
                    steps[steps.length - 1].data[maxIdx].color = Colors.DEFAULT;
                maxIdx = j;
                steps[steps.length - 1].data[j].color = Colors.MAXIMUM;
                steps[steps.length - 1].message = {content: `Setting new max as element ${j}`, color: Colors.MAXIMUM};
            }
        }

        // move to back
        steps.push(copyLast(steps));
        clearTempStack(tempStack, steps[steps.length - 1]);
        swap(steps[steps.length - 1].data, maxIdx, steps[0].data.length - 1 - i);
        steps[steps.length - 1].message = {content: `Swapping element ${maxIdx} with element ${steps[0].data.length - 1 - i}`, color: Colors.SWAP};
        steps[steps.length - 1].data[maxIdx].color = Colors.SWAP;
        steps[steps.length - 1].data[steps[0].data.length - i - 1].color = Colors.SWAP;

        // set end as finished
        steps.push(copyLast(steps));
        steps[steps.length - 1].message = {content: `Element ${steps[0].data.length - 1} finished`, color: Colors.FINISHED};
        steps[steps.length - 1].data[maxIdx].color = Colors.DEFAULT;
        steps[steps.length - 1].data[steps[0].data.length - 1 - i].color = Colors.FINISHED;
    }
}

const merge = (tempStack: number[], steps: SortingStep[], l: number, m: number, r: number) => {
    let sizeL = m - l + 1;
    let sizeR = r - m;

    let k = l;
    
    while (sizeL > 0 && sizeR > 0) {
        steps.push(copyLast(steps));
        clearTempStack(tempStack, steps[steps.length - 1]);
        steps[steps.length - 1].message = {content: `Comparing element ${k} and element ${k + sizeL}`, color: Colors.COMPARE};
        steps[steps.length - 1].data[k].color = Colors.COMPARE;
        steps[steps.length - 1].data[k + sizeL].color = Colors.COMPARE;

        if (steps[steps.length - 1].data[k].height < steps[steps.length - 1].data[k + sizeL].height) {
            // left is smaller than right, move left element to kth index
            steps.push(copyLast(steps));
            steps[steps.length - 1].message = {content: `Element ${k} < element ${k + sizeL}, moving left element to start`, color: Colors.SWAP};
            steps[steps.length - 1].data = [
                ...steps[steps.length - 1].data.slice(0, k),
                steps[steps.length - 1].data[k],
                ...steps[steps.length - 1].data.slice(k + 1)
            ]
            steps[steps.length - 1].data[k].color = Colors.SWAP;
            steps[steps.length - 1].data[k + sizeL].color = Colors.DEFAULT;
            tempStack.push(k);
            sizeL--;
        } else {
            // right is <= left, move right element to kth index
            steps.push(copyLast(steps));
            steps[steps.length - 1].message = {content: `Element ${k + sizeL} <= element ${k}, moving right element to start`, color: Colors.SWAP};
            steps[steps.length - 1].data = [
                ...steps[steps.length - 1].data.slice(0, k),
                steps[steps.length - 1].data[k + sizeL],
                ...steps[steps.length - 1].data.slice(k, k + sizeL),
                ...steps[steps.length - 1].data.slice(k + sizeL + 1)
            ]
            steps[steps.length - 1].data[k].color = Colors.SWAP;
            steps[steps.length - 1].data[k + 1].color = Colors.DEFAULT;
            tempStack.push(k);
            sizeR--;
        }

        k++;
    }
}

const mergesort = (tempStack: number[], steps: SortingStep[], l: number, r: number) => {
    if (l >= r) return;

    const mid = Math.floor((l + r - 1) / 2);

    mergesort(tempStack, steps, l, mid);
    mergesort(tempStack, steps, mid + 1, r);

    merge(tempStack, steps, l, mid, r);
}

const generateMergeSteps = (steps: SortingStep[]) => {
    const tempStack: number[] = [];

    mergesort(tempStack, steps, 0, steps[0].data.length - 1);

    // finished
    steps.push(copyLast(steps));
    steps[steps.length - 1].data.forEach((b) => b.color = Colors.FINISHED);
    steps[steps.length - 1].message = {content: "Finished", color: Colors.FINISHED};
}

const partition = (tempStack: number[], steps: SortingStep[], l: number, r: number) => {
    let pivot = steps[steps.length - 1].data[r].height;

    steps.push(copyLast(steps));
    clearTempStack(tempStack, steps[steps.length - 1]);
    steps[steps.length - 1].message = {content: `Partitioning elements ${l} to ${r} with ${r} as pivot`, color: Colors.PARTITION};
    steps[steps.length - 1].data[r].color = Colors.PARTITION;

    let i = l - 1;
    for (let j = l; j < r; j++) {
        steps.push(copyLast(steps));
        clearTempStack(tempStack, steps[steps.length - 1]);
        steps[steps.length - 1].data[j].color = Colors.COMPARE;
        steps[steps.length - 1].message = {content: `Comparing element ${j} to pivot`, color: Colors.COMPARE};
        tempStack.push(j);

        if (steps[steps.length - 1].data[j].height < pivot) {
            // move element to i pointer
            i++;
            steps.push(copyLast(steps));
            steps[steps.length - 1].data[i].color = Colors.SWAP;
            steps[steps.length - 1].data[j].color = Colors.SWAP;
            steps[steps.length - 1].message = {content: `Element ${j} < pivot, swapping ${j} with ${i}`, color: Colors.SWAP};
            tempStack.push(i);

            swap(steps[steps.length - 1].data, i, j);
        }
    }

    // move pivot to correct location
    steps.push(copyLast(steps));
    clearTempStack(tempStack, steps[steps.length - 1]);
    steps[steps.length - 1].message = {content: `Moving pivot to correct location, swapping ${i + 1} and ${r}`, color: Colors.SWAP};
    steps[steps.length - 1].data[r].color = Colors.SWAP;
    steps[steps.length - 1].data[i + 1].color = Colors.SWAP;
    tempStack.push(i + 1);
    tempStack.push(r);
    swap(steps[steps.length - 1].data, i + 1, r);

    return i + 1;
}

const quicksort = (tempStack: number[], steps: SortingStep[], l: number, r: number) => {
    if (l >= r) return;

    const pIdx: number = partition(tempStack, steps, l, r);

    // recursive calls to left and right halves
    quicksort(tempStack, steps, l, pIdx - 1);
    quicksort(tempStack, steps, pIdx + 1, r);
}

const generateQuickSteps = (steps: SortingStep[]) => {
    const tempStack: number[] = [];

    quicksort(tempStack, steps, 0, steps[0].data.length - 1);

    // finished, add as step
    steps.push(copyLast(steps));
    steps[steps.length - 1].message = {content: "Finished", color: Colors.FINISHED};
    steps[steps.length - 1].data.forEach((b) => b.color = Colors.FINISHED);
}

const algorithmGenerators: {[name in SortingAlgorithms]: (steps: SortingStep[]) => void} = {
    0: generateBubbleSteps,
    1: generateOptimizedBubbleSteps,
    2: generateInsertionSteps,
    3: generateSelectionSteps,
    4: generateMergeSteps,
    5: generateQuickSteps
}

const generateHeights = (min: number, max: number, numElements: number) => {
    const out: SortingBlock[] = [];
    for (let i = 0; i < numElements; i++) {
        out.push({ color: Colors.DEFAULT, height: Math.floor(Math.random() * (max - min + 1) + min), id: `el-${i}` });
    }

    return out;
}

const generateSteps = (algo: SortingAlgorithm, min: number, max: number, numElements: number) => {
    const steps: SortingStep[] = [{data: generateHeights(min, max, numElements), message: { content: "Start", color: Colors.DEFAULT }}];
    algorithmGenerators[SortingAlgorithms[algo]](steps);

    return steps;
}

export const SortingFactory = {
    generateHeights,
    generateSteps,
}