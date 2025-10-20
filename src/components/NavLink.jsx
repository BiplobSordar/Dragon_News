import React from 'react'
import { Link } from 'react-router-dom';

const NavLink = ({ to, children })=> {
    return (
        <Link to={to} className="text-sm  hover:text-slate-900">
            {children}
        </Link>
    
    );
}

export default NavLink