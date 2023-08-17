import { useEffect, useState } from "react"
import { useData } from "../../contexts/DataContext"
import { getMonth } from "../../helpers/Date"

import "./style.scss"

const Slider = () => {
  const { data } = useData()
  const [index, setIndex] = useState(0)
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // permet de trier dans l'ordre décroissant 
    new Date(evtB.date) - new Date(evtA.date) 
  )

  const nextCard = () => {
    // -1 permet de repasser à zero lorsqu'on arrive à la dernière image
    // longueur du tableau -1 / 
    setTimeout(() => setIndex(index < byDateDesc.length -1 ? index + 1 : 0), 5000)
  }


  useEffect(() => {
    console.log("clg de index", index)
    console.log("clg de bydatedesc", byDateDesc)
    console.log("clg de data", data)
    nextCard()
  })


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, id) => (
        <>
          <div
            key={event.title}
            className={`SlideCard SlideCard--${
              index === id ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  // si l'image est à la même position que l'index alors checked = ok 
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </>
      ))}
    </div>
  )
}

export default Slider
