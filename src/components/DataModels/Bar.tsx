const Bar = ({ height, maxHeight }: { height: number, maxHeight: number }) => {
    return <div className="flex-1 bg-orange-500 odd:bg-orange-600 transition-all duration-300 ease-in-out" style={{"height": height/(maxHeight + 2) * 100 + "%"}}></div>
}

export default Bar;