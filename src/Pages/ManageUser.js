import React from 'react'
// import {useSelector, useDispatch} from 'react-redux'
// import { fetchListUser } from '../Redux/Action/ManageUserAction'
import TableUsers from '../Component/TableUsers'
// import {  } from 'reactstrap'

function ManageUser() {

    // let dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(
    //         fetchListUser()
    //     )
    //     // if(update){
    //     //     setUpdate(false)
    //     // }
    // },[dispatch])

    // let dataList = useSelector((state) => state.listUser.dataList)



    return (
        <div>
          <TableUsers/>
        </div>
    )
}

export default ManageUser
