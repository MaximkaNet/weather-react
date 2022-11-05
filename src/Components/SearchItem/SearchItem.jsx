import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../App';
import { formatSearchValue_place_id, formattingAddress as formatAddress } from '../../utils/data_utils';
import './SearchItem.css';

const SearchItem = ({ item }) => {
  const { search } = useContext(Context);
  return (
    <Link
      to={
        item.name ?
          `../weather/${formatSearchValue_place_id(item.name.toLowerCase(), item.place_id)}`
          :
          `../weather/${formatSearchValue_place_id(item.state.toLowerCase(), item.place_id)}`
      }
      onClick={() => search.setFound(item)}
      className="search-item"
    >
      <div className="search-item-title">{item.name}</div>
      {
        (item.state || item.district || item.country)
        &&
        <div className="search-item-additional">{formatAddress(item.country, item.state, item.district)}</div>
      }
    </Link>
  )
}
export default SearchItem;