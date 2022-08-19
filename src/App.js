import React from 'react'
import './App.css'

import Header from './components/Header/Header'
import Form from './components/Form/Form'

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <Header />
        <main className="main">
          <Form />
        </main>
      </div>
    </div>
  )
}

export default App