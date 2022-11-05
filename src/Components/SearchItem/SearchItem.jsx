import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../App';
import { formattingAddress } from '../../utils/data_utils';
import './SearchItem.css';

const SearchItem = ({ item }) => {
  const { search } = useContext(Context);
  return (
    <Link
      to={
        item.name ?
          `../weather/${item.name.toLowerCase().replace(' ', '-')}`
          :
          `../weather/${item.state.toLowerCase().replace(' ', '-')}`
      }
      onClick={() => search.setFound(item)}
      className="search-item"
    >
      <div className="search-item-title">{item.name}</div>
      {
        (item.state || item.district || item.country)
        &&
        <div className="search-item-additional">{formattingAddress(item.country, item.state, item.district)}</div>
      }
    </Link>
  )
}
export default SearchItem;