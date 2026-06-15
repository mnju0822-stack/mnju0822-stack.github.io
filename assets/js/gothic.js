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



Promise.all([
    fetch("/data/frankenstein.txt").then(r => r.text()),
    fetch("/data/dracula.txt").then(r => r.text()),
    fetch("/data/stopwords-en.txt").then(r => r.text()),
    fetch("/data/stopwords-custom.txt").then(r => r.text()),
]).then(([frankText, dracText, baseStop, customStop]) => {
    
    const stopwords = (baseStop + "\n" + customStop)
        .split(/\s+/)
        .filter(w => w.length > 0);

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