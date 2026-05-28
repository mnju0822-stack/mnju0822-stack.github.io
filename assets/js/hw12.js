// [숙제12] 인문학 데이터 시각화
// 0000-00000 김인문

// Q1
fetch("/data/sillok.json")
.then(response => response.json())
.then(records => { 
    const labels = records.map(item => item.king);
    const counts = records.map(item => item.volumes);
    const canvas = document.querySelector("#q1-chart")
    new Chart(canvas, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [
                {
                label: "권 수",
                data: counts,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
                }
            ]
        },
        options: { 
            plugins: {
                title: {
                    text: "조선왕조실록 왕대별 권수",
                    display: true }
                },
            scales: {
                y: {
                beginAtZero: true
                }
            },
        }
        })
    })