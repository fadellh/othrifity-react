import React from 'react'

function Empty() {
    return (
        <div>
            <div className='d-flex justify-content-center m-3 p-2' style={{flex:1,backgroundColor:'white'}} >
                <img  alt="thanks" height={500} width={500} src={require('../Asset/Ilustration/thanks.png')} style={{marginBottom:10}} ></img>
                <p className='d-flex justify-content-center m-3 p-2' >Belum Ada Transaksi</p>
          </div>
        </div>
    )
}

export default Empty
