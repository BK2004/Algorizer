export enum Colors {
    DEFAULT,
    COMPARE,
    SWAP,
    PARTITION,
    FINISHED
}

export type ColorMap = {[color in Colors]: string};

export const BackgroundColorMap: ColorMap = {
    0: "bg-blue-500",
    1: "bg-purple-500",
    2: "bg-green-500",
    3: "bg-orange-500",
    4: "bg-blue-400",
}

export const TextColorMap: ColorMap = {
    0: "text-blue-500",
    1: "text-purple-500",
    2: "text-green-500",
    3: "text-orange-500",
    4: "text-blue-400"
}