import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo">
          <span className="header-logo-icon" aria-hidden="true">
            ✔
          </span>
        </div>
        <div>
          <h1 className="header-title">TaskList Pro</h1>
          <p className="header-subtitle">Stay organised, get things done.</p>
        </div>
      </div>
    </header>
  );
}

export default Header;
