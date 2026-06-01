//1. 본문만 가져오기 
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark   = "*** END OF THE PROJECT GUTENBERG EBOOK";

    const startIdx = text.indexOf(startMark);
    const endIdx   = text.indexOf(endMark);

    // 시작 표시 다음 줄부터 끝 표시 직전까지
    return text.slice(startIdx, endIdx);
}
//2. 가져온 본문에서 단어들의 배열을 얻기
function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“”()\[\]_*]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 0);
}
//3. 가져온 배열에서 불용어를 제거하기 
function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}


function countWords(words) {
    const counts = {};
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}
// 5. {단어: 빈도} 객체에서 상위 n개의 배열 얻기 
function topN(counts, n) {
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}

function analyze(text, stopwords) {
    const body    = extractBody(text);
    const words   = getWords(body);
    const cleaned = removeStopwords(words, stopwords);
    const counts  = countWords(cleaned);
    return topN(counts, 30);
}

//파일 읽고 처리하기 

Promise.all([
    fetch("/data/scarlet.txt").then(r => r.text()),
    fetch("/data/hound.txt").then(r => r.text()),
    fetch("/data/stopwords-en.txt").then(r => r.text()),
]).then(([scarletText, houndText, stopwordsText]) => {
    const stopwords = stopwordsText.split(/\s+/)   //불용어의 배열 
                                    .filter(w => w.length > 0); //0을 초과하는 경우만 가져옴
    
    const scarletTop = analyze(scarletText, stopwords); // 상위 n개의 배열 
    const houndTop   = analyze(houndText,   stopwords);
    
    drawChart("#chart-scarlet", scarletTop, // 캔버스 아이디를 먼저 만들어줌 + 상위 30개 단어 
              "rgba(220, 53, 69, 0.6)");
    drawChart("#chart-hound", houndTop,
              "rgba(54, 162, 235, 0.6)");
});

function drawChart(selector, top, color) {   // 3 개의 인수
    const canvas = document.querySelector(selector);
    new Chart(canvas, {
        type: "bar", //단어가 몇 번 나왔는지 이므로 막대그래프로 표시 
        data: {   //data는 x축(labels)과 y축 정보를 포함하는 또 하나의 객체를 가짐 
            labels: top.map(item => item[0]),  //top 에 있는 모든 아이템에서 0번을 받아옴
            datasets: [{
                label: "빈도", 
                data: top.map(item => item[1]),  // y축의 값들 
                backgroundColor: color,
            }],
        },
        options: {
            indexAxis: "y",                             // 가로로 긴 막대가 나옴 
            maintainAspectRatio: false,                 // 비율 보존 안 함 --> 세로로 긴 그림을 그릴 수 있게 됨; 부모 <div> height에 맞춤
            scales: {              // scales 도 x, y정보에 대한 객체를 가짐. 
                x: { beginAtZero: true },   // 막대그래프 옵션 : 0부터 시작한다. 
                y: { ticks: { autoSkip: false } },      // {ticks : {객체}}  : 끊겨서 나오는 것을 방지한다. 
            },
        },
    });
}