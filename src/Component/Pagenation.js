import React,{useState} from 'react'

function Pagenation({totalPosts, postPerPage, paginate}) {
    const pageNumbers = []
    for(let i=1; i<= Math.ceil(totalPosts/postPerPage);i++){
        pageNumbers.push(i)
        console.log(pageNumbers)
    }
    
    return (
        <nav>
            <ul className='pagination'>
                {
                pageNumbers.map(number => (
                    <li key={number} className='page-item'>
                        <a onClick={()=> paginate(number)} className='page-link'>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagenation
