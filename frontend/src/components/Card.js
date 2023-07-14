import Trash from '../images/Trash.svg'
import Heart from '../images/Vector.svg'
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(card) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.ownerId === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = !isLiked ? 'elements__vector' : 'elements__vector elements__vector_active';
console.log(card.id);
  const handleClick = () => {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card.id)
  }

  return (

    <li className="elements__card">
      <img className="elements__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick} />
     { isOwn && <button className="button" type="button" onClick={handleDeleteClick}>
        <img src={Trash} alt="кнопка удаления" className="elements__delete-button" />
      </button>}
      <h2 className="elements__title">{card.name}</h2>
      <button className="button" type="button">
        <img src={Heart} alt="лайк" onClick={handleLikeClick} className={cardLikeButtonClassName} />
        <span className={'elements__likes-number'}>{card.likes.length}</span>
      </button>
    </li>
  )
};

export default Card;