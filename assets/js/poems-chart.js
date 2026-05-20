fetch("/data/poems.csv")
    .then(response => response.text())
    .then(csv => {
        const data = csv
            .split("\n")  //줄바꿈 문자로 행별로 분할
            .slice(1)  //0번행 (헤더)는 버림 
            .filter(line => line.trim() !== "") //빈 문자열이 아닌 것만 남긴다. 
            .map(line => {
                const cols = line.split(","); //지금은 한 행 덩어리 단위로 나누어져 있으므로, 컴마 단위로 나누어준다. 
                return {   //3개의 속성을 가지는 객체로 반환
                    year:   Number(cols[0]),   // [{ year: 1925, author: "김소월", count: 127 },....]
                    author: cols[1].trim(),
                    count:  Number(cols[2]),
                };
            });
        drawChart(data);    //객체의 배열에 함수를 적용
    });

    function drawChart(rows) {
    const labels = rows.map(r => r.author);    // ["김소월", "이상", ...]
    const counts = rows.map(r => r.count);     // [127, 42, 18, 89]

    const canvas = document.querySelector("#poems-chart");
    new Chart(canvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{ label: "작품 편수", data: counts }],
        },
    });
}