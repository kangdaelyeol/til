import React from 'react'
import { useDispatch } from 'react-redux'
import className from 'classnames'

import { updateKeyword } from '../store/moviesSlice'
import useChatbot from '../hooks/useChatbot'

const ContentRenderer = ({ content }) => {
    const dispatch = useDispatch()
    const contentList = []
    const regExp = /{{(.*?)\/\/(.*?)}}/g
    let match
    let startIndex = 0

    while ((match = regExp.exec(content)) !== null) {
        const [fullMatch, ko, en] = match
        if (startIndex < match.index)
            contentList.push(content.slice(startIndex, match.index))
        contentList.push(
            <span
                key={fullMatch}
                className="cursor-pointer text-color-primary hover:underline"
                onClick={() => dispatch(updateKeyword({ keyword: en }))}
            >
                {ko}
            </span>,
        )
        startIndex = regExp.lastIndex
    }
    contentList.push(content.slice(startIndex))

    return <>{contentList}</>
}

export default function Chatbot() {
    const {
        visible,
        handleChatInput,
        handleSubmitMessage,
        handleVisible,
        state,
    } = useChatbot()

    return (
        <div className="chatbot">
            <div
                className={className(
                    'chats max-w-[450px] border-solid border-[1px] border-color-black rounded-[20px_20px_4px_20px] bg-color-area fixed right-[20px] z-[1] duration-[0.3s]',
                    {
                        'visible opacity-1': visible,
                        'opacity-0 invisible': !visible,
                    },
                )}
            >
                <ul className="max-h-[500px] px-[20px] pt-[60px] pb-[20px] flex flex-col overflow-auto gap-[14px]">
                    {state.messages.map((msg) => (
                        <li
                            key={msg.content}
                            className={className(
                                'relative max-w-[70%] py-[12px] px-[18px] rounded-[20px] text-[15px] font-medium',
                                {
                                    [assistantClass]: msg.role === 'assistant',
                                    [userClass]: msg.role === 'user',
                                },
                            )}
                        >
                            {msg.role === 'assistant' ? (
                                <div className="assistant-photo flex justify-center items-center absolute left-[-10px] w-[40px] h-[40px] rounded-[50%] bg-color-white-5">
                                    <span className="material-symbols-outlined">
                                        smart_toy
                                    </span>
                                </div>
                            ) : (
                                ''
                            )}
                            {<ContentRenderer content={msg.content} />}
                        </li>
                    ))}
                    {state.loading ? (
                        <li className="relative max-w-[70%] py-[12px] px-[18px] rounded-[20px] text-[15px] font-medium self-start rounded-tl-[4px] bg-color-white-5">
                            <div className="assistant-photo flex justify-center items-center absolute left-[-10px] w-[40px] h-[40px] rounded-[50%] bg-color-white-5">
                                <span className="material-symbols-outlined">
                                    smart_toy
                                </span>
                            </div>
                            <div className="w-[13px] h-[13px] border-[3px] animate-spin"></div>
                        </li>
                    ) : (
                        ''
                    )}
                </ul>
                <div className="px-[20px] pt-[14px] pb-[20px] border-t-[1px] border-t-solid border-t-color-white-5 flex gap-[10px]">
                    <input
                        onChange={handleChatInput}
                        value={state.message}
                        className="grow py-0 px-[20px] rounded-[4px_4px_4px_10px] text-[14px] text-color-white bg-color-white-5"
                    />
                    <button
                        onClick={handleSubmitMessage}
                        className="btn btn-primary"
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
            <div
                onClick={() => handleVisible()}
                className="btn btn-circle chat-starter fixed z-1"
            >
                <span className="material-symbols-outlined">
                    {visible ? 'close' : 'chat'}
                </span>
            </div>
        </div>
    )
}

const assistantClass = 'self-start rounded-tl-[4px] bg-color-white-5'

const userClass = 'self-end border-br-[4px] bg-color-primary text-color-black'
