import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Poções e Soluções</h1>
          <span className="founded">Est. 1867</span>
        </div>
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Loja
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Administração
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
