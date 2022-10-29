class Search {
  constructor() {
    this._searchValue = 'Search something...';
  }
  set searchValue(value) { this._searchValue = value; }
  get searchValue() { return this._searchValue; }
}
export default Search;