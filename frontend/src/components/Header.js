import logo from '../images/header_logo.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header({ userName, onLogout  }) {

  return (
    <header className="header">
      <img src={logo} alt="логотип социальной сети Mesto" className="header__logo" />
      <div className="header__auth">
        {userName && <p className="header__email">{userName}</p>}
        <Routes>

          <Route path="/" element={<Link to="/signin" 
        className="header__logout" 
        onClick={onLogout}>Выйти
        </Link>}/>

          <Route path='/signin' element={
            <Link to='/signup' className='header__link'>
              Регистрация
            </Link>
          } />

          <Route path='/signup' element={
            <Link to='/signin' className='header__link'>
              Войти
            </Link>
          } />
        </Routes>
      </div>
    </header >
  )
}
export default Header;

