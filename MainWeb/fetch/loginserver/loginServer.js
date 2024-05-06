const express = require('express');
const app = express();
const port = 4004;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/', (req, res) => {
    res.send('Hi');
  });

  app.listen(port, () => {
    console.log(`Hello`)
  })

  let id = '1';

  const doList= [{
    id : '',
    logname: '',
  }]

  const LoginDB= [{
    id : '',
    passwordname : '',
    passwordcheck  : "",
  }]
  /* 값 받는 함수 배열 정의
   값을 받는 함수는 무조건 배열로 감싸야함
   dolist =[{}]
   배열로 감싸고 안에 값을 넣어줘야함
  */
    
  app.get("/api", (req,res)=> {
    res.json(doList);
  });

  app.get("/api", (req,res)=> {
    res.json(LoginDB);
  });


  app.post('/api',(req,res) =>{
    const { passwordname , passwordcheck } = req.body;
    console.log('req.body : ', req.body );

    doList.push({
      id: id++,
      passwordname : passwordname,
      passwordcheck  :passwordcheck, 
      /* 
      post 형식으로 값을 다른 도메인에게 값을 건내주고 
      req.body에 값을 넣어 전송해줘야함 
      push로 배열안에 값을 넣어줘야함 
      */
    })
    return res.send('success');
  })

  app.post('/api',(req,res) =>{
    const { logname } = req.body;
    console.log('req.body : ', req.body );

    doList.push({
      id: id++,
      logname : logname,
      /* 
      post 형식으로 값을 다른 도메인에게 값을 건내주고 
      req.body에 값을 넣어 전송해줘야함 
      push로 배열안에 값을 넣어줘야함 
      */
    })
    return res.send('success');
  })



  /* 
  패키치 json 만드는법
  npm init

  node 자동 재실행 
  npm install nodemon --save-dev
  https://sjparkk-dev1og.tistory.com/51 <-이 사이트
  */