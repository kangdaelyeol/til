import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { callOpenAI } from '../api'

export const sendChatbotMessageThunk = createAsyncThunk(
    'chatbot/sendChatbotMessageThunk',
    async ({ message }) => {
        console.log(message)
        const data = await callOpenAI({ role: 'user', content: message })

        return data
    },
)

const chatbotSlice = createSlice({
    name: 'chatbot',
    initialState: {
        messages: [
            {
                role: 'assistant',
                content: '좋아하는 영화 장르나 제목을 알려주세요',
            },
        ],
        loading: false,
        message: '',
    },
    reducers: {
        updateChatMessage: (state, action) => {
            state.message = action.payload.message
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendChatbotMessageThunk.pending, (state) => {
                state.loading = true
                state.messages.push({
                    role: 'user',
                    content: state.message,
                })
                state.message = ''
            })
            .addCase(sendChatbotMessageThunk.fulfilled, (state, action) => {
                state.loading = false
                state.messages.push(action.payload)
            })
    },
})

export const { updateChatMessage } = chatbotSlice.actions

export default chatbotSlice.reducer
