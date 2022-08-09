import {useState} from "react";
import {FaSearch} from 'react-icons/fa';
import {useNavigate} from "react-router-dom";

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
        <div className="row justify-content-center">
            <div className="col-10 col-lg-8">
                <form className="search-bar" onSubmit={submitHandler}>
                    <FaSearch />
                    <input type="text" className="form-control" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search for recipes..." />
                </form>
            </div>
        </div>
    );
}

export default Search;