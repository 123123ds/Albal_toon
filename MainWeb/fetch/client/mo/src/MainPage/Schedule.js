import { QRCodeCanvas } from 'qrcode.react';
import React, { useState,useEffect} from 'react';
import { MainNab } from './MainPage';
// 리덕스
import { useSelector } from "react-redux"; // import 해주세요.
import './Schedule.css';

function Schedule(){
    const [buttonState, setButtonState] = useState('출근'); // 초기 상태는 '출근'

    const handleWorkToggle = () => {
      if (buttonState === '출근') {
        setButtonState('멈춤');
        handleStartStop();
      } else if (buttonState === '멈춤') {
        setButtonState('다시 시작');
        handleStartStop();
      } else if (buttonState === '다시 시작') {
        handleStartStop();
        setButtonState('멈춤');
      }
    };
  
    const handleLeave = () => {
      setButtonState('출근'); // '퇴근' 버튼 클릭 시 상태를 '출근'으로 변경
      setIsRunning(false); // isRunning을 초기 상태로 설정
    };

    const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 저장소에서 출근 시간 불러오기
    const storedTime = localStorage.getItem('workStartTime');
    if (storedTime) {
      setCurrentTime(storedTime);
    }
  }, []);

  const handleWorkStart = () => {
    if (!currentTime) {
      const now = new Date().toLocaleTimeString();
      setCurrentTime(now);
      // 로컬 저장소에 출근 시간 저장
      localStorage.setItem('workStartTime', now);
    }
  };

    const [seconds, setSeconds] = useState(
        // 로컬 스  토리지에서 초 상태를 불러오거나 기본값 0을 사용
        Number(localStorage.getItem('timerSeconds')) || 0
      );
      const [lastTime, setLastTime] = useState(()=>{
        const saved = localStorage.getItem('lastTime');
        const initialValue = JSON.parse(saved);
        return initialValue || 0;
      }); // 마지막 시간 저장을 위한 상태 추가
 
       // 컴포넌트가 마운트될 때 로컬 스토리지에서 마지막 시간을 불러옴
        useEffect(() => {
            const lastTimeFromStorage = localStorage.getItem('lastTime');
            if (lastTimeFromStorage) {
            setLastTime(parseInt(lastTimeFromStorage, 10));
             }
         }, []);
      const [isRunning, setIsRunning] = useState(
        // 로컬 스토리지에서 실행 상태를 불러오거나 기본값 false를 사용
        localStorage.getItem('timerIsRunning') === 'true'
      );
    
      useEffect(() => {
        let interval = null;
        if (isRunning) {
          interval = setInterval(() => {
            setSeconds((prevSeconds) => {
              const newSeconds = prevSeconds + 1;
              // 초 상태를 로컬 스토리지에 저장
              localStorage.setItem('timerSeconds', newSeconds);
              return newSeconds;
            });
          }, 1000);
        }
        return () => clearInterval(interval);
      }, [isRunning]);
    
      useEffect(() => {
        // 실행 상태를 로컬 스토리지에 저장
        localStorage.setItem('timerIsRunning', isRunning);
      }, [isRunning]);
      
      
      const handleStartStop = () => {
        setIsRunning(!isRunning);
      };
    
      const handleReset = () => {
        setLastTime(prevLastTime => prevLastTime + seconds); // 초기화 시 현재 시간을 마지막 시간에 더함
        setSeconds(0);
        setIsRunning(false);
        // 초기화 시 로컬 스토리지도 업데이트
        localStorage.setItem('timerSeconds', 0);
        localStorage.setItem('timerIsRunning', false);
      };
    
      // 초를 시간, 분, 초로 변환
      const formatTime = () => {
        const getSeconds = `0${seconds % 60}`.slice(-2);
        const minutes = `${Math.floor(seconds / 60)}`;
        const getMinutes = `0${minutes % 60}`.slice(-2);
        const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    
        return `근무중 ${getHours}시 ${getMinutes}분 ${getSeconds}초`;
      };

       // 현재시간
       const handleStart = () => {
        const now = new Date();
        const currentTimeString = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
        setCurrentTime(currentTimeString);
        return  `버튼 클릭 시간: ${currentTimeString}`;
      };
      
      
    
    // 시간 tr 만들기

    const [intervals, setIntervals] = useState([]);
    useEffect(() => {
        const timeIntervals = createTimeIntervals();
        setIntervals(timeIntervals);
      }, []);
    
const createTimeIntervals = () => {
  const intervals = [];
  for (let hour = 0; hour < 24; hour++) {
    const startTime = hour.toString().padStart(2, '0') + ":00";
    const endTime = (hour + 1).toString().padStart(2, '0') + ":00";
    intervals.push(`${startTime} ~ ${endTime}`);
  }
  return intervals;
};
// 현재 시간
function getTimeSlot(hour) {
    // 숫자를 문자열로 변환하고, padStart()를 사용하여 두 자리 숫자 형식으로 만듦
    const hourStr = String(hour).padStart(2, '0');
    const nextHourStr = String(hour + 1).padStart(2, '0');
  
    // 시간대 문자열 생성
    return `${hourStr}:00 ~ ${nextHourStr}:00`;
  }
  
