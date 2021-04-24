import "./TopNavBar.css";

export const TopNavBar = () => {
    return (
        <nav className = "top-navbar">
            <div>
                <i className = "fa fa-youtube-square fa-2x"></i>
            </div>
            <div className = "top-navbar__form">
                <input placeholder = "Search" className = "form__input"/>
                <button className = "form__btn btn-primary"><i className = "fa fa-search"></i></button>
            </div>
            <img
            src="https://ui-labs-sr.netlify.app/Sruthi.jpg"
            alt="avatar"
            className="avatar__img navbar__list sm"
            />
        </nav>
    )
}