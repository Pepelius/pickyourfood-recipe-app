import {GiSlicedBread, GiMeal, GiFullPizza, GiCupcake} from 'react-icons/gi';
import styled from "styled-components";
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

// styled components
const Categories = styled.section `
  display: flex;
  justify-content: center;
  margin: 1.75rem 0;
`;
const StyledLink = styled(NavLink) `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--color-secondary);
  height: 5rem;
  width: 5rem;
  margin: 1.5rem;
  text-decoration: none;
  color: #000;
  cursor: pointer;
  border-radius: 50%;
  transition: all .1s ease-in-out;
  
  svg {
    margin-top: .5rem;
    font-size: 1.65rem;
    font-weight: 400;
  }
  h5 {
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 600;
    font-size: .9rem;
  }
  :hover, :focus {
    color: #000;
    box-shadow: 1px 2px 12px rgba(0,0,0,.1);
  }
  &.active {
    background: var(--color-secondary-dark);
  }
`;

export default Meals;