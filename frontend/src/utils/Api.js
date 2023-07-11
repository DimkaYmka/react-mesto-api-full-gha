const apiOptions = {
  // baseUrl: 'http://localhost:3000',
  // baseAuthUrl: 'https://auth.nomoreparties.co',
  baseUrl: 'https://api.mesto.project.learn.nomoredomains.work',
  headers: {
    authorization: 'bc440bce-88d2-40de-813f-9186a5211a71',
    'Content-Type': 'application/json'
  }
};

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._baseAuthUrl = options.baseAuthUrl;
  }


  _getResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      // headers: this._headers
    })
      .then(this._getResponse)
  }


    // 
    // getUserData() {
    //   return fetch(`${this._baseUrl}/users/me`, {
    //       method: 'GET',
    //       headers: this._headers,
    //     })
    //     .then(this._getResponse)
    // }

    getUserData() {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'GET',
        credentials: 'include',
        // headers: this._headers,
      })
      .then(this._getResponse)
    }
  
    // 
    editUserData(userInfo) {
      return fetch(`${this._baseUrl}/users/me`, {
          method: 'PATCH',
          credentials: 'include',
          headers: this._headers,
          
          body: JSON.stringify(userInfo)
        })
        .then(this._getResponse)
    }
// 
    createCard(cardData) {
      return fetch(`${this._baseUrl}/cards`,{
        method: 'POST',
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify(cardData)
      })
      .then(this._getResponse);
    }

    changeLikeCardStatus(isLiked, cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: isLiked ? 'DELETE' : 'PUT',
        credentials: 'include',
        headers: this._headers,
      })
      .then(this._getResponse);
    }

    // addLike(cardId) {
    //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    //     method: 'PUT',
    //     headers: this._headers,
    //     credentials: 'include',
    //     // body: JSON.stringify(data)
    //   })
    //   .then(this._getResponse);
    // }
  
    // deleteLike(cardId) {
    //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
    //     method: 'DELETE',
    //     headers: this._headers,
    //     credentials: 'include',
    //   })
    //   .then(this._getResponse);
    // }

    editUserAvatar(avatarUrl) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
          method: 'PATCH',
          credentials: 'include',
          headers: this._headers,
          body: JSON.stringify({ avatar: avatarUrl })
        })
        .then(this._getResponse);
    }



    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: this._headers
      })
      .then(this._getResponse);
    }


}



const api = new Api(apiOptions)

export default api