// [숙제10] JavaScaript 기초 연습
// 2024-18555 문지유

//Q1
function classifyEra(year) {
    if (year < 1910) {
        return "개화기 이전";
    } else if (year < 1945) {
        return "일제강점기";
    } else if (year < 1990) {
        return "해방 이후~현대";
    } else {
        return "동시대";
    }
}

const years = [1908, 1936, 1972, 2025];
for (const y of years) {
    let era = classifyEra(y)
    console.log(`${y}년: ${era}`)
}

// Q2
const works = ["날개", "오감도", "지주회시", "종생기", "권태"];

console.log(works.length);
console.log(works[0]);
console.log(works[works.length - 1]);

const titled = works.map(w => `「${w}」`); // 새 배열 
console.log(titled);

const long = works.filter(w => w.length >= 3);
console.log(long);

for (let i = 0; i < long.length; i++) {
    console.log(`${i + 1}번째 작품: ${long[i]}`);
} 

// Q3
function countChar(text, target) {
    let count = 0; 
     for (const ch of text) {
        if (ch === target) {
            count++; 
        }
    }
    return count; // 최종 횟수를 돌려줌
}

const cases = [
    { txt: "박씨는 이씨에게 시집간 김씨의 외사촌 동생이다.", tar: "씨" },
    { txt: "이상의 「날개」는 1936년 작품이다.", tar: "이" },
    { txt: "banana", tar: "a" }
];

for (const c of cases) {
    const result = countChar(c.txt, c.tar);
    console.log(`"${c.txt}"에서 '${c.tar}'는 ${result}번 등장합니다.`);
}

//Q4
const text = "이상의 「날개」는 1936년에 발표된 단편소설이다.";
const targets = ["이", "의", "날", "개", "소"];

const counts = targets.map(m => countChar(text,m));
console.log(counts)

for (let i = 0; i < targets.length; i++) {
    console.log(`'${targets[i]}': ${counts[i]}번`);
}

const frequent = targets.filter(f => countChar(text, f) >= 2)
console.log(frequent)

let maxIdx = 0;
for (let i = 1; i < counts.length; i++) {
    if (counts[i] > counts[maxIdx]) {
        maxIdx = i;
    }
}
const best = targets[maxIdx];
console.log(`가장 자주 나온 글자: '${best}' (${counts[maxIdx]}번)`);