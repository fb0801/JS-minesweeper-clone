//ui

//populate board

import {createBoard} from './minesweeper.js'

const board= createBoard(2,2)
const boardElement = document.querySelector('.board')
board.forech(row => {
    row.forech(tile => {
        boardElement.append(tile.element)
    })
})