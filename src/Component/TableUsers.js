import React, { useEffect, useState } from 'react'
import { Table, Input} from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchListUser } from '../Redux/Action/ManageUserAction'
import RenderTable from '../ComponentRender/RenderTable'
import Pagenation from './Pagenation'



function TableUsers() {
    
    let dispatch = useDispatch()
    const [orderBy, setOrderBy] = useState('orderBy=u.id&sort=asc')
    // const [orderBy, setOrderBy] = useState('')
    const [filterBy, setFilterBy] = useState('')
    const [search, setSearch] = useState('')
    const [table, setTable] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(6)

    console.log(orderBy, filterBy)
    useEffect(() => {
        dispatch(
            fetchListUser(orderBy, filterBy, search)
            )
        },[dispatch, orderBy, filterBy, search])    
    
    let dataList = useSelector((state) => state.listUser.dataList)
    console.log(dataList)
    
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = dataList.slice(indexOfFirstPost,indexOfLastPost)
    console.log(currentPosts)
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber)
        
    return (
        <div>
            <div className='row d-flex justify-content-end'>
                <Input 
                type='text' placeholder='Search by username' className='col-2 mb-3 ml-0'
                 onChange={(e)=>setSearch(`&search=${e.target.value}`)}>
                </Input>
                <div className='col-3 mb-3'></div>
                <div className='col-1 mb-3 mt-2'>
                    <strong>FilterBy:</strong>
                </div> 
                <Input type='select' className='justify-content-start col-2 mb-3' onChange={(e)=> setFilterBy(e.target.value)}>
                    <option value=''>All User</option>
                    <option value='&filterBy1=u.statusId&filterParam1=1'>Active User</option>
                    <option value='&filterBy1=u.statusId&filterParam1=2'>Banned User</option>
                </Input>
                <div className='col-1 mb-3 mt-2'>
                    <strong>Sorting:</strong>
                </div>           
                <Input type='select' className='col-2 mb-3 mr-2' onChange={(e)=>setOrderBy(e.target.value)}>
                    <option value='orderBy=u.id&sort=asc'>Paling sesuai</option>
                    <option value='orderBy=count(t.userId)&sort=desc'>Sale Tertinggi</option>
                    <option value='orderBy=count(t.userId)&sort=asc'>Sale Terendah</option>
                    <option value='orderBy=sum(t.total_price)&sort=desc'>Revenue Tertinggi</option>
                    <option value='orderBy=sum(t.total_price)&sort=asc'>Revenue Terendah</option>
                </Input>
            </div>

            <Table  >
                <thead>
                    <tr>
                        <th>#</th>    
                        <th>Status</th>    
                        <th>Username</th>    
                        <th>Email</th>    
                        <th>Location</th>    
                        <th>Revenue Users</th>    
                        <th>Total Belanja</th>    
                        <th>Join Date</th>    
                        <th>Action</th>    
                    </tr>
                </thead>
                <tbody>
                    <RenderTable dataList={currentPosts}  orderBy={orderBy} />
                    {/* {renderTable()} */}
                </tbody>
            </Table> 
            <Pagenation postPerPage={postsPerPage} totalPosts={dataList.length} paginate={paginate} />           
        </div>
    )
}

export default TableUsers
