import { Header } from './components/Header';

const Layout = ({ children }) => (
  <div className="App">
    <Header />
    <div className="container">{children}</div>
  </div>
);

export { Layout };
