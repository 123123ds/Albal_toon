const express = require('express');
const app = express();
const port = 10001;
const cors = require('cors');
const compression = require("compression");

app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

// sql 연동 
const mysql      = require('mysql2');
const dbconfig   = require('./sql.js');
const connection = mysql.createConnection(dbconfig);


// configuration =========================
app.set('port', process.env.PORT || 3001);
app.get('/', (req, res) => {
  res.send('Root');
});

app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

// 데이터 내용

// 로그인 중복확인
app.get('/', (req, res) => {  
  res.send('Hello World!');
  console.log(req.ip);
})

app.get('/user',(req,res)=>{
  res.json(todoList); 
})

const userId = [{
  text : ''
}]
app.post('/user',(req,res)=>{ 
    const { text } =  req.body;
  let uceom = {
  new_tablecol2 : text,
}
  connection.query("select count(*) cnt from new_table where new_tablecol2 =?", text,(error, rows) => {
  if (error) throw error;
  let con = connection.query("select count(*) cnt from new_table where new_tablecol2 =?",text)
  // connection.query("INSERT INTO new_table SET ? ",uceom);

  if(rows[0].cnt==0){
    userId.push({
      text : text 
    })
  }
  // console.log(userId)
  return res.send(rows[0]);
});
})  

// 전체적인 로그인 데이터 관리
const LoginDB= [{
      
}]



function LogDBPost(userId){
return new Promise((resolve)=>{
app.post('/userDB',(req,res) =>{
  const { passwordname , passwordcheck , User_Name , User_Fs_security, User_Back_security} = req.body;
  let NewDB = {
    idnew_table : 7,
    new_tablecol : passwordname.password,
    new_tablecol1 : passwordcheck.password,
    new_tablecol2 : userId.text,
    User_Name : User_Name.Name,
    User_ID : 1,
    User_Phone : 1 ,
    User_email : 1,
    User_Security_Number : User_Fs_security.Frontsecurity,
    User_Security_BackNumber : User_Back_security.Backsecurity,
  }
  
  console.log('req.body : ', req.body );

  let cont = connection.query("INSERT IGNORE INTO new_table SET ? ",NewDB,(error, rows) => {
    if (error) throw error;
    // connection.query("INSERT INTO new_table SET ? ",uceom);
    // console.log(cont.values);

    const FinishLoginDB = LoginDB[LoginDB.length-1].NewDB;

    console.log(FinishLoginDB);

    LoginDB.push({
      NewDB
    })
    resolve(NewDB); 
    res.json(NewDB); // JSON 형식으로 응답을 보냅니다.
  })
})
})
} 
/*
app.get("/userDB", (req,res)=>{
  
})
*/

app.get("/userDB", async (req,res)=> {
  res.json(LoginDB);
});

async function LoginDBsequence(){
  await LogDBPost()
  console.log(LoginDB);
}

LoginDBsequence()

// 메인 페이지 로그인 서버 

const UserLoginDB= [{
  id : '',
  User_Id : '',
  User_password  : "",
}]

app.get("/userLgoin", (req,res)=> {
  res.json(UserLoginDB);
});

app.post('/userLgoin',(req,res) =>{ 
  const { User_Id , User_password, } = req.body;
  console.log('req.body : ', req.body );
  let UsersubmitDB = {
    new_tablecol2 : User_password,
    new_tablecol : User_Id,
  }

  let LoginCheck = connection.query("select * from new_table where new_tablecol2 =? and new_tablecol =? ",[User_Id , User_password],(error, rows) => {
    if (error) throw error;
    // connection.query("INSERT INTO new_table SET ? ",uceom);
    console.log(rows[0]);
    if(rows[0]==undefined){
      console.log('아이디를 확인해주세요')
      UserLoginDB.push({
        Loginresult : '아이디를 확인해주세요'
      })
    }else{
      UserLoginDB.push({
        Loginresult : '로그인 완료',
        User_Name : rows[0].User_Name, 
        User_StoreName: rows[0].User_StoreName,
        User_Id : rows[0].new_tablecol2,
      })
      console.log('로그인 완료');
    }
    return res.send(UserLoginDB);     
  })
})

app.listen(port, () => {
  console.log(`Hello`)
})

// OusStore DB 전송
const StoreState = [];

