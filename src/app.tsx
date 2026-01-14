import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { Dashboard } from './dashboard'
import { Provider as ChakraProvider } from './theme'
import { store } from './store'

const App = () => {
  return (
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <Dashboard />
        </ChakraProvider>
      </ReduxProvider>
    </BrowserRouter>
  )
}

export default App
