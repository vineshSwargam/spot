import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Spot',
  description: 'Discover & Share Your Music',
};

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient' />
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Layout;
