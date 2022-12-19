import { useState,useEffect } from 'react';
import './App.css';
import SingleCard from './component/SingleCard';
const cardImages = [
  { "src": "/img/helmet-1.png" ,matched:false},
  { "src": "/img/potion-1.png",matched:false },
  { "src": "/img/ring-1.png",matched:false },
  { "src": "/img/scroll-1.png",matched:false },
  { "src": "/img/shield-1.png" ,matched:false},
  { "src": "/img/sword-1.png" ,matched:false}
]
function App() {
  const [cards, setcards] = useState([])
  const [turns, setturns] = useState(0)
  const[choiceOne,setchoiceOne]=useState(null)
  const[choiceTwo,setchoiceTwo]=useState(null)
  const[disabled,setdisabled] = useState(false)
 
 //handle a choice

 const handlechoice = (card) => {
    choiceOne ? setchoiceTwo(card) : setchoiceOne(card)
    //we cannot compare the cards here because we already scheduled states here
 }



 //compare two selected cards
useEffect(() => {

  if(choiceOne && choiceTwo){
    setdisabled(true)
    if(choiceOne.src===choiceTwo.src){
        setcards(prevcards=>{
        return prevcards.map(card => {
          if(card.src===choiceOne.src){
            return{...card,matched:true}
          }
          else{
            return card
          }
        })
        })
        resetTurn()
    }
    else{
      setTimeout(() => resetTurn(),1000)
    }

  }

}, [choiceOne,choiceTwo])

 //reset choices and increase turn 
 const resetTurn = () =>{
  setchoiceOne(null)
  setchoiceTwo(null)
  setturns(prevTurns => prevTurns+1)
  setdisabled(false)
 } 

//start a new game 
useEffect(()=>{
  shuffleCards();
},[])

  //shuffle cards
  const shuffleCards = () => {
    //we put cardImages here because we want duplicate of every card
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) //if number is negative the order will be the same
      //if number is positive it will shuffle 
      .map((card) => ({ ...card, id: Math.random() }))
    setchoiceOne(null)
    setchoiceTwo(null)
    setcards(shuffledCards)
    setturns(0)
  }

  console.log(cards, turns);

  return (
    <div className="App">
      <h1>Magic Match</h1> 
      <button onClick={shuffleCards}>New Game</button>
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard  
          handlechoice={handlechoice} 
          key={card.id} 
          card={card} 
          flipped={card===choiceOne||card===choiceTwo||card.matched}
          disabled={disabled}/>
        ))}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}
export default App;
