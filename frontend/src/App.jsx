import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TransactionPage from './pages/TransactionPage';
import NotFoundPage from './pages/NotFoundPage';
import BackgroundBeams from './components/ui/BackgroundBeams';
import RootLayout from './components/layouts/RootLayout';
import AuthLayout from './components/layouts/AuthLayout';

function App() {
  return (
    <main className='h-full'>
      <BackgroundBeams className='absolute inset-0 z-0' />
      <div className='relative z-10'>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup' element={<SignupPage />} />
          </Route>

          <Route element={<RootLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/transaction/:id' element={<TransactionPage />} />
          </Route>

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </div>
      <Toaster />
    </main>
  );
}

export default App;
