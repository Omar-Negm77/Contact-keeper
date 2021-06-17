import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import authContext from './../../context/auth/authContext';
import ContactContext from '../../context/contacts/contactContext';

const Navbar = ({ title, icon }) => {
	const { isAuthenticated, logout, user } = useContext(authContext);
	const { clearContacts } = useContext(ContactContext);
	const onLogOut = () => {
		logout();
		clearContacts();
	};
	const authLinks = (
		<Fragment>
			<li>
				{/* {user && user.name} this is a if statement to check if there is a user so display his name */}
				Hello {user && user.name}
				<a onClick={onLogOut} href='#!'>
					<i className='fas fa-sign-out-alt'></i>
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</Fragment>
	);
	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>Register</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
			{/* <li>
				<Link to='/'>Home</Link>
			</li> */}
			<li>
				<Link to='/about'>About</Link>
			</li>
		</Fragment>
	);
	return (
		<div className='navbar bg-primary'>
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>{isAuthenticated ? authLinks : guestLinks}</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string,
	icon: PropTypes.string,
};
Navbar.defaultProps = {
	title: 'Contact Keeper',
	icon: 'fas fa-id-card-alt',
};
export default Navbar;
