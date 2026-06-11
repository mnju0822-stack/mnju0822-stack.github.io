//1. 본문만 가져오기 
function extractBody(text) {
    const startMark = "*** START OF THE PROJECT GUTENBERG EBOOK";
    const endMark   = "*** END OF THE PROJECT GUTENBERG EBOOK";

    const startIdx = text.indexOf(startMark);
    const endIdx   = text.indexOf(endMark);

    // 시작 표시 다음 줄부터 끝 표시 직전까지
    return text.slice(startIdx, endIdx);
}

function analyze(text, stopwords) {  //analysis.js 에서 가져오는 함수들 
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

