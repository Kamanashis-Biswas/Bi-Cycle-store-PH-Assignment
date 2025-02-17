import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './route/rotuer'
import { Provider } from 'react-redux'
import { persistor, store } from './Redux/store'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
      <Toaster position='top-right' duration={2000} />
    </Provider>
  </StrictMode>,
)
