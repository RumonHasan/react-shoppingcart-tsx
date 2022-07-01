import {Button, Container, Nav, Navbar as NavbarBs} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {FaShoppingCart} from 'react-icons/fa'
import { useShoppingCart } from '../context/ShoppingCartContext';
const Navbar = ()=>{
    const {openCart, closeCart, cartQuantity} = useShoppingCart();
    return (
        <NavbarBs className='bg-white shadow-sm mb-3' sticky='top'>
            <Container>
               <Nav className='me-auto'>
                    <Nav.Link to='/' as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link to='/store' as={NavLink}>
                        Store
                    </Nav.Link>
                    <Nav.Link to='/about' as={NavLink}>
                        About
                    </Nav.Link>
               </Nav>
               {cartQuantity > 0 && <Button style={{width: '3rem', 'height':'3rem', position:'relative'}}
                variant='outlined-primary'
                className='rounded-circle'onClick={openCart}>
                    <FaShoppingCart/>
                    <div style={{color:'white', width:'1.5rem', height:'1.5rem', position:'absolute', bottom:0, right:0, 
                        transform: 'translate(25%,25%)'
                    }} className='rounded-circle bg-danger d-flex justify-content-center align-items-center'>
                        {cartQuantity}
                    </div>
               </Button>}
            </Container>
        </NavbarBs>
    )
};

export default Navbar;