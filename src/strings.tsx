import * as React from "react";
import * as ReactDom from "react-dom";

function fullName(firstName: string, lastName: string) {
  return "";
}

function search(part: string, target: string) {
  return "";
}

function count(part: string, target: string) {
  return 0;
}

function StringsDemo() {
  return <div>
    <div>
      If my first name is Zach and my last name is Collins, my full name is {fullName("Zach", "Collins")}
    </div>

    <div>
      Does the phrase "Give me a break" contain the letters "rea"? {search("rea", "Give me a break")}
    </div>

    <div>
      How many "," exist in
      "Oh, this would, uh, be a really, uh, long, run on sentence that, you know, no one would read."?
      {count(",", "Oh, this would, uh, be a really, uh, long, run on sentence that, you know, no one would read.")}
    </div>
  </div>
}

export function renderStringsDemo() {
  ReactDom.render(
      <StringsDemo/>,
      document.getElementById("content"));
}
