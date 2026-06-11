---
layout: page
title: 두 소설의 단어 빈도 비교
permalink: /compare/
---

<h2>A Study in Scarlet vs. The Hound of the Baskervilles</h2>
<div style="display: flex; gap: 1em;">
    <div style="flex: 1;"><h3>A Study in Scarlet</h3>
        <div style="height: 500px;"><canvas id="chart-scarlet"></canvas></div>
    </div>
    <div style="flex: 1;"><h3>The Hound of the Baskervilles</h3>
        <div style="height: 500px;"><canvas id="chart-hound"></canvas></div>
    </div>
</div>
{% include chartjs.html %}  // 순서 중요. 필요한 것들을 먼저 읽어야 다음 동작이 가능한 것들이 존재함 
<script src="/assets/js/analysis.js"></script>
<script src="/assets/js/compare.js"></script>
