import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useUser } from '../features/authentication/useUsers'
import Spinner from './Spinner'

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`

function ProtectedRoute({ children }) {
  const navigate = useNavigate()

  //load the authenticated user
  const { isLoading, isAuthenticated } = useUser()

  //redirect to login if user is not authenticated

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login')
    }
  }, [isAuthenticated, isLoading, navigate])

  //show spinner while loading
  if (isLoading == true)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    )
  //if there is a authenticated user render the app
  if (isAuthenticated) return children
}

export default ProtectedRoute
