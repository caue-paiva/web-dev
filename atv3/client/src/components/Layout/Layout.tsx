import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { NotificationProvider } from '../../contexts/NotificationContext';
import NotificationContainer from '../Notification/NotificationContainer';

const Layout = () => {
  return (
    <NotificationProvider>
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
        <NotificationContainer />
      </div>
    </NotificationProvider>
  );
};

export default Layout;
