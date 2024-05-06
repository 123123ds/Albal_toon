import React, { useCallback, useState } from 'react';
import './Chatting.css';
import { MainNab } from '../MainPage/MainPage';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';



function Chatting(){
    const[onchatt,setchatt] = useState('')
    
    const onSetOnchatt = useCallback(e=>{
      setchatt(e.target.value);
    },[])

    const chatt_log = document.getElementById('chatt_log');
    const main_screen = document.getElementById('main_screen');
    let i;
    let num = 2; 
    function chatt_submit(e){
        num++; 
        e.preventDefault();
        const chattUl = document.getElementById('chattUl');
        const chattLi = document.createElement('li');
        let chattLigets = chattUl.getElementsByTagName('li');
       document.getElementById('chattUl').appendChild(chattLi);

       if(chattLigets.length%2==0){
          chattLi.style.background= 'red';
       }
       chattLi.innerText = onchatt;
       setchatt('');


    }

    return(
        <body>
            <MainNab></MainNab>
            <section className='firstpage'>
                <div className='chatting'>
                    <div className='main_screen'>
                        <ul className='chatt_log' id='chattUl'>
                        </ul>
                        <form onsubmit="return false;">
                            <input type={'text'} className='chatting_text' placeholder='메시지를 입력하세요'    
                            value={onchatt}
                            onChange={onSetOnchatt}
                            ></input>

                            <input className='chatt_submit' type={'submit'} onClick={chatt_submit}
                            value='전송'
                            ></input>
                        </form>
                    </div>
                </div>
            </section>
       
        </body>
    )
}

export default Chatting;