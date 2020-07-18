import React, {useState} from 'react'
import Cell from './Cell'

const Board = ({cells, handleClick}) =>{

    return(
        <div className='board-container'>
            {cells.map((cell, index) =>(
                <Cell key={index} value={cell} handleClick={() => handleClick(index)}/>
            ))}
        </div>
    )
}

export default Board