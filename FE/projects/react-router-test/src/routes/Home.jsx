import { Suspense } from 'react'
import { Await, useLoaderData } from 'react-router-dom'

const Home = () => {
    const data = useLoaderData()
    return (
        <div>
            <h1>Home Page!</h1>
            <Suspense>
                <Await resolve={data.data}>{(solved) => <p>{solved}</p>}</Await>
            </Suspense>
        </div>
    )
}

export default Home
