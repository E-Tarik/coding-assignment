import { Routes, Route } from 'react-router-dom';
import { Main } from './pages/main';
import { Starred } from './pages/starred';
import { WatchLater } from './pages/watch-later';
import { Layout } from './components/Layout';
import './app.scss';

const App = () => (
  <Layout>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/starred" element={<Starred />} />
      <Route path="/watch-later" element={<WatchLater />} />
      <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
    </Routes>
  </Layout>
);

export default App;
