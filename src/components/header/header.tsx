import { ChangeEvent, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { moviesSelector } from 'redux/selectors';

import './header.scss';

type Props = {
  searchMovies: (val: string) => void;
};

const Header = ({ searchMovies }: Props) => {
  const { pathname } = useLocation();
  const favorites = useSelector(moviesSelector.selectFavorites);

  const [value, setValue] = useState<string>('');

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValue(value);
    searchMovies(value);
  };

  const handleClickHomeLink = () => {
    setValue('');

    if (pathname !== '/watch-later' && pathname !== '/starred') {
      searchMovies('');
    }
  };

  return (
    <header>
      <Link to='/' data-testid='home' onClick={handleClickHomeLink}>
        <i className='bi bi-film' />
      </Link>

      <nav>
        <NavLink
          to='/starred'
          data-testid='nav-starred'
          className='nav-starred'
        >
          {favorites.length > 0 ? (
            <>
              <i className='bi bi-star-fill bi-star-fill-white' />
              <sup className='star-number'>{favorites.length}</sup>
            </>
          ) : (
            <i className='bi bi-star' />
          )}
        </NavLink>
        <NavLink to='/watch-later' className='nav-fav'>
          watch later
        </NavLink>
      </nav>

      <div className='input-group rounded'>
        <input
          type='search'
          data-testid='search-movies'
          className='form-control rounded'
          placeholder='Search movies...'
          aria-label='Search movies'
          aria-describedby='search-addon'
          value={value}
          onChange={(e) => handleChangeInput(e)}
        />
      </div>
    </header>
  );
};

export default Header;
