import iconDone from '../images/Done.svg';
import iconError from '../images/Error.svg';
import ClosePopup from '../images/Close.svg';

function InfoTooltip({ onClose, isOpenConfig }) {
  return (
    <section
      className={`popup ${isOpenConfig.isOpen ? 'popup_opened' : ''}`}
      onClick={({ target }) => {
        if (target.classList.contains('popup_opened') || target.classList.contains('popup__close-button')) {
          onClose();
        }
      }}>
      <div className="popup__container">
      <button className="button" type="button" onClick={onClose}>
          <img src={ClosePopup} alt="Крест для закрытия"
            className="popup__close-popup popup__close-card-popup" />
        </button>
        <img src={isOpenConfig.status ? iconDone : iconError} className="info-tooltip__image" alt=""></img>
        <p className="info-tooltip__text">{isOpenConfig.status ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
      </div>
    </section>
  )
}

export default InfoTooltip
