import { useDispatch, useSelector } from 'react-redux'
import { searchMovieThunk } from '../store/moviesSlice'

export default function useMovirListMore() {
    const dispatch = useDispatch()
    const { keyword, page } = useSelector((state) => state.movies)

    const searchMovieMore = () => {
        dispatch(searchMovieThunk({ keyword, page: page + 1 }))
    }

    return { searchMovieMore }
}
