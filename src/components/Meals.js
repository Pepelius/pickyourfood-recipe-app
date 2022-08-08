import {GiSlicedBread, GiMeal, GiFullPizza, GiCupcake} from 'react-icons/gi';
import {NavLink} from 'react-router-dom';

function Meals() {
    return (
        <section id="meal-select">
            <NavLink className="btn-circle" to={'/category/Breakfast'}>
                <GiSlicedBread />
                <h5>Breakfast</h5>
            </NavLink>
            <NavLink className="btn-circle" to={'/category/Lunch'}>
                <GiMeal />
                <h5>Lunch</h5>
            </NavLink>
            <NavLink className="btn-circle" to={'/category/Dinner'}>
                <GiFullPizza />
                <h5>Dinner</h5>
            </NavLink>
            <NavLink className="btn-circle" to={'/category/Snack'}>
                <GiCupcake />
                <h5>Snacks</h5>
            </NavLink>
        </section>
    )
}

export default Meals;