//   console.log(getTimeSlot(currentHour)); // '09:00 ~ 10:00'
const [currentHour, setCurrentHour] = useState(new Date().getHours());
const filteredTimeSlot = intervals.filter(timeSlot => timeSlot === getTimeSlot(currentHour));


console.log(filteredTimeSlot); // ['17:00 ~ 18:00']


useEffect(() => {
  const timer = setInterval(() => {
    setCurrentHour(new Date().getHours());
  }, 1000); // 매 1초마다 현재 시간의 '시' 업데이트

  return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
}, []);

    // 시간 만들기  
    const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000); // 매 1초마다 현재 날짜와 시간 업데이트

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);
    
     // DB데이터 가져오기
     const Loginstate = useSelector((state) => state.stateLogin.stateLogin.value);
     const UserFullName = Loginstate.replace('님  반갑습니다!', '');
     const UserIDtext1 = useSelector((state) => state.UserID);
     const UserFullID1= UserIDtext1.UserID.ID;
     // 데이터값 갱신
     const [storeName, setStoreName] = useState('');
     const [representativeUser, setrepresentativeUser] = useState('');
     const [representativeNumber, setrepresentativeNumber] = useState('');
     const [representativeTel, setrepresentativeTel] = useState('');
     const [Stroelocation, setStroelocation] = useState('');
     const [UserList, setUserList] = useState([]);
     console.log(UserList);
     useEffect(() => {
         // 데이터를 받아오는 비동기 함수 호출
         fetchData();
     }, []);
     function fetchData(){
     fetch('http://localhost:10001/StoreDB2',{
         method: 'POST',
         headers: {
             'Content-Type': 'application/json',
         },
         body: JSON.stringify({
             UserFullID1
         })
     })
     .then(response => response.json())
     .then(data =>{
         // console.log(data[data.length-1])
         const storeName = data[data.length - 1].User_StoreName;
         const representativeUser =  data[data.length - 1].representative_User;
         const representativeNumber =  data[data.length - 1].representative_Number;
         const representativeTel = data[data.length - 1].representativeTel;
         const Stroelocation = data[data.length - 1].Stroe_location;
         setStoreName(storeName);
         setrepresentativeUser(representativeUser);
         setrepresentativeNumber(representativeNumber);
         setrepresentativeTel(representativeTel);
         setStroelocation(Stroelocation);
         const filteredDataArray = data.map(obj => {
             return Object.keys(obj)
               .filter(key => key.startsWith('가게 멤버들'))
               .reduce((newObj, key) => {
                 newObj[key] = obj[key];
                 return newObj;
               }, {});
           });
         // Object.keys()와 filter를 사용하여 특정 패턴을 가진 키만 추출
         const keysSorted = Object.keys(filteredDataArray[0]).filter(key => key.startsWith('가게 멤버들')).sort();
      // 추출된 키를 사용하여 값을 순서대로 출력
         keysSorted.forEach(key => {
         const UserList = filteredDataArray[0][key]; 
         // setUserList를 사용하여 UserList에 user 추가
         setUserList(prevUserList => [...prevUserList, UserList]);
             });
         })  


     }


    return (
        <body>
        <MainNab></MainNab>
        <h1 className="qrCodeH">우리가게 QR코드</h1>
        <section className='qr'>
            <QRCodeCanvas
                value="/" 
                includeMargin
                fgColor="#393E46"
                size={400}
                />
        </section>  

        <section className='qrPage_MainSextion'>
            <div className='qrPage_Schedule'>
            <div>
                현재 날짜와 시간: {currentDateTime}
             </div>
                <h1>오늘 우리 가게 스케줄</h1>
                <button onClick={handleStart}>시작</button>
                <table>
                    <tr>
                        <th></th>
                        {UserList.map((UserList, index) => (
                         <th key={index}
                         >{UserList}</th>
                         ))}
                    </tr>
         {intervals.map((interval, index) => (
          <tr key={index}>
                <td
             style={{ color: interval === getTimeSlot(currentHour) ? 'red' : 'black' }}
            >{interval}
                    </td>
                        {UserList.map((UserList, index) => (
                             <td key={index}
                            //  style={{backgroundColor: UserList === UserFullName && interval === getTimeSlot(currentHour) ? 'red' : 'transparent',}}  
                             >
                                  {/* {currentTime && <p>출근 시간: {currentTime}</p>} */}
                                {buttonState !== '출근' ? (
                                UserList === UserFullName && interval === getTimeSlot(currentHour) ? formatTime() : '') : (  ''  )}
                             </td>
                                ))}
          </tr>
        ))}
                </table>
                <div>
      <h2>타이머: {formatTime()}</h2>
      <div>마지막 시간: {lastTime}초</div> {/* 마지막 시간 출력 */}
    </div>
      {buttonState !== '퇴근' ? (
        <button onClick={handleWorkToggle}>{buttonState}</button>
      ) : (
        <button onClick={handleLeave}>퇴근</button>
      )}
      {buttonState !== '출근' && <button onClick={handleLeave}>퇴근</button>}
            </div>

        </section>
        </body>
        
    )
}

  export default Schedule;

