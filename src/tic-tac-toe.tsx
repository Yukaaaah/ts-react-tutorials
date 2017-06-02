import * as React from "react";
import * as ReactDom from "react-dom";

const noPiece = 0;
const xPiece = 1;
const oPiece = 2;

const gameRunning = 0;
const xWins = 1;
const oWins = 2;
const stalemate = 3;

interface TicTacToeState {
  isXTurn: boolean
  pieces: number[]
  condition: number
}

let ticTacToeState: TicTacToeState = {
  pieces: [
    noPiece,
    noPiece,
    noPiece,
    noPiece,
    noPiece,
    noPiece,
    noPiece,
    noPiece,
    noPiece
  ],
  isXTurn: true,
  condition: gameRunning
};

function makeMove(position: number, isXTurn: boolean) {
  let piece: number;

  if (isXTurn) {
    piece = xPiece;
  }
  else {
    piece = oPiece;
  }

  ticTacToeState.pieces[position] = piece;
  ticTacToeState.isXTurn = !ticTacToeState.isXTurn;
}

function handleClick(position: number) {
  makeMove(position, ticTacToeState.isXTurn);
  renderTicTacToe();
}

export function renderTicTacToe() {
  ReactDom.render(<TicTacToe state={ticTacToeState} onClick={handleClick}/>, document.getElementById("content"));
}

interface TicTacToeProps {
  state: TicTacToeState
  onClick: (position: number) => void
}

function TicTacToe(props: TicTacToeProps) {
  if (props.state.condition === xWins) {
    return <div>
      X Wins!
    </div>
  }

  if (props.state.condition === oWins) {
    return <div>
      O Wins!
    </div>
  }

  if (props.state.condition === stalemate) {
    return <div>
      Stalemate!
    </div>
  }

  return <div className="lh-solid f4">
    <div>
      { props.state.isXTurn ? "X Turn" : "O Turn" }
    </div>
    <div className="cf">
      <TopLeft>
        <Piece point={props.state.pieces[0]} onClick={() => props.onClick(0)}/>
      </TopLeft>

      <TopCenter>
        <Piece point={props.state.pieces[1]} onClick={() => props.onClick(1)}/>
      </TopCenter>

      <TopRight>
        <Piece point={props.state.pieces[2]} onClick={() => props.onClick(2)}/>
      </TopRight>
    </div>

    <div className="cf">
      <MidLeft>
        <Piece point={props.state.pieces[3]} onClick={() => props.onClick(3)}/>
      </MidLeft>

      <MidCenter>
        <Piece point={props.state.pieces[4]} onClick={() => props.onClick(4)}/>
      </MidCenter>

      <MidRight>
        <Piece point={props.state.pieces[5]} onClick={() => props.onClick(5)}/>
      </MidRight>
    </div>

    <div className="cf">
      <BottomLeft>
        <Piece point={props.state.pieces[6]} onClick={() => props.onClick(6)}/>
      </BottomLeft>

      <BottomCenter>
        <Piece point={props.state.pieces[7]} onClick={() => props.onClick(7)}/>
      </BottomCenter>

      <BottomRight>
        <Piece point={props.state.pieces[8]} onClick={() => props.onClick(8)}/>
      </BottomRight>
    </div>
  </div>
}

interface HasChildren {
  children?: React.ReactNode
}

interface PieceProps {
  point: number
  onClick: () => void
}

function Piece(props: PieceProps) {
  if (props.point === noPiece) {
    return <div className="w4 h4 dt" onClick={props.onClick}>
      &nbsp;
    </div>
  }

  if (props.point === xPiece) {
    return <div className="red w4 h4 dt" onClick={props.onClick}>
      <div className="dtc v-mid tc">
        X
      </div>
    </div>
  }

  if (props.point === oPiece) {
    return <div className="blue w4 h4 dt" onClick={props.onClick}>
      <div className="dtc v-mid tc">
        O
      </div>
    </div>
  }
}

function TopLeft(props: HasChildren) {
  return <div className="br bb b--black fl">
    {props.children}
  </div>;
}

function TopRight(props: HasChildren) {
  return <div className="bl bb b--black fl">
    {props.children}
  </div>;
}

function TopCenter(props: HasChildren) {
  return <div className="bl br bb b--black fl">
    {props.children}
  </div>;
}

function MidLeft(props: HasChildren) {
  return <div className="br bb bt b--black fl">
    {props.children}
  </div>;
}

function MidRight(props: HasChildren) {
  return <div className="bl bb bt b--black fl">
    {props.children}
  </div>;
}

function MidCenter(props: HasChildren) {
  return <div className="bl br bb bt b--black fl">
    {props.children}
  </div>;
}

function BottomLeft(props: HasChildren) {
  return <div className="br bt b--black fl">
    {props.children}
  </div>;
}

function BottomRight(props: HasChildren) {
  return <div className="bl bt b--black fl">
    {props.children}
  </div>;
}

function BottomCenter(props: HasChildren) {
  return <div className="bl br bt b--black fl">
    {props.children}
  </div>;
}
