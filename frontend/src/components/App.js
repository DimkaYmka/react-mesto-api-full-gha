
import { useEffect, useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
// import PopupWithForm from "./PopupWithForm";
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";

import { useNavigate, Routes, Route, Navigate } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from "./LoginForm";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/Auth";

function App() {
  const [cards, setCards] = useState([]);//
  const [currentUser, setCurrentUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false); //false по умолчанию
  const [userName, setUser] = useState('');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();


  // useEffect(() => {
  //   // const getJWTByLocalStorage = () =>{
  //   //   return localStorage.getItem('token')
  //   // }
  //   // const token =localStorage.getItem('token')
  //   const token = localStorage.getItem('userId')
  //   if (token) {
  //   Promise.all([api.getUserData(), api.getInitialCards()])
  //     .then(res => {
  //       const [userData, cardsArray] = res;
  //       setCards(cardsArray);
  //       setCurrentUser(userData);
  //     })
  //     .catch(err => console.error(err));
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getInitialCards()])
        .then(res => {
          const [userData, cardsArray] = res;
          setCards(cardsArray);
          setCurrentUser(userData);
        })
        .catch(err => console.error(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLikeCardStatus(isLiked, card.id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card.id ? newCard : c));
      })
      .catch(err => console.log(err));
  }



  function handleCardDelete(cardId) {
    api.deleteCard(cardId)
      .then(() => setCards(cards.filter(c => c._id !== cardId)))
      .catch(err => console.log(err));
  }



  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoTooltipOpen(false)
    setSelectedCard(null);

  }

  function handleCardClick(card) {
    setSelectedCard(card)

  }

  const handleUpdateUser = (userInfo) => {
    api.editUserData(userInfo)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  const handleUpdateAvatar = (avatarUrl) => {
    api.editUserAvatar(avatarUrl)
      .then(userData => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  const handleAddCard = (cardData) => {
    api.createCard(cardData)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }


  const handleLogin = (userName) => {
    setLoggedIn(true)
    setUser(userName)
  }

  // const tokenCheck = (data) => {
  //   const token = localStorage.getItem('token');
  //   // const token = localStorage.getItem('userId');
  //   if (token) {
  //     auth.getContent(data)
  //       .then((data) => {
  //         setLoggedIn(true);
  //         setUser(data.email);
  //         handleLogin(data.email)
  //         navigate('/', {replace: true})
  //       })
  //       .catch((err) => {
  //         localStorage.removeItem('token');
  //         console.log(err)
  //       });
  //     }
  // }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      auth.getContent(jwt)
        .then((data) => {
          console.log(data);
          setLoggedIn(true);
          setUser(data.email);
          handleLogin(data.email)
          navigate('/', { replace: true })
        })
        .catch(err => console.log(err));
    }
  }


  useEffect(() => {
    tokenCheck();
  }, []);


  const handleLogout = () => {
    setLoggedIn(false);
    setUser("");
    localStorage.removeItem("token");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">
          <Header userName={userName} onLogout={handleLogout} />
          <Routes>

            <Route path='/'
              element={
                <ProtectedRoute
                  element={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route path='/signin' element={
              <div >
                <LoginForm setLoggedIn={setLoggedIn} handleLogin={handleLogin} onInfoTooltipOpen={setIsInfoTooltipOpen} setUser={setUser}
                />
              </div>} />
            <Route path='/signup' element={<div >
              <RegisterForm onInfoTooltipOpen={setIsInfoTooltipOpen} setUser={setUser} />
            </div>} />

            <Route path='*' element={<Navigate to='/' replace={true} />} />

          </Routes>
          {loggedIn && <Footer />}
        </div>

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddCard} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpenConfig={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>

  );

}
export default App;


