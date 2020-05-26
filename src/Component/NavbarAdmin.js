import React, {useState} from 'react'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Input,
  Button
 } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faBell} from '@fortawesome/free-solid-svg-icons'



function NavbarAdmin() {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
 
  return (
    <div>
       <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Otrifity</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem >
              <NavLink href="/components/" >
                 <FontAwesomeIcon height='12px' icon={faEnvelope} /></NavLink>
            </NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap"><FontAwesomeIcon icon={faBell}/></NavLink>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap"><FontAwesomeIcon/></NavLink>
            </NavItem>
          </Nav>
          <Nav>
        
            <NavItem className="form-inline my-2 my-lg-0">
              <Input className="form-control mr-sm-2" type="search"  placeholder="Search" aria-label="Search"/>
            <Button color="success" type="submit" >Search</Button>
        
            </NavItem>
            <NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
              <FontAwesomeIcon icon={faUser} className='mr-1' />
                  <NavbarText>Username</NavbarText>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={()=> console.log('PROFILE')}>
                 <div>Profile</div>
                </DropdownItem>
                <DropdownItem>
                  Image
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                  Logout
                </DropdownItem>
              </DropdownMenu>
          </UncontrolledDropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default NavbarAdmin
