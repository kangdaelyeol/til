# Joint Photograpic Expert Group

- ### `손실 압축`방식을 사용하는 `이미지 압축 기술`이다.

## process

### 1. Color Spacing Transformation

- RGB인 색상 공간을 `Y'CbCr` 색상 공간으로 변환한다.

  - `Y': 휘도(luminance)`

  - `CbCr: blue-difference and red-difference chroma(색도, 채도)`

- RGB 색상 공간을 휘도, 채도로 구별함으로 써 `밝기 정보`를 유지 할 수 있다.

  - 우리의 눈은 빛을 감지하는 `간상세포(rod cell / 막대세포)`가 색을 감지하는 `원추세포(cone cell / 원뿔세포)`보다 훨씬 많다.

  - 즉 우리의 눈은 밝기 변화에 더욱 민감하기 때문에 색상을 일정 부분 손실해도 눈에 크게 띄지 않는다. 이를 위해 밝기 정보(luminance)를 따로 빼낸다.

### 2. Chroma Subsampling

- `표본을 추출(sampling)`하는데, 여기서 `색차 정보를 줄여서` 1차적으로 파일 크기를 줄인다.

  - 샘플링 비율은 일반적으로 3개의 비율로 나누는데, JPEG 압축방식에서 `4:2:0 sampling` 비율을 사용한다.

  - J:a:b 형식의 비율로 나눈다.

    - J: 수평 셈플링 기준 단위

    - a: J크기 셈플에서 첫 번째 행의 chroma sampling 수

    - b: J크기 셈플에서 두 번째 행의 chroma sampling 수

  - 4:2:0 방식은 4x2영역의 표본 단위로 샘플링한다.

  - a(2)값을 보면 4개의 크기에서 2개의 chroma로 sampling하므로 첫 번째 행은 두 배로 줄어든다.

  - b(0)값을 보면 chroma sampling을 하지 않으므로 이럴 땐 첫 번째 행의 색을 그대로 따라간다. 따라서 간접적으로 수직 방향도 1/2 sampling이 된다.

### 3. DCT(Discrete Cosine Transform) - 이산 코사인 변환

- DCT로 이미지 블록 데이터를 `주파수 도메인`으로 변환하는데, 이 값은 압축 효율을 높이는 데 사용된다.

- 이미지 데이터에 대해 높은 주파수, 낮은 주파수 영역을 찾는다.

  - 인접한 픽셀의 편차가 크면 주파수 성분이 높고, 편차가 작으면 낮은 주파수 성분이 나온다.

  - 경계선, texture 부분은 차이가 크기 때문에 주파수 값이 높게 나오고 배경처럼 고른 부분은 주파수가 낮게 나온다.

  - 높은 주파수 성분일 수록 값이 0과 가까워진다.

- `높은 주파수 성분`을 찾아 그 부분을 압축하기 위해 사용된다.

  - `우리의 눈은 높은 주파수 성분에 덜 민감`하기 때문에 이 부분에 있는 데이터를 줄이거나 없애도 크게 차이가 나지 않는다고 한다.

### 4. Quantization - 양자화

- DCT를 통해 추출한 각 주파수 성분을 특정 수준으로 반올림해서 크기를 줄인다.

- 이 과정에서 데이터가 많이 줄어든다고 한다.

- 여기서 `손실압축`의 특성이 발생한다.

### 5. Entropy Coding(encoding)

- [데이터의 중복성을 제거하는 무손실(lossless) 데이터 압축 방법이다.](https://en.wikipedia.org/wiki/Entropy_coding)

- JPEG에서는 [RLE(Run-Length Encoding)](https://en.wikipedia.org/wiki/Run-length_encoding) 이후 [Huffman coding](https://en.wikipedia.org/wiki/Huffman_coding)을 통해 압축한다고 한다.

  - 양자화까지 마친 데이터는 `연속된 데이터값 패턴`이 많기 때문에 RLE로 길이를 최소화 한다.

  - Huffpan Coding으로 빈도에 따라 데이터의 길이를 결정해 한 번더 줄인다.
