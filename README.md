# 세무사 모의고사 점수 공유 앱 백엔드

## 어려웠던 점
### 1. 순위 기록하기
- 점수 입력시 순위를 입력시키기 위해 , 먼저 rank를 제외한 해당 과목 점수를 만들고 이후 기존의 점수들과 비교 하여 rank를 업데이트 하는 방식으로 적용
- 따라서 rank 필드는 필수로 지정 X
 