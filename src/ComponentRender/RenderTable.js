import React, { useEffect, useState } from 'react'
import { DropdownToggle, DropdownMenu, DropdownItem,ButtonDropdown, Button, Badge} from 'reactstrap'
import { useDispatch } from 'react-redux'
import { fetchListUser, updateUser,deleteUser } from '../Redux/Action/ManageUserAction'
import Swal from 'sweetalert2'



function RenderTable({dataList,orderBy}) {

    let dispatch = useDispatch()

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [select, setSelect] = useState(null)
    // console.log(orderBy, 'HAI AKU ORDERBY')
    const handleBanned = (id,userId) => {
            dispatch(updateUser(id,userId))
            if(id){
                dispatch(fetchListUser(orderBy))
            }
    }
    
    const handleActive = (id,userId) => {
            dispatch(updateUser(id,userId))
            if(id){
                dispatch(fetchListUser(orderBy))
            }
    }

    const handleStatus = (status) => {
        // console.log('HAIII')
        if(status==='Active'){
            return(
                <Badge color='success' pill >Active</Badge>
            )
        }
        return(
            <Badge color='danger' pill>Banned</Badge>
        )
    }
    const handleStatusAction = (status, id) => {
        if(status==='Active'){
            return(
                <Button outline color='danger' size="sm" onClick={()=>handleBanned(2,id)}>Banned User</Button>
            )
        }
        return(
            <Button outline color='primary' size="sm" onClick={()=>handleActive(1,id)} >Active User</Button>
        )
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                dispatch(deleteUser(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                    )
                dispatch(fetchListUser())
            }
          })
    }

    console.log(dataList)
    return dataList.map((val,index)=> {
        // console.log(val.status)
        if(select === val.id){
            return(
                <tr key={index}>
                <td>{index+1}</td>
                <td>{handleStatus(val.status)}</td>
                <td>{val.username}</td>
                <td>{val.email}</td>
                <td>{val.address}</td>
                <td>{val.revenue_toko}</td>
                <td>{val.total_sale}</td>
                <td>{val.join_date}</td>
                <td>
                    <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                        <DropdownToggle caret color="info" > {val.username} </DropdownToggle>
                        <Button id="caret" color="danger" onClick={() => setSelect(null)}>Cancel</Button>
                            <DropdownMenu>
                                <DropdownItem>
                                    <Button outline color='info' size='sm'>View user</Button>
                                </DropdownItem>
                                 <DropdownItem>{handleStatusAction(val.status, val.id)}</DropdownItem>
                                <DropdownItem onClick={()=>handleDelete(val.id)}>
                                    <Button outline color='danger' size='sm'>Delete user</Button>
                                </DropdownItem>
                                {/* <DropdownItem onClick={() => setSelect(null)} >Cancel</DropdownItem> */}
                            </DropdownMenu>
                            {/* {renderDropdown()} */}
                    </ButtonDropdown>
                </td>
            </tr>
        )
            }return(
                <tr key={index}>
                        <td>{index}</td>
                        <td>{handleStatus(val.status)}</td>
                        <td>{val.username}</td>
                        <td>{val.email}</td>
                        <td>{val.address}</td>
                        <td>{val.revenue_toko}</td>
                        <td>{val.total_sale}</td>
                        <td>{val.join_date}</td>
                        <td>
                            <ButtonDropdown onClick={()=> setSelect(val.id)}>
                                <DropdownToggle caret color="success"> User Action </DropdownToggle>
                                <DropdownMenu>
                                    {/* {renderDropdown(val.id)} */}
                                </DropdownMenu>
                            </ButtonDropdown>
                        </td>
                </tr>
            )
            })
}

export default RenderTable
