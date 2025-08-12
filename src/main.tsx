import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { store } from '@/redux/store'
import { setUser } from '@/redux/reducers/user'
import { Roles } from '@/types/authTypes'
import './i18n.ts'

// Dev-only mock: bootstrap ADMIN role so role-based UI is visible locally
if (import.meta.env.MODE === 'development') {
  store.dispatch(
    setUser({
      id: 0,
      email: 'admin@mock',
      phone: '',
      region_id: 0,
      name: 'Mock Admin',
      role: Roles.ADMIN,
      category_id: 0,
      // `setUser` fills `userRoles` from `roles`
      roles: [Roles.ADMIN]
    } as any)
  )
}
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
