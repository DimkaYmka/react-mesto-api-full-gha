import PopupWithForm from './PopupWithForm';
import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleNameChange({ target }) {
    const text = target.value;
    setName(text);
  }

  function handleDescriptionChange({ target }) {
    const text = target.value;
    setDescription(text);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(
      {
        name,
        about: description,
      }
    )
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name='profileEditPopup' title='Редактировать профиль' btnText='Сохранить' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}
      children={<>
        <input className="popup__input" id="input-name" minLength="2" maxLength="40" required type="text" name="name"
          placeholder="Ваше имя"  value={name || ''} onChange={handleNameChange}/>
        <span className="popup__input-error input-name-error"></span>
        <input className="popup__input" id="input-info" minLength="2" maxLength="200" required type="text" name="about"
          placeholder="Пара слов о себе" value={description || ''} onChange={handleDescriptionChange} />
        <span className="popup__input-error input-info-error"></span></>
      } />
  )

}

export default EditProfilePopup