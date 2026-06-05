// [숙제13] 텍스트 분석 도구 구현
// 2024-18555 문지유

// --- 함수 정의들 (21강 코드 재사용) ---

function extractBody(text) {
    // 힌트: 모든 문자를 대문자로 변환하여 검색하면 대소문자 오류를 방지할 수 있습니다.
    const upperText = text.toUpperCase();
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark = "*** END OF THE PROJECT GUTENBERG EBOOK";
    
    const startIdx = upperText.indexOf(startMark);
    const endIdx = upperText.indexOf(endMark);

    return text.slice(startIdx + startMark.length, endIdx);
}


function getWords(text) {
    return text.toLowerCase()
        .replace(/[.,!?;:"'()\[\]_]/g, " ") // 단어 사이의 구두점을 공백으로 치환
        .split(/\s+/)                       // 공백 기준으로 나누기
        .filter(w => w.length > 0);
}

function countWords(words) {
    const counts = {};
    for (const word of words) {
        counts[word] = (counts[word] || 0) + 1;
    }
    return counts;
}

function removeStopwords(words, stopwords) {
    return words.filter(w => !stopwords.includes(w));
}

function topN(counts, n) {
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, n);
}


function drawChart(selector, top, color) {
    const canvas = document.querySelector(selector);
    new Chart(canvas, {
        type: "bar",
        data: {
            labels: top.map(item => item[0]),
            datasets: [{
                label: "빈도",
                data: top.map(item => item[1]),
                backgroundColor: color,
            }],
        },
        options: {
            indexAxis: "y",
            maintainAspectRatio: false, // div 높이
            scales: {
                x: { beginAtZero: true },
                y: { ticks: { autoSkip: false } } // 30개 라벨 모두 표시
            },
        },
    });
}

Promise.all([
    fetch("/data/frankenstein.txt").then(r => r.text()),
    fetch("/data/dracula.txt").then(r => r.text()),
    fetch("/data/stopwords-en.txt").then(r => r.text()),
]).then(([frankText, dracText, stopText]) => {
    
    const stopwords = stopText.split(/\s+/).filter(w => w.length > 0);

    function analyze(text, stopwords) {
        const body = extractBody(text);
        const words = getWords(body);
        const cleaned = removeStopwords(words, stopwords);
        const counts = countWords(cleaned);
        return topN(counts, 30);
    }

    drawChart("#chart-frankenstein", analyze(frankText, stopwords), "rgba(40, 167, 69, 0.6)");
    drawChart("#chart-dracula", analyze(dracText, stopwords), "rgba(220, 53, 69, 0.6)");
});