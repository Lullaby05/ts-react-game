import { ChessType } from "../types/enums";
import { ChessComp } from "./ChessComp";
import React from 'react'
import './BoardComp.css'

interface IProps {
  chesses: ChessType []
  isGameOver?: boolean
  onClick?: (index: number) => void
}

export const BoardComp: React.FC<IProps> = function (props: IProps) {
  const isGameOver = props.isGameOver!
  const list = props.chesses.map((type, index) => {
    return (
      <ChessComp key={ index } type={ type } onClick={() => {
        if(props.onClick && !isGameOver) {
          props.onClick(index)
        }
      }}/>
    )
  })
  return (
    <div className="board">
      { list }
    </div>
  )
}

BoardComp.defaultProps = {
  isGameOver: false
}