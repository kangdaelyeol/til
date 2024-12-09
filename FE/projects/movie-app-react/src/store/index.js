import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './moviesSlice'
import chatbotSlice from './chatbotSlice'
export const store = configureStore({
    reducer: {
        movies: moviesSlice,
        chatbot: chatbotSlice,
    },
})
