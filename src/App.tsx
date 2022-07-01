import {Routes, Route} from 'react-router-dom';
import { Container } from 'react-bootstrap';
// components
import About from './pages/About';
import Store from './pages/Store';
import Home from './pages/Home';
import Navbar from './components/Navbar';
// context
import { ShoppingCartProvider } from './context/ShoppingCartContext';

const App  = ()=>{
  return (
    <ShoppingCartProvider>
      <Navbar/>
      <Container className='mb-4'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/store' element={<Store/>}/>
          <Route path='/about' element={<About/>}/>
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
};

export default App;