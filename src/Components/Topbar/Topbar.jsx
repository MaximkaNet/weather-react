import Menu from "../Menu/Menu";
import SearchForm from "../SearchForm/SearchForm";
import './Topbar.css';

const Topbar = () => {
  return (
    <header className="topbar">
      <div className="topbar-content">
        <SearchForm />
        <Menu />
      </div>
    </header>
  )
}
export default Topbar;