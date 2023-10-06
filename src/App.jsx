import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { DarkModeProvider } from './context/DarkModeContext'
import Account from './pages/Account'
import BookingDetails from './pages/BookingDetails'
import Bookings from './pages/Bookings'
import Cabins from './pages/Cabins'
import Checkin from './pages/Checkin'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Settings from './pages/Settings'
import Users from './pages/Users'
import GlobalStyles from './styles/GlobalStyles'
import AppLayout from './ui/AppLayout'
import ProtectedRoute from './ui/ProtectedRoute'

const queryClient = new QueryClient({})

const App = () => {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to='dashboard' />} />
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='bookings' element={<Bookings />} />
              <Route path='booking/:bookingId' element={<BookingDetails />} />
              <Route path='checkin/:bookingId' element={<Checkin />} />
              <Route path='cabins' element={<Cabins />} />
              <Route path='users' element={<Users />} />
              <Route path='settings' element={<Settings />} />
              <Route path='account' element={<Account />} />
            </Route>
            <Route path='login' element={<Login />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster
          position='top center'
          gutter={12}
          containerStyle={{ margin: '8px' }}
          toastOptions={{
            success: {
              duration: 3000
            },
            error: {
              duration: 4000
            },
            style: {
              fontSize: '16px',
              maxWidth: '500px',
              padding: '16px 24px',
              backgroundColor: 'var(--color-grey-0)',
              color: 'var(--color-grey-700)'
            }
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App

// import styled from 'styled-components';
// import GlobalStyles from './styles/GlobalStyles';
// import Button from './ui/Button';
// import Input from './ui/Input';
// import Heading from './ui/Heading';
// import Row from './ui/Row';

// const StyledApp = styled.main`

// `

// function App() {

//   return (
//     <>
//       <GlobalStyles />
//       <StyledApp>
//         <Row>
//           <Row type='horizontal'>
//             <Heading as='h1'>Hello</Heading>
//             <div>
//               <Button>Check In</Button>
//               <Button variation='secondary' size='small'>Check Out</Button>
//             </div>
//           </Row>
//           <Row>
//             <Heading as='h2'>Hello</Heading>
//             <form>
//               <Input type='number' placeholder='Number of guests'></Input>
//             </form>
//           </Row>
//         </Row>

//       </StyledApp>
//     </>
//   )
// }

// export default App
