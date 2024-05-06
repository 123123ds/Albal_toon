import React, { useState } from 'react';
import { MainNab } from '../MainPage/MainPage';
import "./Callender.css"
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


function Callender(){

    let [month, setmonth] = useState(1);
    let [tableYear, settableYear] = useState(2023);
    let [EngMonth, setEngMonth] = useState('January');
    
    function monthPlus(){
        setmonth(month+1);
        console.log(month);
        if(month ===12){
          setmonth(month =1); 
          settableYear(tableYear + 1);
        }
        if(month ===1){
          setEngMonth(EngMonth = 'January');
        }else if(month ===2){
          setEngMonth(EngMonth = 'February');
        }else if(month ===3){
          setEngMonth(EngMonth = 'March ');
        }else if(month ===4){
          setEngMonth(EngMonth = 'April ');
        }else if(month ===5){
          setEngMonth(EngMonth = 'May ');
        }else if(month ===6){
          setEngMonth(EngMonth = 'June  ');
        }else if(month ===7){
          setEngMonth(EngMonth = 'July  ');
        }else if(month ===8){
          setEngMonth(EngMonth = 'August ');
        }else if(month ===9){
          setEngMonth(EngMonth = ' September ');
        }else if(month ===10){
          setEngMonth(EngMonth = 'October ');
        }else if(month ===11){
          setEngMonth(EngMonth = 'November ');
        }else if(month ===12){
          setEngMonth(EngMonth = 'December ');
        }
    }

    function useCallender(){
        useEffect(()=>{
            const monthNext = document.getElementById('monthNext');
            monthNext.addEventListener(('click'),()=>{
                const thirdPage = document.getElementById('thirdPage');
                const callender = document.createElement('section');
                thirdPage.append(callender);
            })
        },[]);
        }
        useCallender();

    return(
        <body>
            <MainNab></MainNab>
            <section className="thirdPage" id='thirdPage'>
            <section className="thirdPage_mainSection" id='maintable'>
              <div className="tableYear">
              {tableYear}
              </div>
              <div className="EngMonth">
                {EngMonth}
              </div>
              <div className="month">
                {month}
              </div>
              <table className="third_table">
              <tr>
                <td>일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
              </tr>

              </table>

              <table className="table_day"> 
              <tr>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
                <td>7</td>
              </tr>

              <tr>
                <td>일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
              </tr>

              <tr>
                <td>일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
              </tr>

              <tr>
                <td>일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
              </tr>

              <tr>
                <td>일</td>
                <td>월</td>
                <td>화</td>
                <td>수</td>
                <td>목</td>
                <td>금</td>
                <td>토</td>
              </tr>
              </table>
            </section>
            <div className="monthNext"  id='monthNext' onClick={monthPlus}></div>
            <div className='monthfirst'></div>

           
          </section>
           
        </body>
    )
}

export default Callender;