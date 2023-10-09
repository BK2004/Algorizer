const PlayBar = ({playing, currStep, maxStep, setPlay, setStep}: {playing: boolean, currStep: number, maxStep: number, setPlay: (toggle: boolean) => void, setStep: (step: number) => void}) => {
    return <div className="play-buttons flex-1 justify-end flex gap-3 text-4xl items-center">
        <input type="range" value={currStep} onMouseDown={() => setPlay(false)} onChange={(e) => setStep(Number(e.target.value))} className="border-2 border-white dark:border-neutral-800 flex-1 appearance-none cursor-pointer bg-white dark:bg-neutral-800 rounded-lg" max={maxStep} min={0}></input>
        <button disabled={currStep === 0} className="disabled:opacity-40 transition-all duration-150 ease-in-out" onClick={() => {setPlay(false); setStep(0)}}>⏮︎</button>
        <button disabled={playing || currStep === maxStep} className="disabled:opacity-40 transition-all duration-150 ease-in-out text-green-500" onClick={() => {if (currStep !== maxStep) setPlay(true)}}>⏵</button>
        <button disabled={!playing} className="disabled:opacity-40 transition-all duration-150 ease-in-out text-yellow-500" onClick={() => setPlay(false)}>⏸</button>
    </div>
}

export default PlayBar;