app.post('/StoreDB2',(req,res) =>{ 
  const { UserFullID1 } = req.body;
  connection.query("select * from new_table where new_tablecol2 =? ",[UserFullID1] ,(error, rows) => {
    if (error) throw error;

    const represent_ID = rows[0].representId;
    connection.query("select * from User_StoreDB " ,(error, rows) => {
      if (error) throw error;
        for(i=0; i<rows.length; i++){
          StoreState.push({
          User_ID : rows[i].User_ID,
          User_StoreName : rows[i].User_StoreName,
          representative_User : rows[i].representative_User,
          representativeTel : rows[i].representativeTel,
          representative_Number : rows[i].representative_Number,
          Stroe_location : rows[i].Stroe_location,
          StoreMember : rows[i].StoreMember
          })
      } 
      let result = StoreState.filter( StoreState => StoreState.User_ID  === represent_ID );
      function resultqry() {
        return new Promise((resolve, reject) => {
          connection.query('SELECT (??) FROM User_Store_Member_List;', [rows[0].User_StoreName], (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              // map과 Promise.all을 사용하여 모든 비동기 작업을 처리
              Promise.all(results.map(result => {
                return new Promise((resolveInner, rejectInner) => {
                  connection.query("SELECT * FROM new_table WHERE new_tablecol2 = ?", [result['대구가톨릭대학교']], (error, rows) => {
                    if (error) {
                      rejectInner(error);
                    } else {
                      // 각 결과의 User_Name을 배열로 반환
                      resolveInner(rows.map(row => row.User_Name));
                    }
                  });
                });
              })).then(values => {
                // 모든 비동기 작업이 완료된 후, 결과 배열을 반환
                resolve(values.flat()); // flat()을 사용하여 중첩 배열을 단일 배열로 평탄화
              }).catch(error => {
                reject(error);
              });
            }
          });
        });
      }
         // Promise를 사용하여 결과 사용
    resultqry().then(user_names => {
      console.log(user_names); // 여기서 user_names는 모든 쿼리 결과의 User_Name 배열
      console.log(user_names.length);

      for(i=0; i<user_names.length; i++){
      result[0][`가게 멤버들${i}`] = user_names[i];
        console.log(result); 
      }
      return res.send(result);  
    }).catch(error => {
      console.error(error);
    });
 
      })  
  })

  })



  
  app.get('/StoreDB2',(req,res)=>{
    res.json(StoreState); 
  })



// 가게 스토어

const StoreData =[{
  Store_Name : '',
  UserFullName : '',
  representativeName : '',
  representativeTel : '',
  BusinessNumber : '',
  StoreLocation : ''
}]

app.get('/StoreDB',(req,res)=>{
  res.json(StoreData); 
})
// 유저 가게 이름 sql newstore
app.post('/StoreDB',(req,res)=>{ 
    const { Store_Name, UserFullID , representativeName, representativeTel, BusinessNumber, StoreLocation }  =  req.body;
      connection.query("select * from new_table where new_tablecol2=?", UserFullID ,(error, rows) => {
      if (error) throw error;
      connection.query("UPDATE new_table SET User_StoreName =? WHERE new_tablecol2 =?", [Store_Name.Name,UserFullID] , (error, result) => {
        if (error) throw error;
        connection.query("ALTER TABLE User_Store_Member_List ADD ?? VARCHAR(64)", [Store_Name.Name] , (error, result) => {
          if (error) throw error;
          const columnName = Store_Name.Name;
          const valueToInsert = UserFullID;
          
          const insertQuery = "INSERT INTO User_Store_Member_List (??) VALUES (?)";
          const insertValues = [columnName, valueToInsert];
          
          connection.query(insertQuery, insertValues, (error, result) => {
            if (error) throw error;
            console.log("값이 성공적으로 삽입되었습니다.");
          });
        });
      });
    })


    // 유져 가게 데이터 sql , NewStore
    const UserDB =[{
      User_ID : UserFullID,
      User_StoreName : Store_Name.Name,
      representative_User : representativeName.representativeName,
      representative_Number : BusinessNumber.BusinessNum,
      representativeTel : representativeTel.Tel,
      Stroe_location : StoreLocation.StoreLocation
    }]

    connection.query("INSERT IGNORE INTO User_StoreDB SET ? ",UserDB,(error, rows) => {
      if (error) throw error;
    })

    /*
      const neww ={
        User_StoreName : '지원가게이'
     }
       connection.query("INSERT IGNORE INTO new_table SET ?", neww ,(error, rows) => {
      if (error) throw error;
    })
*/
    StoreData.push({
      User_ID : UserFullID.UserFullID,
      Store_Name : Store_Name.Name,
      representative_User : representativeName.representativeName,
      representative_Number : BusinessNumber.BusinessNum,
      representativeTel : representativeTel.Tel,
      Stroe_location : StoreLocation.StoreLocation
     })
     return res.send(StoreData);  
  })

  /*
    StoreData.push({
    Store_Name : Store_Name
    const arrays = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10]];

const filteredArrays = arrays.filter(arr => arr.includes(3));

console.log(filteredArrays); // [[1, 2, 3, 4, 5]]
   })*/



   // 유저 멤버추가 sql
  const StoreMemberList =[{
  }]
