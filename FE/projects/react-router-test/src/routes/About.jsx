import { Outlet, useNavigate, NavLink } from 'react-router-dom'

const About = () => {
    const navigate = useNavigate()
    return (
        <div>
            <h1>About Page!</h1>
            <button onClick={() => navigate('/')}>goHome</button>
            <NavLink
                to="me"
                style={({ isActive }) => ({
                    fontSize: isActive ? '40px' : '15px',
                    color: isActive ? 'red' : 'white',
                })}
            >
                me!
            </NavLink>
            <Outlet />
        </div>
    )
}

export default About
