---
layout: page
title: [숙제13] 텍스트 분석 도구 구현
permalink: /gothic/
---

# [숙제13] 텍스트 분석 도구 구현

<!-- Q1: 두 고딕 소설의 상위 30개 단어 비교 -->
<h2>Frankenstein vs. Dracula -- 상위 30개 단어</h2>

1

<div style="display: flex; gap: 1em;">
    <div style="flex: 1;">
        <h3>Frankenstein (Shelley, 1818)</h3>
        <div style="height: 600px;">
            <canvas id="chart-frankenstein"></canvas>
        </div>
    </div>
    <div style="flex: 1;">
        <h3>Dracula (Stoker, 1897)</h3>
        <div style="height: 600px;">
            <canvas id="chart-dracula"></canvas>
        </div>
    </div>
</div>

<!-- Q2: 보고서 (아래에 작성) -->
## 보고서

### 추가한 불용어와 근거

NLTK 기본 목록 외에 다음 N개의 단어를 "data/stopwords-custom.txt"에 추가했다: "one","could","yet","would","said","may","time","even","upon","day","felt","every","think","through","thus","must","saw"

고딕소설은 중세시대를 무대로 공포와 로맨스가 결합된 장르이다. 초현실적이고 음산한 분위기가 특징이다. 때문에 그러한 분위기 형성에 기여하는 **형용사와 명사 위주의 결과를 얻는 것**이 더욱 유리하므로 단순 연결어, 지각 동사 및 조동사 등은 제외하였다. 

### 두 작품의 단어 빈도가 들려주는 이야기

- **공통으로 도드라지는 단어**:  "night", 
- **한 작품에만 도드라지는 단어** : Frankenstein에서는 miserable, death, father과 같은 단어가 도드라지는데, 이는 인간으로서의 존재론적 고뇌를 다루는 작품의 주제를 잘 반영하고 있다. 반면, Dracula는 Frankenstein과 비교했을 때 보다 역동적이고 외부의 사건이 전개의 중심이 되는 이야기인 듯 하다. came, go, took, went와 같은 동작 동사들이 많이 사용되었다. 


{% include chartjs.html %}  // 순서 중요. 필요한 것들을 먼저 읽어야 다음 동작이 가능한 것들이 존재함 
<script src="/assets/js/analysis.js"></script>
<script src="/assets/js/gothic.js"></script>
