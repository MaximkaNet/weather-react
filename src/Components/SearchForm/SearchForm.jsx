import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import loupeWhite from '../../img/loupe-white.png';
import './SearchForm.css';

const SearchForm = () => {
  const { search } = useContext(Context);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');

  const change = (event) => {
    let input = event.target.value;
    setInputValue(input);
  }
  const submit = (event) => {
    event.preventDefault();
    if (inputValue !== '')
      search.setSearchValue(inputValue);
    navigate(`/search/${inputValue.toLowerCase().replace(' ', '-')}`);
  }
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (inputValue != '') {
        navigate(`/search/${inputValue.toLowerCase().replace(' ', '-')}`);
        search.setSearchValue(inputValue);
      }
    }, 800)
    return () => clearTimeout(delayDebounceFn)
  }, [inputValue])
  return (
    <form className="searchForm" onSubmit={submit}>
      <input
        type="text"
        name="search"
        autoComplete="off"
        className="searchInput"
        onChange={change}
        value={inputValue}
        placeholder={search.searchValue}
      />
      {/* <button type="submit" className="send">
        <img src={loupeWhite} alt={loupeWhite.name} />
      </button> */}
    </form>
  )
}

export default SearchForm;