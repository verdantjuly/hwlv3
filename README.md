# API 안내

## 계정  
/signup POST 회원가입  
/login POST 로그인  
 
## 게시글 CRUD   
/posts GET 게시글 전체 불러오기  
/posts/:postid GET 게시글 1개 불러오기  
/posts POST 게시글 작성하기   
/posts/:postid PATCH 게시글 수정하기  
/posts/:postid DELETE 게시글 삭제하기  

## 댓글 CRUD  
/comments/:postid GET 댓글 전체 조회하기   
/comments/:postid POST 댓글 작성하기  
/comments/:commentid PATCH 댓글 수정하기  
/comments/:commentid DELETE 댓글 삭제하기   