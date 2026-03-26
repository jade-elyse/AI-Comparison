import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-logo" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
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
