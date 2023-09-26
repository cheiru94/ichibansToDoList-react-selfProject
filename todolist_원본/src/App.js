import { useState } from "react";
import "./App.css";

function App() {
  let [post, setPost] = useState(["為せば成る", "日々精進", "七転び八起き"]);

  const $input = document.querySelector("input");
  let [inputValue, setInputValue] = useState(""); // Input 입력값 저장

  let [visible, setVisible] = useState(false);

  return (
    <div className='App'>
      {/* Inner */}
      <div className='inner'>
        {/* TOP */}
        <div className='top'>
          <h4>TO DO LIST!</h4>
          <div className='box'>
            <div className='plane'>🛩️</div>
          </div>

          {/* ITEMS__ INPUT + BUTTON */}
          <div className='top__items'>
            <input
              className='registerPost'
              placeholder='今日はどんなお楽しみがおるかの～'
              onChange={(event) => {
                setInputValue((inputValue = event.target.value));
                console.log({ inputValue }); //확인용
              }}
            ></input>
            <button
              className='btn-addTask'
              onClick={() => {
                let copy = [...post];
                copy.push(inputValue);
                // inputValue 값이 없으면 등록하지 않음
                if (!inputValue) {
                  return setVisible(true);
                }
                setVisible(false);
                setPost(copy);
                $input.value = "";
                $input.focus();
                setInputValue((inputValue = ""));
              }}
            >
              Add Task!
            </button>
            {visible ? <Alert /> : null}
          </div>
        </div>

        {/* MAIN */}
        <div className='main'>
          <h3>Have a nice day~! 🦊</h3>

          {post.map(function (element, index) {
            return (
              <div key={index}>
                <input className='post' value={post[index]}></input>
                <BtnImportant />
                <BtnClear index={index} post={post} setPost={setPost} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* Component */

// 1. Btn_Important
function BtnImportant(props) {
  const [style, setStyle] = useState({});
  const [trunOnOff, setTrunOnOff] = useState(false);

  const handleClick = () => {
    setTrunOnOff(!trunOnOff); // trunOnOff 값을 반전시킴

    // trunOnOff 값에 따라 버튼 스타일 변경
    if (!trunOnOff) {
      setStyle({ background: "rgba(34, 156, 243, 1)" });
    } else {
      setStyle({});
    }
  };

  return (
    <button className='btn-post-Important' onClick={handleClick} style={style}>
      🥕
    </button>
  );
}

// 2. Btn_clear
function BtnClear(props) {
  return (
    <button
      className='btn-post-clear'
      onClick={() => {
        let copy = [...props.post];
        copy.splice(props.index, 1);
        props.setPost(copy);
      }}
    >
      Clear
    </button>
  );
}

// 3. alert module
function Alert(props) {
  return <p>Enter a letter!!</p>;
}
export default App;
