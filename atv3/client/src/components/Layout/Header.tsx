import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Poções e Soluções</h1>
          <span className="founded">Est. 1867</span>
        </div>
        <nav className="nav">
          <Link to="/" className="nav-link">Loja</Link>
          <Link to="/admin" className="nav-link">Administração</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
