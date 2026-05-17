// [숙제11] 동적 웹 페이지 구현
// 2024-18555 문지유

// Q1
const themeBtn = document.querySelector("#theme-btn");
const qlBox = document.querySelector("#ql-box");

themeBtn.addEventListener("click", toggleDark)

function toggleDark() {
    qlBox.classList.toggle("dark")
    
    if (qlBox.classList.contains("dark")){ //검정 배경 됨 
        themeBtn.textContent = "라이트모드"
    }else {
        themeBtn.textContent = "다크 모드" //dark 없을 때 
    }
}



// Q2
const input = document.querySelector("#q2-input")
const count = document.querySelector("#q2-count")
const warn = document.querySelector("#q2-warn")

input.addEventListener("input", q2function);
    
function q2function() {
    const lengthNow = e.target.value.length; 
    count.textContent = `현재 글자 수: ${lengthNow}자`;

    if(lengthNow >= 100){
        warn.textContent = "100자를 넘었습니다";
        warn.style.color = "crimson";
    } else {
        warn.textContent = "";
    }
}