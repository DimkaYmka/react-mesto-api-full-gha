import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card.js";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button" onClick={props.onEditAvatar}>
          <img src={currentUser.avatar} alt="аватар" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <div className="profile__container">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button"
              onClick={props.onEditProfile}
            >

            </button>
          </div>
          <p className="profile__text">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}>

        </button>
      </section>



      <section className="elements">
        <ul className="elements__list">
          {props.cards.map(card => (
            <Card
              ownerId={card.owner}
              card={card}
              onCardClick={props.onCardClick}
              key={card._id}
              id={card._id}
              link={card.link}
              name={card.name}
              likes={[...card.likes]}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>

    </main>
  )
};

export default Main;