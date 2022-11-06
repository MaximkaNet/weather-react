import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

import { formatSearchValue } from "../../utils/data_utils";
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
    navigate(`/search/${formatSearchValue(inputValue)}`);
  }
  useEffect(() => {
    const searchDelay = setTimeout(() => {
      if (inputValue !== '') {
        search.setSearchValue(inputValue);
        navigate(`/search/${formatSearchValue(inputValue)}`);
      }
    }, 800)
    return () => clearTimeout(searchDelay);
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
    </form>
  )
}

export default SearchForm;