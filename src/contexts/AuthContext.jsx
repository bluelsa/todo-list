import { login, register, checkPermission } from '../api/auth'
import { createContext, useState, useEffect, useContext} from 'react'
import * as jwt from 'jsonwebtoken'
import { useLocation } from 'react-router-dom'

// const defaultAuthContext = {
//   isAuthenticated: false,
//   currentMember: null,
//   register: null,
//   login: null,
//   logout: null
// }

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [payload, setPayload] = useState(null)

  const { pathname } = useLocation()

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        setPayload(null)
        setIsAuthenticated(false)
      }
      const result = await checkPermission(authToken);
      if (result) {
        const tempPayload = jwt.decode(authToken)
        setPayload(tempPayload)
        setIsAuthenticated(true)
      } else {
        setPayload(null)
        setIsAuthenticated(false)
      }
    };
    checkTokenIsValid();
  }, [pathname]);

  const value = {
    isAuthenticated,

    currentMember: payload,

    register: async ({data}) => {
      const { success, authToken } = await register({
        username: data.username,
        email: data.email,
        password: data.password,
      });
      const tempPayload = jwt.decode(authToken)
      if(tempPayload) {
        setPayload(tempPayload)
        setIsAuthenticated(true)
      } else {
        setPayload(null)
        setIsAuthenticated(false)
      }
      return success
    },

    login: async ({data}) => {
      const { success, authToken } = await login({
        username: data.username,
        password: data.password,
      });
      const tempPayload = jwt.decode(authToken)
      if(tempPayload) {
        setPayload(tempPayload)
        setIsAuthenticated(true)
        localStorage.setItem('authToken', authToken)
      } else {
        setPayload(null)
        setIsAuthenticated(false)
      }
      return success
    },

    logout: () => {
    localStorage.removeItem('authToken')
    setPayload(null)
    setIsAuthenticated(false)
  }
}

  return (
  <AuthContext.Provider value={value}>
  {children}
  </AuthContext.Provider>
  )

}