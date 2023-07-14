import { useState } from "react"
import { useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth";

function LoginForm({ setLoggedIn, handleLogin, onInfoTooltipOpen, setUser }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate();

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({ ...formValue, [name]: value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = formValue;
    console.log(formValue);
    auth.authorize(password, email)
    // const token = localStorage.getItem('userId')
      // .then(data => {
      //   // console.log(data);
      //   if (data._id) {
      //     setLoggedIn(true)
      //     // setUser(formValue.email)
      //     // setUser(data.email);
      //     handleLogin(formValue.email)
      //     navigate("/", { replace: true });
      //   }
    // })
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            setLoggedIn(true)
            // setUser(formValue.email)
            // setUser(data.email);
            handleLogin(formValue.email)
            navigate("/", { replace: true });
          }
        })
  


      .catch((err) => {
        onInfoTooltipOpen({ isOpen: true, status: false });
        console.log(err);
      })
  }
  return (

    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form action="#" className="login__form" onSubmit={handleSubmit} >
        <input className="login__input login__input_email" id="input-url-login" required type="email" name="email"
          placeholder="Email" onChange={handleChange} />
        <span className="login__input-error input-url-login-error "></span>
        <input className="login__input login__input_password" id="input-url-login" required type="password" name="password"
          placeholder="Пароль" onChange={handleChange} />
        <span className="login__input-error input-url-login-error "></span>
        <button className="login__button" type="submit">Войти</button>
      </form>
    </div>
  )
};

export default LoginForm;