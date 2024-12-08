import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { callMovieInfo } from '../api'

export const searchMovieThunk = createAsyncThunk(
    'movies/searchMovieThunk',
    async ({ keyword, page }) => {
        const res = await callMovieInfo({
            keyword,
            page,
        })
        return res.data
    },
)

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movieList: [],
        page: 1,
        message: '',
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchMovieThunk.pending, (state) => {
                state.loading = true
                state.movieList = []
            })
            .addCase(searchMovieThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.Error) {
                    state.message = action.payload.Error
                    state.page = 1
                    state.movieList = []
                } else {
                    state.message = ''
                    state.page = 1
                    state.movieList = action.payload.Search
                }
            })
    },
})

export default moviesSlice.reducer
