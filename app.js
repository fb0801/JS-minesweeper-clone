//ui

//populate board

import {createBoard} from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board= createBoard(BOARD_SIZE,NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')


board.forech(row => {
    row.forech(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListner('click', () => {
            
        })
    })
})

boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES