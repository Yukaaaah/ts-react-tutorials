import {renderTicTacToe} from "./tic-tac-toe";
import {renderOmikuji} from "./omikuji";
import {renderStringsDemo} from "./strings";
import {renderRpg} from "./rpg";
import {renderCounter} from "./counter";

declare var require: any;
require("app.css");

document.onreadystatechange = (ev) => {
  // renderTicTacToe();
  // renderOmikuji();
  // renderStringsDemo();
  // renderRpg();
  renderCounter();
};
