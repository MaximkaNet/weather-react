import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SearchItem from '../SearchItem/SearchItem';
import { getPlaces } from '../../services/placeService';
import './Search.css';
import Loader from '../Loader/Loader';
import { Context } from '../../App';

const Search = () => {
  const { name } = useParams();

  const { search } = useContext(Context);

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    if (name != undefined)
      search.setSearchValue(name.replace('-', ' '));
  })

  useEffect(() => {
    if (name != null) {
      setLoading(true);
      (async () => {
        const placesInfo = await getPlaces(name);
        setResults(placesInfo);
        setLoading(false);
      })()
    }
    return () => setLoading(false);
  }, [name])
  return (
    <div className="container">
      {
        loading ?
          <div className="loading">
            <Loader />
          </div>
          :
          results != null && results.length !== 0 ?
            <div className="search">
              {
                results.map((item, i) => <SearchItem key={i} item={item} />)
              }
            </div>
            :
            <div className="search-not-found">Not found</div>
      }
    </div>
  )
}
export default Search;