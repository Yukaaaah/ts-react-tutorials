import * as React from "react";
import * as ReactDom from "react-dom";

//　1. documentの読み込みが終わったらここへ。
export function renderRpg() {
  // 2-1. state
  // 2-2~4. functionの設定
  // その要素に属性(props)があれば、渡す
  ReactDom.render(<Rpg
      state={rpgState}
      onSetName={handleSetName}
      onChangeName={handleChangeName}
      onSelectAction={handleSelectAction}
  />, document.getElementById("content"));
}

// propsの定義1 -> ReactDom.renderで一緒に呼ばれているもの
interface RpgProps {
    state: RpgState
    onSetName: () => void
    onChangeName: (event: React.FormEvent) => void
    onSelectAction: (action: string) => void
}

// propsの設定2
interface CharacterViewProps {
    name: string
    hp: number
    maxHp: number
    image: string
    left?: boolean
    right?: boolean
}

// propr設定3
interface ActionButtonProps {
    onSelectAction: (action: string) => void
    actionName: string
}


//　2. renderRpg()はこれ
function Rpg(props: RpgProps) {
    //  名前入れる最初の画面 -> まだ名前を入力していなかったら。
  if (props.state.isNamingCharacter) {
    return <Container>
      <div>
        Name your character: <input className="mr3"
                                    onChange={props.onChangeName}/>
        <button className="" onClick={props.onSetName}>
          Ready!
        </button>
      </div>
    </Container>
  }

  // 次のバトルシーンの画面
  return <Container>
    <div className="cf">
      <BattleScene state={props.state}/>
    </div>
    <div className="tc mt3">
      <ActionButton actionName="Attack" onSelectAction={props.onSelectAction}/>
      <ActionButton actionName="Fire" onSelectAction={props.onSelectAction}/>
      <ActionButton actionName="Cure" onSelectAction={props.onSelectAction}/>
    </div>
    <div>
      <textarea disabled className="w-100 input-reset center" rows={5}
                value={props.state.activityLog.slice(-5).join("\n")}>
      </textarea>
    </div>
  </Container>
}

// RpgStateを元に、上で呼ばれた、メインの戦う画面のHTMLを作る
// props: ってプロパティを渡しているだけのようす
function BattleScene(props: { state: RpgState }) {
    if (rpgState.buttleTimes === 0) {
        return <div>
            <CharacterView
                left
                image="https://vignette3.wikia.nocookie.net/8bittheater/images/0/0d/Red_Mage_Mime.jpg/revision/latest/scale-to-width-down/177?cb=20091020173310"
                name={props.state.allyName}
                hp={props.state.allyHp}
                maxHp={props.state.allyMaxHp}/>

            <CharacterView
                right
                image="https://s-media-cache-ak0.pinimg.com/originals/0a/a0/08/0aa00800bf6065938a3b9455883c3dea.gif"
                name={props.state.enemyName}
                hp={props.state.enemyHp}
                maxHp={props.state.enemyMaxHp}
            />
        </div>
    }
    if (rpgState.buttleTimes === 1) {
        rpgState.activityLog = [];

        return <div>
            <CharacterView
                left
                image="https://vignette3.wikia.nocookie.net/8bittheater/images/0/0d/Red_Mage_Mime.jpg/revision/latest/scale-to-width-down/177?cb=20091020173310"
                name={props.state.allyName}
                hp={props.state.allyHp}
                maxHp={props.state.allyMaxHp}/>

            <CharacterView
                right
                image="https://img.lancers.jp/proposal/8/7/873c2510fcb9220cbe7f54cb04d4f953e96c5e4d90fae703e528986fcb31c896_1863633_450_2328267.jpg?20130310081146"
                name={props.state.enemyName}
                hp={props.state.enemyHp}
                maxHp={props.state.enemyMaxHp}
            />
        </div>

    }
    if (rpgState.buttleTimes === 2) {
        return <div>
            <CharacterView
                left
                image="https://vignette3.wikia.nocookie.net/8bittheater/images/0/0d/Red_Mage_Mime.jpg/revision/latest/scale-to-width-down/177?cb=20091020173310"
                name={props.state.allyName}
                hp={props.state.allyHp}
                maxHp={props.state.allyMaxHp}/>

            <CharacterView
                right
                image="https://s-media-cache-ak0.pinimg.com/originals/0a/a0/08/0aa00800bf6065938a3b9455883c3dea.gif"
                name={props.state.enemyName}
                hp={props.state.enemyHp}
                maxHp={props.state.enemyMaxHp}
            />
        </div>

    }

}

