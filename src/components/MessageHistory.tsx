import { useState } from "react";
import { type Message } from "../types/Messages";
import { BorderColorMap, TextColorMap } from "../types/Colors";

const MessageHistory = ({messages}: {messages: Message[]}) => {
    const [visible, setVisible] = useState(false);

    return <div className={`fixed ${visible ? "left-0" : "-left-[410px]"} bottom-0 h-[300px] w-[440px] flex justify-between`}>
        <div className="message-display bg-white dark:bg-neutral-800 h-full flex-1 p-2 overflow-y-auto">
            {messages.map((m, i) => {
                return <>
                    <div className={`border-l-4 ${TextColorMap[m.color]} ${BorderColorMap[m.color]} h-[65px] w-full mb-2 last:mb-0 flex flex-col justify-center p-2`}><p>{m.content}</p></div>
                </>
            })}
        </div>
        <button onClick={() => setVisible(!visible)} className="toggle-messages bg-white dark:bg-neutral-800 h-full ml-2 w-[30px]">{visible ? "<" : ">"}</button>
    </div>
}

export default MessageHistory;