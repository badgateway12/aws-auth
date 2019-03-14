import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaPencilAlt } from 'react-icons/fa';
import * as routes from '../../constants/routes';

export const Navbar: React.FunctionComponent<{}> = () =>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <Link className="navbar-brand" to="/">Landing</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to={routes.SIGN_IN}><FaSignInAlt /> SignIn</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={routes.SIGN_UP}><FaPencilAlt /> SignUp</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={routes.SIGN_OUT}><FaSignOutAlt /> SignOut</Link>
          </li>
        </ul>
      </div>
    </nav>;

Navbar.displayName = 'Navbar';

