

export const BASE_URL = "http://localhost:3000";

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    credentials: 'include',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      return checkResponse(res);
    })

}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  })
  .then((res) => {
    return checkResponse(res);
  })
  .then((data) => {
    localStorage.setItem('userId', data._id)
    return data;
  })

};

  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    })
      .then((res) => {
        return checkResponse(res);
      })
  };

  export const tokencheck = () => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
      }
    }).then(res => checkResponse(res))
  } 
 