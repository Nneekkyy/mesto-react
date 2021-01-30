import MestoLogo from "../images/header-logo.svg";

function Header () {
    return (
        <header className="header">
            <img className="header__logo" src={MestoLogo} alt="Логотип место" />
        </header>
    );
}
export default Header