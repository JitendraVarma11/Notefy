import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { NotesPage } from './Pages/NotesPage';
import { Settings } from './pages/Settings';
import { NotesProvider } from './context/NotesProvider';

const App = () => {
    return (
      <NotesProvider>
          <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<NotesPage />} />
            <Route path="settings" element={<Settings/>} />
          </Route>
          </Routes>
      </NotesProvider>
    );
  };

export default App
