//1. 가져온 본문에서 단어들의 배열을 얻기
function getWords(text) {
    return text
        .toLowerCase()
        .replace(/[.,!?;:'"‘’“”()\[\]_*]/g, " ")
        .split(/\s+/)
        .filter(w => w.length > 0);
}
//2. 가져온 배열에서 불용어를 제거하기 
function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}

//3. 단어들의 배열을 객체로 만들기 
function countWords(words) {
    const counts = {};
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}
// 4. {단어: 빈도} 객체에서 상위 n개의 배열 얻기 
function topN(counts, n) {
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}

// top: 상위 n개의 배열 
function drawChart(selector, top, color) {   // 3 개의 인수
    const canvas = document.querySelector(selector);
    return new Chart(canvas, {  // 여러개의 차트가 나왔을 때 더욱 유연하게 대처하기 위해 return을 써준다. 
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