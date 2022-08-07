import {GiHotMeal} from 'react-icons/gi';
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
                    Picked Recipes
                </Link>
            </div>
        </nav>
    );
}

export default Navigation;