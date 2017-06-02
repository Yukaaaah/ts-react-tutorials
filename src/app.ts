import {renderTicTacToe} from "./tic-tac-toe";
declare var require: any;

require("app.css");

document.onreadystatechange = (ev) => {
  renderTicTacToe();
};
