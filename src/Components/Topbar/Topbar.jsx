import Menu from "../Menu/Menu";
import SearchForm from "../SearchForm/SearchForm";
import './Topbar.css';

const Topbar = () => {
  return (
    <div className="container">
      <header id="topbar">
        <SearchForm />
        <Menu />
      </header>
    </div >
  )
}
export default Topbar;