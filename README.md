## 📌 개요

- **`프로젝트 명`:** Simple Board
- **`한 줄 소개`:** 사용자 인증과 게시글 CRUD 기능을 제공하는 웹 애플리케이션
- **`배포 주소`:** [https://simple-board-ten.vercel.app](https://simple-board-ten.vercel.app)

<br/>

## 🛠️ 기술 스택

<p> <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white"> <img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=ReactQuery&logoColor=white"> <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white"> <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=TailwindCSS&logoColor=white"> </p>

<br/>

## 🎯 구현 기능


#### 🔐 인증 기능

 1. 회원가입 / 로그인
- 이메일, 비밀번호, 비밀번호 확인, 이름 입력 폼 구현
- **Zod를 활용한 클라이언트 사이드 유효성 검사**
  - **이메일**: 올바른 이메일 형식 검증
  - **비밀번호**: 
    - 8자 이상
    - 영문/숫자/특수문자(!%*#?&) 조합 필수
  - **비밀번호 확인**: 비밀번호 일치 여부 검증
- 회원가입 완료 시 로그인 페이지로 자동 이동

 2. 로그아웃
- 헤더에 로그아웃 버튼 제공
- Access Token 및 Refresh Token 삭제
- 사용자 상태 초기화
- 로그인 페이지로 리다이렉트

 3. 사용자 정보 표시
- JWT 토큰 디코딩을 통한 사용자 정보 추출
- 로그인한 사용자 정보(이름)를 헤더에 표시
- **AuthContext를 통한 전역 사용자 상태 관리**

 4. 인증 토큰 자동 갱신
- **새로고침 시 인증 유실 방지**: Refresh Token으로 Access Token 자동 갱신
- **Axios Interceptor 기반 자동 처리**
  - 요청 시 Authorization 헤더에 Access Token 자동 첨부
  - 403 Forbidden 응답 시 Refresh Token으로 Access Token 자동 갱신
  - 토큰 갱신 실패 시 토큰 삭제 후 로그인 페이지로 이동

 5. 사용자 인증 상태 복원
- 앱 초기화 시 `initAuth` 함수를 통해 인증 상태 자동 복원
- 새로고침 후에도 사용자 세션 유지
- 초기 인증 확인 중 로딩 상태 표시 (`isInitializing`)
- 로딩 완료 전까지 인증 관련 UI 렌더링 방지

 6. Protected Router를 통한 접근 제어
- 인증되지 않은 사용자의 보호된 라우트 접근 차단
- AuthContext를 통한 인증 상태 확인
- 인증 로딩 중에는 로딩 UI 표시
- 인증 실패 시 로그인 페이지로 자동 리다이렉트 (`replace` 옵션 사용)



#### 📋 게시글 CRUD 기능

 1. 게시글 생성
- **폼 구현**
  - React Hook Form + FormProvider 기반 폼 관리
  - Controller를 활용한 Select 컴포넌트 제어
  - 카테고리 선택 (Suspense Query로 카테고리 목록 동적 로드)
  - 제목/내용 입력 필드
- **이미지 업로드**
  - 파일 선택 및 미리보기 기능
  - 이미지 삭제 기능 (hover 시 삭제 버튼 표시)
- **제출 및 피드백**
  - useMutation으로 생성 API 호출
  - Toast 알림으로 로딩/성공/실패 상태 표시
  - 생성 성공 시 목록으로 자동 리다이렉트
  - `invalidateQueries`로 최신 데이터 반영

 2. 게시글 목록 조회
- **무한 스크롤(Infinite Scroll) 구현**
  - IntersectionObserver 기반 자동 페이지 로딩
  - 로딩/빈 상태/완료 상태 UI 처리
- 목록 아이템 클릭 시 상세 페이지로 이동

 3. 게시글 상세 조회
- 이미지 Lazy Loading (`LazyImage` 컴포넌트로 렌더링 최적화)
- 수정/삭제 액션 버튼 제공

 4. 게시글 수정
- **생성과 수정에서 동일한 폼 컴포넌트 재사용** (`PostForm`)
- 기존 이미지 프리뷰 표시 (`defPreview` props)
- 이미지 업로드 시 미리보기 제공
- Toast 알림으로 진행/성공/실패 상태 표시
- 수정 성공 시 `invalidateQueries`로 최신 데이터 반영

 5. 게시글 삭제
- Toast 알림으로 삭제 진행 상황 표시
- 삭제 후 목록으로 자동 리다이렉트
- `invalidateQueries`로 캐시 무효화


<br/>

## 🚀 시작하기

### 1️⃣ 의존성 설치

```bash
pnpm install
```
### 2️⃣ 환경변수 설정

루트에 .env.local을 만들고 아래 값을 채웁니다.

**필요한 환경변수:**

| 변수명                        | 설명                      |
| ----------------------------- | ------------------------- |
| `VITE_API_BASE_URL` | api baseurl을 기재해주세요. |


### 3️⃣ 개발 서버 실행

```bash
pnpm dev
```

브라우저에서 `http://localhost:5173` 으로 접속합니다.

<br/>
