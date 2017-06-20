import * as React from "react";
import * as ReactDom from "react-dom";

//　1. documentの読み込みが終わったらここへ。
export function renderRpg() {
    // 初期値は、どこでも置けるみたい
    rpgState.currentEnemy = rpgState.enemies[rpgState.buttleTimes % rpgState.enemies.length]
    // 2-1. state
  // 2-2~4. functionの設定
  // その要素に属性(props)があれば、渡す
  ReactDom.render(<Rpg
      state={rpgState}
      onSetName={handleSetName}
      onChangeName={handleChangeName}
      onChangeCharactor={handleChangeCharactor}
      onSelectAction={handleSelectAction}
  />, document.getElementById("content"));
}

// propsの定義1 -> ReactDom.renderで一緒に呼ばれているもの
interface RpgProps {
    state: RpgState
    onSetName: () => void
    onChangeName: (event: React.FormEvent) => void
    onChangeCharactor: (event: React.FormEvent) => void
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

// enemy
interface Enemy {
    name: string,
    maxHp: number,
    hp: number,
    image: string,
}

// 自分のキャラクターの設定
interface CharacterData {
    image: string
    maxHp: number
}

const charactersData: {[k: number]: CharacterData} = {
    1: {
        image: "https://vignette3.wikia.nocookie.net/8bittheater/images/0/0d/Red_Mage_Mime.jpg/revision/latest/scale-to-width-down/177?cb=20091020173310",
        maxHp: 200,
    },
    2: {
        image: "",
        maxHp: 250
    }
};



//　2. renderRpg()はこれ
function Rpg(props: RpgProps) {
    //  名前入れる最初の画面 -> まだ名前を入力していなかったら。
  　//  同じ画面でキャラクター選択、オンクリックでキャラクターID、名前を渡す
  if (props.state.isNamingCharacter) {
    return <Container>
      <div>
        Name your character: <input className="mr3"
                                    onChange={props.onChangeName}/>
        <div>
        Select your character:
          <input type="radio" name="ChooseCharactor" value={"1"}
                 onChange={props.onChangeCharactor} /> Chara1
          <input type="radio" name="ChooseCharactor" value={"2"}
                 onChange={props.onChangeCharactor} />  Chara2
        </div>

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

// RpgStateを元に、上で呼ばれた、メインの戦う画面のHTMLのコンポーネントを作る
// props: プロパティを渡しているだけ
function BattleScene(props: { state: RpgState }) {
        return <div>
            <CharacterView
                left
                image={props.state.allyImage}
                name={props.state.allyName}
                hp={props.state.allyHp}
                maxHp={props.state.allyMaxHp}/>

            <CharacterView
                right
                image={props.state.currentEnemy.image}
                name={props.state.enemies[rpgState.buttleTimes].name}
                hp={props.state.enemies[rpgState.buttleTimes].hp}
                maxHp={props.state.enemies[rpgState.buttleTimes].maxHp}
            />
        </div>

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

//　Clear画面
function EndingScene(){
    return <div>
        Conguraturation!<br/>
        You cleared this Game!!
    </div>
}

// コンポーネントを呼ぶための変数の型の定義？
// 2-1. stateの定義 => 初期値。
let rpgState = {

  isNamingCharacter: true,
  enemies: [
      {name: "Bad Guy",
       hp: 200,
       maxHp: 200,
       image: "https://s-media-cache-ak0.pinimg.com/originals/0a/a0/08/0aa00800bf6065938a3b9455883c3dea.gif"},
      {name: "Boss",
       hp: 500,
       maxHp: 500,
       image: "https://img.lancers.jp/proposal/8/7/873c2510fcb9220cbe7f54cb04d4f953e96c5e4d90fae703e528986fcb31c896_1863633_450_2328267.jpg?20130310081146"}
  ] as Enemy[],

  allyId: 1,
  allyName: "You",
  allyHp: 50,
  allyMaxHp: 50,
  allyImage: "",

  //state同士だと呼べない様子
  currentEnemy: null as Enemy,

  isEnemyTurn: false,
  activityLog: [] as string[],

  buttleTimes: 0,
  onNextEnemy: false,
};

// Rpgstateはtypeで、rpgStateのデータ型をそのまま使う。（型推測）
type RpgState = typeof rpgState;


//　コンポーネント化された中身がこれ？①
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

//　コンポーネント化された中身がこれ？②
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
  let character = charactersData[rpgState.allyId];
  rpgState.allyMaxHp = rpgState.allyHp = character.maxHp;
  rpgState.allyImage = character.image;
  renderRpg();
}

//　2-3. onChangeName
function handleChangeName(event: React.FormEvent) {
  let input = event.target as HTMLInputElement;
  rpgState.allyName = input.value;
  renderRpg();
}

function handleChangeCharactor(event: React.FormEvent){
    let checked = event.target as HTMLInputElement;
    rpgState.allyId = +checked.value;
}

// 2-4.　onSelectAction
function handleSelectAction(action: string) {

    if (rpgState.allyHp > 0 && rpgState.currentEnemy.hp > 0) {
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
        if (rpgState.currentEnemy.hp < 0) {
            rpgState.currentEnemy.hp = 0;
            rpgState.activityLog.push("You win!");

        //　次の敵へ
            rpgState.buttleTimes += 1;
            rpgState.currentEnemy = rpgState.enemies[rpgState.buttleTimes % rpgState.enemies.length];
            rpgState.currentEnemy.hp = rpgState.currentEnemy.maxHp;
            rpgState.allyHp = rpgState.allyMaxHp;
            rpgState.activityLog = [];
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
        rpgState.currentEnemy.hp -= damage;
}

function enemyTurn() {
    if (rpgState.currentEnemy.hp > 0) {
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

