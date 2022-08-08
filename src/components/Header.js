import Search from "./Search";
import Meals from "./Meals";
import headerImage from "../assets/images/pickyourfood_header.jpg";

function Header() {
    return (
        <section id="page-header">
            <img src={headerImage} className="header-image" alt="Background image with assorted food ingredients"/>
            <div className="container">
                <Search />
                <Meals />
            </div>
            <div className="overlay"></div>
        </section>
    );
}

export default Header;