// 上で呼ばれたActtionButton作る
function ActionButton(props: ActionButtonProps) {
  return <div className="mv2">
    <button
        className="w4 pa2"
        onClick={() => props.onSelectAction(props.actionName)}>
      {props.actionName}
    </button>
  </div>
}

// コンポーネントを呼ぶための変数の型の定義？
// 2-1. stateの定義 => 初期値。ここではinterfaceで定義せず直接letで設定しているのは何か意味がある？？
let rpgState = {
  isNamingCharacter: true,

  enemyName: "Bad Guy",
  enemyMaxHp: 200,
  enemyHp: 200,

  allyName: "You",
  allyHp: 50,
  allyMaxHp: 50,

  isEnemyTurn: false,
  activityLog: [] as string[],

  buttleTimes: 0,
};

// Rpgstateはtypeで、rpgStateのデータ型をそのまま使う。（型推測）
type RpgState = typeof rpgState;


//　
function CharacterView(props: CharacterViewProps) {
  let inner = <div className="w5 pa2 ba b--black tc">
    <div>
      <img src={props.image} className="h4"/>
    </div>

    <div>
      Name: {props.name}
    </div>

    <div>
      HP: {props.hp} / {props.maxHp}
    </div>
  </div>;

  if (props.left) {
    return <div className="fl">
      {inner}
    </div>
  }

  if (props.right) {
    return <div className="fr">
      {inner}
    </div>
  }

  return inner;
}

function Container(props: { children?: React.ReactNode }) {
  return <div className="vh-100 dt w-100">
    <div className="h-50 dtc v-mid cf">
      <div className="w6 center">
        {props.children}
      </div>
    </div>
  </div>
}


// 2-2. onSetName
function handleSetName() {
  rpgState.isNamingCharacter = false;
  renderRpg();
}

//　2-3. onChangeName
function handleChangeName(event: React.FormEvent) {
  let input = event.target as HTMLInputElement;
  rpgState.allyName = input.value;
  renderRpg();
}

// 2-4.　onSelectAction
function handleSelectAction(action: string) {
    if (rpgState.allyHp > 0 && rpgState.enemyHp > 0) {
        let damage = 0;
        if (action === "Attack") {
            damage = randomNumber(20, 50);
            dealEnemyDamage(rpgState, damage, "attack");
        }

        if (action === "Fire") {
            damage = randomNumber(30, 40);
            dealEnemyDamage(rpgState, damage, "fire");
        }

        if (action === "Cure") {
            let cure = randomNumber(20, 80);
            rpgState.activityLog.push("You cured " + cure + " HP with your Cure spell!");
            rpgState.allyHp += cure;

            if (rpgState.allyHp > rpgState.allyMaxHp) {
                rpgState.allyHp = rpgState.allyMaxHp;
            }
        }

    if (rpgState.allyHp < 0 ) {
        rpgState.allyHp = 0;
        rpgState.activityLog.push("Game Over");
        renderRpg();
    } else {
        if (rpgState.enemyHp < 0) {
            rpgState.enemyHp = 0;
            rpgState.activityLog.push("You win!");

            rpgState.buttleTimes += 1;
            renderRpg();
        } else {
            enemyTurn();
            renderRpg();
        }
    }
    } else {
        renderRpg();
    }
}

function dealEnemyDamage(rpgState: RpgState,
                         damage: number,
                         attackDescription: string) {
        rpgState.activityLog.push("You dealt " + damage + " damage with your " + attackDescription + "!");
        rpgState.enemyHp -= damage;
}

function enemyTurn() {
    if (rpgState.enemyHp > 0) {
      let damage = randomNumber(1, 20);
      rpgState.activityLog.push("The enemy dealt " + damage + " to you!");
      rpgState.allyHp -= damage;

      if (rpgState.allyHp <0) {
          rpgState.allyHp = 0;
          rpgState.activityLog.push("Game Over");
          renderRpg();
      }
    }
}

function randomNumber(low: number, high: number) {
  return Math.floor(Math.random() * (high - low + 1)) + low;
}
