import { useDispatch, useSelector } from 'react-redux'
import { searchMovieThunk, updateKeyword } from '../store/moviesSlice'

export default function useSearch() {
    const state = useSelector((state) => state.movies)
    const dispatch = useDispatch()
    const searchMovie = () => {
        dispatch(searchMovieThunk({ keyword: state.keyword, page: 1 }))
    }

    const changeKeyword = (e) => {
        dispatch(updateKeyword({ keyword: e.target.value }))
    }

    return { searchMovie, changeKeyword, value: state.keyword}
}
