import {useState} from "react";
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

function Search() {
    const [input, setInput] = useState("");

    // Initializing the use of useNavigate as navigate
    const navigate = useNavigate();

    // Handler for submitting the search string
    const submitHandler = (e) => {
        e.preventDefault();
        navigate('/searched/' + input);
    }

    return (
        <StyledForm onSubmit={submitHandler}>
            <FaSearch />
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
        </StyledForm>
    );
}

// styled components
const StyledForm = styled.form `
  position: relative;
  margin: 2rem auto;
  width: 80vw;
  
  input {
    background: var(--color-primary-light);
    width: 100%;
    padding: 1rem 2.65rem;
    font-size: 1.25rem;
    border-radius: 1rem;
    border: none;
    outline: none;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`;

export default Search;