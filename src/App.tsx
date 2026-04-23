import './App.css'

import { ThemeProvider } from "@mui/material/styles"
import { RouterProvider } from "react-router-dom"
import theme from "./theme/Theme"
import Routes from "./routes/Routes"
// import { AuthProvider } from './contex/AuthContex'
import { Toaster } from 'sonner'
import ReduxProvider from './services/helper/provider/ReduxProvider'

function App() {


  return (
    <>
      <ThemeProvider theme={theme}>
        <Toaster position="top-right" richColors closeButton />
        <ReduxProvider>
          <RouterProvider router={Routes} />
        </ReduxProvider>
      </ThemeProvider>
    </>
  )
}

export default App
