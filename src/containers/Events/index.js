import { useState } from "react"
import EventCard from "../../components/EventCard"
import Select from "../../components/Select"
import { useData } from "../../contexts/DataContext"
import Modal from "../Modal"
import ModalEvent from "../ModalEvent"

import "./style.css"

const PER_PAGE = 9
// paginations a ete supprimer de filteredEvents, et delpacé dans l'appel de cette fonction a l'interieur de la methode slice ligne 46. 

const EventList = () => {
  const { data, error } = useData()
  const [type, setType] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const filteredEvents = ((!type ? data?.events : data?.events) || []).filter(
    // methode filter + condition du filter
    (event) => {
      if (type !== null && type !== undefined) {
        return event.type === type
      }
      return true
    }
  )
  const changeType = (evtType) => {
    setCurrentPage(1)
    setType(evtType)
  }
  // ceil retour de la valeur supperieur
  const pageNumber = Math.ceil((filteredEvents?.length || 1) / PER_PAGE)
  const typeList = new Set(data?.events.map((event) => event.type))
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />

          {/* method slice  si je suis a la page 1 grace au slice il me retorune de l'index 0 a l'index 9 currentPage  - 1 x par 9  */}
          <div id="events" className="ListContainer">
            {filteredEvents
              .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)
              .map((event) => (
                <Modal key={event.id} Content={<ModalEvent event={event} />}>
                  {({ setIsOpened }) => (
                    <EventCard
                      onClick={() => setIsOpened(true)}
                      imageSrc={event.cover}
                      title={event.title}
                      date={new Date(event.date)}
                      label={event.type}
                    />
                  )}
                </Modal>
              ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default EventList
