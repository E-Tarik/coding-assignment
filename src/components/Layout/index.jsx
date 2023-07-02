import { Header } from './components/Header';

const Layout = ({ children, searchMovies, searchParams, setSearchParams }) => (
  <div className="App">
    <Header
      searchMovies={searchMovies}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    />

    <div className="container">{children}</div>
  </div>
);

export { Layout };
