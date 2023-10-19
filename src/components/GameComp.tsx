import React from "react";
import { ChessType, GameStatus } from "../types/enums";
import { BoardComp } from "./BoardComp";
import { GameStatusComp } from "./GameStatusComp";

interface IState {
  chesses: ChessType[];
  gameStatus: GameStatus;
  nextChess: ChessType.red | ChessType.black
}

export class GameComp extends React.Component<{}, IState> {
  state: IState = {
    chesses: [],
    gameStatus: GameStatus.gaming,
    nextChess: ChessType.black
  }

  componentDidMount(): void {
    this.init()
  }

  // 初始化数据
  init() {
    const arr: ChessType[] = []
    for(let i = 0; i < 9; i++) {
      arr.push(ChessType.none)
    }
    this.setState({
      chesses: arr,
      gameStatus: GameStatus.gaming,
      nextChess: ChessType.black
    })
  }

  // 处理棋子的点击事件
  handleChessClick(index: number) {
    const chesses: ChessType[] = [...this.state.chesses]
    chesses[index] = this.state.nextChess
    this.setState(prevState => ({
      chesses,
      gameStatus: this.getStatus(chesses, index),
      nextChess: prevState.nextChess === ChessType.red ? ChessType.black : ChessType.red
    }))
  }

  // 判断游戏当前状态
  getStatus(chesses: ChessType[], lastIndex: number): GameStatus {
    // 1.判断是否获得胜利
    const horMin = Math.floor(lastIndex / 3) * 3
    const verMin = lastIndex % 3
    if((chesses[horMin] === chesses[horMin + 1] && chesses[horMin] === chesses[horMin + 2])
      || 
    (chesses[verMin] === chesses[verMin + 3] && chesses[verMin] === chesses[verMin + 6])
      ||
    ((chesses[0] === chesses[4] && chesses[0] === chesses[8] && chesses[0] !== ChessType.none) 
    ||
    (chesses[2] === chesses[4] && chesses[2] === chesses[6] && chesses[2] !== ChessType.none)
    )) {
      if(chesses[lastIndex] === ChessType.red) {
        return GameStatus.redWin
      } else {
        return GameStatus.blackWin
      }
    }
    // 2.判断是否平局
    if(!chesses.includes(ChessType.none)) {
      return GameStatus.equal
    }
    // 3.游戏继续进行
    return GameStatus.gaming
  }

  render() {
    return (
      <div style={{textAlign: "center"}}>
        <h1>井字棋游戏</h1>
        <GameStatusComp 
          status={this.state.gameStatus}
          next={this.state.nextChess}
        />
        <BoardComp
          chesses={this.state.chesses}
          isGameOver={this.state.gameStatus !== GameStatus.gaming}
          onClick={this.handleChessClick.bind(this)}
        />
        <button onClick={() => {
          this.init()
        }}>重新开始</button>
      </div>
    );
  }
}
