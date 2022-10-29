import { Link } from 'react-router-dom';
import Search from './Components/Search/Search';
import Weather from './Components/Weather/Weather';

export const routes = [
  {
    to: '/',
    component: <div>
      <div>Home</div>
      <Link to="/weather/" style={{ color: '#fff' }}>Go to weather</Link>
    </div>
  },
  {
    to: '/weather/:choice',
    component: <Weather />
  },
  {
    to: '/weather',
    component: <Weather />
  },
  {
    to: '/search/:name',
    component: <Search />
  },
  {
    to: '/search',
    component: <Search />
  },
  {
    to: '*',
    component: <div>
      <div>Oops... Page not found</div>
      <Link to="/" style={{ color: '#fff' }}>Go to home</Link>
    </div>
  }
]