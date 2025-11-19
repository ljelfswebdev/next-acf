import './globals.css';
import dynamic from 'next/dynamic';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer';

const ToasterClient = dynamic(
  () => import('react-hot-toast').then(m => m.Toaster),
  { ssr: false }
);

export const metadata = {
  title: 'Brochure CMS'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="">
          {children}
        </main>
        <Footer />
        <ToasterClient position="top-right" />
      </body>
    </html>
  );
}
