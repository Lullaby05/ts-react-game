import { ChessType } from "../types/enums";
import './ChessComp.css'
import React from 'react'

interface IProps {
  type: ChessType
  onClick?: () => void
}

export function ChessComp(props: IProps) {
  let chess = null
  if(props.type === ChessType.red) {
    chess = <div className="red chess-item"></div>
  } else if(props.type === ChessType.black) {
    chess = <div className="black chess-item"></div>
  }
  return (
    <div className="chess" onClick={() =>{
      if(props.type === ChessType.none) {
        if(props.onClick) {
          props.onClick()
        }
      }
    }}>
      { chess }
    </div>
  )
}