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

fetch("/data/nobel-literature.csv")
.then(response => response.text())
.then(csv => {
    const rows = csv
        .split("\n")  //줄 단위로 나눔
        .slice(1) // 헤더 떼기. 2번째 줄 부터 남긴다
        .filter(line => line.trim() !== "") // 빈 줄 떼기
        .map(line => {
            const cols = line.split(",");
            return {
                decade: Number(cols[0]),
                count: Number(cols[1]),
            };
        });
    const labels = rows.map(r => `${r.decade}년대`);
    const counts = rows.map(r => r.count);
    const canvas = document.querySelector("#q2-chart")

    new Chart(canvas, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "수상자 수",
                    data: counts,
                    borderColor: "rgba(54,162,235,1)",
                    backgroundColor: "rgba(54,162,235,0.2)"
                }
            ]
        },
        options: { 
            plugins: {
                title: {
                    text: "노벨문학상 수상자 수 추이 (10년 단위)",
                    display: true
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "수상자 수"
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: "연대"
                        }
                    }
                }
            }
        }
    })
});
