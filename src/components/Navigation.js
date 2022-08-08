import {GiHotMeal} from 'react-icons/gi';
import {RiHeart2Line, RiHeart2Fill} from 'react-icons/ri';
import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <nav className="navbar bg-transparent">
            <div className="container-fluid">
                <Link className="navbar-brand" to={'/'}>
                    <GiHotMeal />
                    Pick Your Food
                </Link>
                <Link className="btn btn-lg btn-primary" to={'/saved'}>
                    <RiHeart2Line className="me-2" />
                    Picked Recipes
                </Link>
            </div>
        </nav>
    );
}

export default Navigation;