import * as React from "react";
import * as ReactDom from "react-dom";

export function renderCounter(){
    ReactDom.render(
        <Counter state={counterState} onClick={addCounter}/>,
        document.getElementById("content")
    );

}

interface CounterState {
    count: number
}

interface CounterProps {
    state: CounterState
    onClick: () => void
//  void: 返り値を持たない関数を表す
}

let counterState: CounterState = {
    count: 0
};


function addCounter() {
    counterState.count += 1;
    renderCounter();
}

function Counter(props: CounterProps) {
        return <div className="center-c ph3">
            <a className="f6 link dim ph3 pv2 mb2 dib white bg-purple" onClick={props.onClick}>
                Count Up!
            </a>
            <div className="tc f3 pt4">
                {props.state.count} times click
            </div>
        </div>;
    }

