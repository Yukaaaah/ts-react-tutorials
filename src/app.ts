import {renderTicTacToe} from "./tic-tac-toe";
import {renderOmikuji} from "./omikuji";
import {renderStringsDemo} from "./strings";
declare var require: any;

require("app.css");

document.onreadystatechange = (ev) => {
  // renderTicTacToe();
  // renderOmikuji();
  renderStringsDemo();
};
