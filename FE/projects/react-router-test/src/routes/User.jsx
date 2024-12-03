import { useParams, useSearchParams } from 'react-router-dom'

const User = () => {
    const { id } = useParams()
    const [search, setSearch] = useSearchParams()
    const query = search.get('q')
    return (
        <div>
            <h1>
                {' '}
                User Page!
                <br />
                id: {id || 'noID'}
                <br />
                {query || 'noSearch'}
                <button onClick={() => setSearch({ q: 'changed' })}>
                    {' '}
                    change!
                </button>
            </h1>
        </div>
    )
}

export default User
