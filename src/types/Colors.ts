export enum Colors {
    DEFAULT,
    COMPARE,
    SWAP,
    PARTITION,
    FINISHED,
    EARLY_EXIT,
    MAXIMUM,
    START,
    TARGET,
    WALL,
}

export type ColorMap = {[color in Colors]: string};

export const BackgroundColorMap: ColorMap = {
    0: "bg-blue-500",
    1: "bg-purple-500",
    2: "bg-green-500",
    3: "bg-orange-500",
    4: "bg-blue-400",
    5: "bg-yellow-500",
    6: "bg-yellow-500",
    7: "bg-green-500",
    8: "bg-red-500",
    9: "bg-purple-700",
}

export const TextColorMap: ColorMap = {
    0: "text-blue-500",
    1: "text-purple-500",
    2: "text-green-500",
    3: "text-orange-500",
    4: "text-blue-400",
    5: "text-yellow-500",
    6: "text-yellow-500",
    7: "text-green-500",
    8: "text-red-500",
    9: "text-purple-700",
}

export const BorderColorMap: ColorMap = {
    0: "border-blue-500",
    1: "border-purple-500",
    2: "border-green-500",
    3: "border-orange-500",
    4: "border-blue-400",
    5: "border-yellow-500",
    6: "border-yellow-500",
    7: "border-green-500",
    8: "border-red-500",
    9: "border-purple-700",
}