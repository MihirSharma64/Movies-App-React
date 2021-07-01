import React from 'react';
import '../Styles/nav.css';
import {Link} from 'react-router-dom';

function Nav() {
	return (
		<nav className="bg-dark mb-4">
			<h1 className="mt-2 mb-3">MoviesApp</h1>
			<ul className="list mt-3 mb-3">
				{/* jaise anchor tags mei href hota hai,inme to tag hota hai */}
				{/* Link routing mei anchor tags ke jagah use hote hai */}
				<Link className="btn bg-light" to="/">
					<li>Home</li>
				</Link>
				<Link className="btn bg-light" to="/movies">
					<li>Movies</li>
				</Link>
				<Link className="btn bg-light" to="/about">
					<li>About</li>
				</Link>
			</ul>
		</nav>
	);
}

export default Nav;
