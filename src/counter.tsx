import * as React from "react";
import * as ReactDom from "react-dom";

export function renderCounter(){
    ReactDom.render(
        <Counter state={counterState}
                 onClick={handleCounter}/>,
        document.getElementById("content")
    );

}

interface CounterState {
    count: number
}

interface CounterProps {
    state: CounterState
    onClick: (action: string) => void
}

interface ActionButtonProps {
    onClick: (action: string) => void
    actionName: string
}

let counterState: CounterState = {
    count: 0
};


function handleCounter(action: string) {
    if (action === "Add") {
        counterState.count += 1;
    }
    if (action === "Minus"){
        counterState.count -= 1;
    }
    renderCounter();
}


function Counter(props: CounterProps) {
        return <div>
                <ActionButton actionName="Add" onClick={props.onClick}/>
                <ActionButton actionName="Minus" onClick={props.onClick}/>
            <div className="tc f3 pt4">
                {props.state.count} times click
            </div>
            </div>;
    }

function ActionButton (props: ActionButtonProps) {
    return <div className="center-c ph3">
        <a className="f6 link dim ph3 pv2 mb2 dib white bg-purple"
           onClick={() => props.onClick(props.actionName)}>
            {props.actionName} button
        </a>
    </div>
}

