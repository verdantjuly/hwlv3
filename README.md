# API 안내  

## 계정  
POST /signup 회원 가입  
POST /login 로그인  

## 게시글 CRUD  
GET /posts 게시글 전체 조회  
GET /posts/:id 게시글 상세 조회  
POST /posts 게시글 작성  
POST /posts/:id 게시글 수정  
POST /posts/:id 게시글 삭제  

## 안내  
프론트엔드와의 연결을 연습하는 것이 좋을 것 같아 
html을 2개 작성하여 연결하였습니다.
form 태그로 데이터를 주고 받는 법을 익혔는데 
form 태그의 경우 method를 GET과 POST만 사용할 수 있다고 하여
기존의 PATCH와 DELETE 메서드를 POST로 변경하였습니다.