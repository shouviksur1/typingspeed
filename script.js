const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random';
const quoteDisplay=document.getElementById("quote");

const timer=document.getElementById("timer");
const quoteinput=document.getElementById("input");
const result=document.getElementById('result');
const modal = document.querySelector('.modal');
let quo;
let flag=true;

quoteinput.addEventListener('input',()=>{
    if(flag)
    startTimer();
    flag=false;
const arrayQuote=quoteDisplay.querySelectorAll('span');
const arrayvalue=quoteinput.value.split('');
let correct=true;
arrayQuote.forEach((characterspan,index)=>{
    const character=arrayvalue[index];
    
    if(character==null){
        characterspan.classList.remove('correct');
        characterspan.classList.remove('incorrect');
        correct=false;

    }
    else if(character===characterspan.innerText){
        characterspan.classList.add('correct');
        characterspan.classList.remove('incorrect');

    }
    else{
        characterspan.classList.remove('correct');
        characterspan.classList.add('incorrect');
        correct=false;
       

    }
   

});
if(correct){
    flag=true;
    showresult();
    timer.innerText=0;
    generateQuote();
    

}

});


function getRandomQuote(){
    return fetch(RANDOM_QUOTE_API_URL)
            .then(response=>response.json())
            .then(data=>data.content);
}
async function generateQuote(){
    const quote= await getRandomQuote();
    quo=quote;
    quoteDisplay.innerHTML='';
    quote.split('').forEach(character=>{
        const characterspan=document.createElement('span');
        characterspan.innerText=character;
       
        quoteDisplay.appendChild(characterspan);
    });
    quoteinput.value=null;
  
    
   
}
function showresult(){
    const words=quo.split(" ");
   
    let wps=words.length/getTimerTime();
    let wpm=wps*60;
    wpm=parseInt(wpm);
   
    result.innerText=`Words per min is ${wpm}`;
    
    modal.style.display="block";
}
function clearModal(e){
    if(e.target===modal){
      modal.style.display="none";
    }
   
}
let startTime;
function startTimer(){
    timer.innerText=0;
    startTime=new Date();
    setInterval(() => {
        if(flag==false)
       timer.innerText= getTimerTime();
      
    },1000);

}
function getTimerTime(){
  return Math.floor((new Date()-startTime)/1000 ) ;
}
window.addEventListener('click', clearModal);


generateQuote();