import { Link, Outlet } from 'react-router-dom';
import './layout.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function Layout() {
	const user = useSelector((state: RootState) => state.common.user);

	return (
		<div className='layout__container'>
			<div className='layout__gnb'>
				<h1 className='layout__title'>Todo app</h1>
				<div className=''>
					<Link className='layout__link' to='/'>
						home
					</Link>
					<Link className='layout__link' to='/about'>
						about
					</Link>
					{user ? (
						<Link className='layout__link' to='/protected'>
							{user.username}
						</Link>
					) : (
						<Link className='layout__link' to='/login'>
							Login
						</Link>
					)}
				</div>
			</div>
			<Outlet />
		</div>
	);
}
