import { Link, Outlet } from 'react-router-dom';
import './layout.css';

export default function Layout() {
	return (
		<div className='layout__container'>
			<div className='layout__gnb'>
				<h1 className='layout__title'>Todo app</h1>
				<div className=''>
					<Link className="layout__link" to='/'>home</Link>
					<Link className="layout__link" to='/about'>about</Link>
				</div>
			</div>
			<Outlet />
		</div>
	);
}
