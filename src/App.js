import logo from "./logo.svg";
import "./App.css";
import Box from "./component/Box";
import { useState } from "react";
import userEvent from "@testing-library/user-event";
//1. 박스 2개(타이틀, 사진, 결과)
//2. 가위바위보 버튼이 있다
//3.버튼 클릭하면 클릭한 값이 박스에 보임
// 4. 컴퓨터는 랜덤하게 선택
// 5. 3,4 결과를 가지고 누가 이겼는지 승패를 따진다
// 6. 승패 결과에 따라 테두리 색이 바뀐다(이기면 초록, 지면 빨강, 비기면 검정)

const choice = {
  rock: {
    name: "Rock",
    img: "https://cdn-icons-png.flaticon.com/512/5853/5853550.png",
  },
  scissors: {
    name: "Scissors",
    img: "data:image/png;base64,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",
  },
  paper: {
    name: "Paper",
    img: "https://blog.kakaocdn.net/dn/bmjB2s/btqXHhp6kpG/TH14W4U612SxKo9uuR2sB0/img.png",
  },
};
function App() {
  const [userSelect, setUserSelect] = useState(null);
  const [computerSelect, setComputerSelect] = useState(null);
  const [result, setResult] = useState("");
  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let computerChoice = randomChoice();
    setComputerSelect(computerChoice);
    setResult(judgement(choice[userChoice], computerChoice));
  };

  const randomChoice = () => {
    let itemArray = Object.keys(choice); //객체에 키값만 뽑아서 어레이로 만들어주는 함수다
    console.log("item array", itemArray);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    console.log("random value", randomItem);
    let final = itemArray[randomItem];
    return choice[final];
  };
  const judgement = (user, computer) => {
    console.log("user", user, "computer", computer);

    // user == computer tie
    // user == rock, computer == "scissors" user 이긴거지
    // user == "rock" computer == paper   user 진거지
    // user == scissors computer paper    user 이긴거지
    // user == scissors computer rock     user 진거지
    // user == paper computer rock   user 이긴거지
    // user paper computer scissors user 진거지

    if (user.name == computer.name) {
      return "tie";
    } else if (user.name == "Rock")
      return computer.name == "Scissors" ? "win" : "lose";
    else if (user.name == "Scissors")
      return computer.name == "Paper" ? "win" : "lose";
    else if (user.name == "Paper")
      return computer.name == "Rock" ? "win" : "lose";
  };
  return (
    <div>
      <div className="main">
        <Box title="You" item={userSelect} result={result} />
        <Box title="Computer" item={computerSelect} result={result} />
      </div>
      <div className="main">
        <button onClick={() => play("scissors")}>가위</button>
        <button onClick={() => play("rock")}>바위</button>
        <button onClick={() => play("paper")}>보</button>
      </div>
    </div>
  );
}

export default App;