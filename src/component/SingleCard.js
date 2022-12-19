import React from 'react'
import './SingleCard.css'

export default function SingleCard({card,handlechoice,flipped,disabled}) {
  
    const handleclick = () =>{
      /**if disabled is false and card is not disabled only then this function is fire*/
     if(!disabled){
      handlechoice(card)
     }
   
    }
    return (
    <div className="card" >
    <div className={flipped ? "flipped" : ""}>
      <img className='front' src={card.src} alt='card front'/>
      <img className='back'
       src="/img/cover.png"
       onClick={handleclick} 
       alt='card back'/>
    </div>
   </div>
  )
}
