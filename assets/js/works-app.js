function countChar(text, target) {
    let count = 0;
    for (const ch of text) {
        if (ch === target) count++;
    }
    return count;
}

const targets = ["이", "의", "는", "가", "을"];

const btnBox  = document.querySelector("#work-buttons");
const nowBox  = document.querySelector("#now-showing");
const list     = document.querySelector("#freq-list");
const topBox  = document.querySelector("#top-char");

fetch("/data/works.json")
    .then(response => response.json())
    .then(works => {
        for (const work of works) {
            const btn = document.createElement("button"); //버튼 새로 만듬. 그 안에 들어갈 글자 크기에 딱 맞게 기본 자동 생성됨 
            btn.textContent = work.title;  //버튼에 제목 넣기 
            btn.addEventListener("click", () => analyze(work)); //버튼 두르면 분석 함수 실행되게 설정
            btnBox.appendChild(btn); // html 빈그릇 btnBox 에 버튼 하위로 집어넣기 
        }
    });

function analyze(work) {
    fetch(work.file)  // 여기서 뭘 받아오는거지?? 
        .then(response => response.text())
        .then(text => {
            nowBox.textContent = `[${work.title}] 분석 결과`;
            const counts = targets.map(t => countChar(text, t));
            drawList(targets, counts);
            drawTop(targets, counts);
        });
}

function drawList(targets, counts) {
  list.textContent = "";
  for (let i = 0; i < targets.length; i++) {
    const li = document.createElement("li");
    li.textContent = `'${targets[i]}': ${counts[i]}번`;
    list.appendChild(li);
  }
}

function drawTop(targets, counts) {
  let maxIdx = 0;
  for (let i = 1; i < counts.length; i++) {
    if (counts[i] > counts[maxIdx]) maxIdx = i;
  }
  topBox.textContent = 
    `가장 자주 나온 글자: ${targets[maxIdx]} (${counts[maxIdx]}번)`;
    topBox.style.fontWeight = "bold";
    topBox.style.color = "crimson";  // topBox 에 값이 채워졌고, 스타일도 지정
}
