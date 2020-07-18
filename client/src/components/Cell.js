import React from 'react'

const Cell = ({value, handleClick}) =>(
    <div className='cell' onClick={ handleClick}>
        {/* <button className='cell' onClick={ handleClick} > {value} </button>  */}
        {value} 
    </div>
)

export default Cell