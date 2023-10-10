const Bar = ({ height, maxHeight, color = "bg-orange-500" }: { height: number, maxHeight: number, color?: string }) => {
    return <div className={`flex-1 ${color} border-x-[1px] border-gray-100 dark:border-neutral-850`} style={{"height": height/(maxHeight + 2) * 100 + "%"}}></div>
}

export default Bar;