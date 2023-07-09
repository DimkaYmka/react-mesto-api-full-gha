import ClosePopup from '../images/Close.svg';

function PopupWithForm({
  name,
  title,
  btnText,
  isOpen,
  onClose,
  onSubmit,
  children
  }) {
  return (
    <div className={isOpen ? "popup popup_opened" : "popup"} id={name}>
      <div className="popup__container">
        <button className="button" type="button" onClick={onClose}>
          <img src={ClosePopup} alt="Крест для закрытия"
            className="popup__close-popup popup__close-card-popup" />
        </button>
        <h3 className="popup__title">{title}</h3>
        
        <form action="#" onSubmit={onSubmit} name={`${name}-form`} className="popup__form popup__form-card" >
        {children}
          <button className="popup__button popup__save-btn" type="submit">{btnText}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;