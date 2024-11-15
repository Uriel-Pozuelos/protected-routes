import { useState } from 'react'
import { BrowserRouter, Link, redirect, Route, Routes } from 'react-router-dom'
import { About, Admin, Contact, Home } from './pages/Index'
import { Protected } from './components/Protected'

function App() {

  // user 
  const [user, setUser] = useState(null)

  const login = () => {
    setUser({id:1, username:'Luis', permissions:['analize'], roles:['admin']})
  }

  const logout = () => {
    setUser(null)
  }
  
  return (

    
    <BrowserRouter>
      <Navigation />

      {user ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={login}>Login</button>
      )}

      <Routes>
        <Route index element={<Home />}/>
        <Route path='/home' element={<Home />} />
        
        <Route element={<Protected isAllowed={!!user && user.permissions.includes("analize")} redirectTo="/home" />} >
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />}  />
        </Route>

        <Route path='/admin' element={<Protected isAllowed={!!user && user.roles.includes("admin")} redirectTo="/home" >
            <Admin />
          </Protected>
          } />

      </Routes>
  
  </BrowserRouter>

  )

}

// Componente Navigation 

function Navigation () {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          <Link to='/about'>About</Link>
        </li>
        <li>
          <Link to='/contact'>Contact</Link>
        </li>
        <li>
          <Link to='/admin'>Admin</Link>
        </li>
      </ul>
    </nav>
  )
}



export default App
