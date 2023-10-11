import { useEffect, useState } from "react";
import { SortingAlgorithms, SortingAlgorithm, type SortingStep } from "../../types/Sorting";
import BarGraph from "../DataModels/BarGraph";
import { SortingFactory } from "../../scripts/Sorting";
import PlayBar from "./PlayBar";
import MessageHistory from "../MessageHistory";

const SortingView = () => {
    const [maxHeight, setMaxHeight] = useState<number>(5);
    const [numElements, setNumElements] = useState<number>(5);
    const [algorithm, setAlgorithm] = useState<SortingAlgorithm>("Bubble Sort");
    const [steps, setSteps] = useState<SortingStep[]>([]);
    const [step, setStep] = useState<number>(0);
    const [playSpeed, setPlaySpeed] = useState<number>(3);
    const [playing, setPlaying] = useState<boolean>(false);
    
    // Generate steps on start
    useEffect(() => {
        setSteps(SortingFactory.generateSteps(algorithm, 1, maxHeight, numElements));
        setStep(0);
        setPlaying(false);
    }, [maxHeight, numElements, algorithm]);

    // Start playing steps using playSpeed when playing turns true
    useEffect(() => {
        if (playing) {
            const intervalId = setInterval(() => {
                // Go to next step
                setStep((old) => {
                    if (old === steps.length - 1) {
                        setPlaying(false);
                        return old;
                    }

                    return old + 1;
                });
            }, 500/(playSpeed >= 3 ? 3**(playSpeed - 3) : 1.4**(playSpeed - 3)));

            return () => { clearInterval(intervalId); }
        }
    }, [playing, playSpeed, steps]);

    if (steps.length === 0) return (<></>);
    
    return <>
        <div className="sorting-view w-[90%] max-w-[800px] flex-1 flex flex-col justify-start px-4">
            <div className="top-bar py-2 w-full flex gap-3 justify-between">
                <select value={algorithm} onChange={(val) => { 
                        setAlgorithm(val.target.value as SortingAlgorithm); 
                    }
                    } className="bg-white dark:bg-neutral-900 rounded-md border-0 outline-0 py-1 px-2">
                    {Object.keys(SortingAlgorithms).filter((val) => isNaN(Number(val))).map((val) => {
                        return <option key={`option-${val}`} value={val}>{val}</option>
                    })}
                </select>
                <PlayBar playing={playing} setPlay={setPlaying} currStep={step} maxStep={steps.length - 1} setStep={setStep} />
            </div>
            <div className="graph-container w-full h-[600px]">
                <BarGraph data={steps[step].data} maxHeight={maxHeight} />
            </div>
            <div className="bottom-bar w-full flex gap-3">
                <span>Speed:</span>
                <input type="range" value={playSpeed} onMouseDown={() => setPlaying(false)} onChange={(e) => setPlaySpeed(Number(e.target.value))} className="border-2 border-white dark:border-neutral-800 appearance-none cursor-pointer bg-white dark:bg-neutral-800 rounded-lg" max={7} min={1}></input>
                <span>Size:</span>
                <input type="range" value={numElements} onMouseDown={() => setPlaying(false)} onChange={(e) => {setNumElements(Number(e.target.value)); setMaxHeight(Number(e.target.value));}} className="border-2 border-white dark:border-neutral-800 appearance-none cursor-pointer bg-white dark:bg-neutral-800 rounded-lg" max={100} min={5}></input>
                <button className="cursor-pointer bg-transparent underline-offset-2 underline ml-auto text-blue-500" onClick={() => { setStep(0); setSteps(SortingFactory.generateSteps(algorithm, 1, maxHeight, numElements))}}>shuffle</button>
            </div>
        </div>
        <MessageHistory messages={steps.filter((m, i) => i <= step && i >= step - 3).map((m) => {
            return m.message;
        })} />
    </>
}

export default SortingView;