//ui

//populate board

import {TILE_STATUSES, createBoard, markTile, revealTile, checkWin, checkLose} from './minesweeper.js'

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 10

const board= createBoard(BOARD_SIZE,NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesLeftText = document.querySelector('[data-mine-count]')
const messageText = document.querySelector('.subtext')


board.forech(row => {
    row.forech(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListner('click', () => {
            revealTile(board, tile)
            checkGameEnd()
        })
        tile.element.addEventListner('contextmenu', e => {
            e.preventDefault()
            markTile(tile)
            listMinesLeft()
        })
    })
})

boardElement.style.setProperty("--size", BOARD_SIZE)
minesLeftText.textContent = NUMBER_OF_MINES

function listMinesLeft(){
    const markedTitlesCount = board.reduce((count, row) =>{
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)

   minesLeftText.textContent = NUMBER_OF_MINES - markedTitlesCount

}

function checkGameEnd(){
    const win = checkWin(board)
    const lose = checkLose(board)
    
    if(win || lose){
        boardElement.addEventListener('click', stopProp, {capture: true})
        boardElement.addEventListener('contextmenu', stopProp, {capture: true}
        )
    }
    if (win) {
        messageText.textContent = "YOU WIN!!"
    }
    if (lose){
        messageText.textContent = "YOU LOSE!!"
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(e){
    e.stopImmediatePropagation()
}