app.get('/StoreMemberPlus',(req,res)=>{
  res.json(StoreMemberList); 
})


app.post('/StoreMemberPlus', (req, res) => {
  const { MemberID, UserFullID } = req.body;
  connection.query("SELECT * FROM new_table WHERE new_tablecol2 = ?", UserFullID, (error, rows) => {
    if (error) {
      throw error;
    } else {
      const user_store = rows[0].User_StoreName;
      const user_representId = rows[0].representId;
      console.log(user_store)
      connection.query("UPDATE new_table SET representId = ? WHERE new_tablecol2 = ?", [user_representId, MemberID], (error, result) => {
        if (error) {
          throw error;
        } else {
          connection.query("UPDATE new_table SET User_StoreName = ? WHERE new_tablecol2 = ?", [user_store, MemberID], (error, result) => {
            if (error) {
              throw error;
            } else {
              connection.query("SELECT ?? FROM User_Store_Member_List", [user_store], (error, rows) => {
                if (error) { 
                  throw error;
                } else {
                  const filteredData = rows.filter(item => item[user_store] === MemberID);
                  if (filteredData.length > 0) {
                    console.log('중복되는 값이 있습니다');
                  StoreMemberList.push({
                    text : '이미 등록된 멤버입니다.'
                  })
                  return res.send(StoreMemberList);  
                  } else {
                    

                      connection.query('SELECT COUNT(*) AS count FROM User_Store_Member_List WHERE ?? IS NULL', [user_store], (error, result) => {
                        console.log(result)
                        if (result[0].count > 0) {
                          // UPDATE 실행
                          return connection.query('UPDATE User_Store_Member_List SET ?? = ? WHERE ?? IS NULL', [user_store, MemberID, user_store]);
                        } else {
                          // INSERT 실행
                          return connection.query('INSERT INTO User_Store_Member_List (??) VALUES (?)', [user_store, MemberID]);
                        }
                        
                      })
                      console.log("업데이트가 성공적으로 수행되었습니다.");
                      StoreMemberList.push({
                        text : '업데이트가 성공적으로 수행되었습니다.'
                      })
                      return res.send(StoreMemberList);  
                  }
                }
              });
            }
          });
        }
      });
    }
  });
});


/*    connection.query("UPDATE User_Store_Member_List SET ?? = ? WHERE ?? IS NULL LIMIT 1",[user_store,MemberID,user_store] ,(error, result) => {
          if (error) throw error;
          console.log("업데이트가 성공적으로 수행되었습니다.");
        });
        connection.query("UPDATE User_Store_Member_List SET ?? = ? WHERE ?? IS NULL LIMIT 1", [user_store, MemberID, user_store], (error, result) => {
                      if (error) {
                        throw error;
                      } else {
                        console.log("업데이트가 성공적으로 수행되었습니다.");
                        StoreMemberList.push({
                          text : '업데이트가 성공적으로 수행되었습니다.'
                        })
                        return res.send(StoreMemberList);  
                      }
                    });

                              async function insertOrUpdate() {
                      const [rows] = await connection.query('SELECT COUNT(*) AS count FROM User_Store_Member_List WHERE ?? IS NULL',[user_store]);
                      if (rows[0].count > 0) {
                        // UPDATE 실행
                        await connection.query('UPDATE User_Store_Member_List SET ?? = ? WHERE ?? IS NULL', [user_store, MemberID, user_store]);
                      } else {
                        // INSERT 실행
                        await connection.query('INSERT INTO User_Store_Member_List (??) VALUES (?)', [user_store,MemberID]);
                      }
                    }   

                    insertOrUpdate()
      
        }*/