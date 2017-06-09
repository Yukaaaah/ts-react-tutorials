import * as React from "react";
import * as ReactDom from "react-dom";

// 1. まずこれが呼ばれる？
export function renderStringsDemo() {
  ReactDom.render(
      <StringsDemo/>,
      // StringDemoはコンポーネント名。-> function StringsDemo(){}の中身を実行する。
      document.getElementById("content"));
}

// 2.コンポーネントの中身。要はHTML
function StringsDemo() {
  return <div>

    <header className="tc ph4">
      <h1 className="f3 f2-m f1-l fw2 black-90 mv3">
        {greeter("world")}
      </h1>
      <h2 className="f5 f4-m f3-l fw2 black-50 mt0 lh-copy">
      </h2>
    </header>

    <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
      <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">FullName</h1>
      <div className="pa3 bt b--black-10">
        <p className="f6 f5-ns lh-copy measure">
          If my first name is Yuka and my last name is Hamano,<br/> my full name is {fullName("Yuka", "Hamano")}
        </p>
      </div>
    </article>

    <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
      <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">String includes?</h1>
      <div className="pa3 bt b--black-10">
        <p className="f6 f5-ns lh-copy measure">
          Does the phrase "Give me a break" contain the letters "rea"?<br/>
          Answer: {search("rea", "Give me a break")}
        </p>
      </div>
    </article>

    <article className="center mw5 mw6-ns br3 hidden ba b--black-10 mv4">
      <h1 className="f4 bg-near-white br3 br--top black-60 mv0 pv2 ph3">How many exist?</h1>
      <div className="pa3 bt b--black-10">
        <p className="f6 f5-ns lh-copy measure">
          How many "," exist in
          "Oh, this would, uh, be a really, uh, long, run on sentence that, you know, no one would read."? <br/>
          Answer {count(",", "Oh, this would, uh, be a really, uh, long, run on sentence that, you know, no one would read.")}
        </p>
      </div>
    </article>

  </div>
}

//　3. コンポーネント内それぞれで呼ばれるfunctionたち　javascript処理
function fullName(firstName: string, lastName: string) {
  return firstName + lastName;
}

function search(part: string, target: string) {
  var answer: boolean;
  answer = target.includes(part);
  return answer.toString();
}

function count(part: string, target: string) {
  var arr;
  var result = 0;
  arr = target.split(part);
  result = arr.length - 1;
  return "[" + part + "]" + "is existed " + result + " times.";
}

function greeter(person: string) {
  return "Hello," + person + "!!";
}


