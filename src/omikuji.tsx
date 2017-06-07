import * as React from "react";
import * as ReactDom from "react-dom";

interface OmikujiState {
  text: string
}

interface OmikujiProps {
  state: OmikujiState
  onClick: () => void
}

let omikujiState: OmikujiState = {
  text: ""
};

function Omikuji(props: OmikujiProps) {
  if (props.state.text) {
    return <div className="tc f3 pt4" onClick={props.onClick}>
      {props.state.text}
    </div>;
  }

  return <div className="tc f3 pt4" onClick={props.onClick}>
    Click here to get an omikuji!
  </div>;
}

const mikujiOptions = [
  "大吉",
  "吉",
  "中吉",
  "小吉",
  "末吉",
  "凶",
];

function randomNumber(low: number, high: number) {
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function pickRandomOne(options: string[]) {
  return options[randomNumber(0, options.length - 1)];
}

function handleClick() {
  omikujiState.text = pickRandomOne(mikujiOptions);
  renderOmikuji();
}

export function renderOmikuji() {
  ReactDom.render(
      <Omikuji state={omikujiState} onClick={handleClick}/>,
      document.getElementById("content"));
}