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
        maxPage: 0,
        message: '',
        loading: false,
        keyword: '',
    },
    reducers: {
        updateKeyword: (state, action) => {
            state.keyword = action.payload.keyword
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchMovieThunk.pending, (state, action) => {
                if (action.meta.arg.page === 1) state.movieList = []
                state.loading = true
            })
            .addCase(searchMovieThunk.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.Error) {
                    state.message = action.payload.Error
                    state.page = action.meta.arg.page
                    state.maxPage = 0
                    state.movieList = []
                } else {
                    state.message = ''
                    state.page = action.meta.arg.page
                    state.movieList.push(...action.payload.Search)
                    state.maxPage = Math.ceil(
                        Number(action.payload.totalResults) / 10,
                    )
                }
            })
    },
})

export const { updateKeyword } = moviesSlice.actions

export default moviesSlice.reducer
