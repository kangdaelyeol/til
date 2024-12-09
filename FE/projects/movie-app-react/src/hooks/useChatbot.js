import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function useChatbot() {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const state = useSelector((state) => state.chatbot)

    const handleChatInput = (e) => {
        dispatch(updateChatMessage({ message: e.target.value }))
    }

    const handleSubmitMessage = () => {
        dispatch(sendChatbotMessageThunk({ message: state.message }))
    }

    const handleVisible = () => {
        setVisible((pre) => !pre)
    }

    return { visible, handleChatInput, handleSubmitMessage, handleVisible, state }
}
