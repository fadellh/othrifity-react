import React,{} from 'react'
import {
Nav,
NavItem,
NavLink,
ListGroupItem,
ListGroup,
// NavbarToggler,
// Collapse,
// Navbar
} from 'reactstrap' 
// import ManageUser from './Pages/ManageUser'

function Sidebar() {
    // const [isOpen, setIsOpen] = useState(false);
    
    // const toggle = () => setIsOpen(!isOpen);
    return (
    <div className="container">
{/* <Navbar color="light" light expand="md">
        <NavbarToggler onClick={toggle}>
            <Collapse  isOpen={isOpen} navbar> */}
    <div className='row no-gutters'>
        <div className='col-md-12 bg-dark mr-0 pr-3 pt-3 w-100'>
          <Nav vertical className='ml-3 mb-5'>
            <NavItem>
              <NavLink href="/"  className='text-white thumbnail'>Dashboard</NavLink><hr className='bg-secondary'></hr>
            </NavItem>
            <NavItem>
              <NavLink href="/manage-user" className='text-white thumbnail'>Manage User</NavLink><hr className='bg-secondary'></hr>
            </NavItem>
            <NavItem>
                  <NavLink href="#" className='text-white thumbnail'>Report</NavLink>
                  <ListGroup>
                    <ListGroupItem  className='bg-dark border-0 '>
                        <NavLink href='/transaction'  className='bg-dark text-white border-0 thumbnail'>Transaction</NavLink>
                        <NavLink href='/'  className='bg-dark text-white border-0 thumbnail'>Revenue Toko</NavLink>
                        <NavLink href='/'  className='bg-dark text-white border-0 thumbnail'>Traffic</NavLink>
                        <NavLink href='/'  className='bg-dark text-white border-0 thumbnail'>Revenue Admin</NavLink><hr className='bg-secondary'></hr>
                        <NavLink href='/raja'  className='bg-dark text-white border-0 thumbnail'>Raja Ongkir Data</NavLink><hr className='bg-secondary'></hr>
                    </ListGroupItem>
                  </ListGroup>
            </NavItem>
            <NavItem>
              <NavLink href="#" className='text-white thumbnail'>Analytics</NavLink><hr className='bg-secondary'></hr>
            </NavItem>
        </Nav>
        </div>
    </div>
            {/* </Collapse>
        </NavbarToggler>
</Navbar> */}
    </div>
    )
}

export default Sidebar
