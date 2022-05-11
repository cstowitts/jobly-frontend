import {useState} from "react";


/** SearchBar:
 * 
 * a simple form, grabs the query someone passed in 
 * and calls handleSearch to make axios req 
 * for matching jobs to display, 
 * updates jobs state in Jobs
 * 
 * Props:
 * - handleSearch: a fn passed from parent to fire on submit (handleSubmit)
 * State:
 * - [formData, setFormData]: tracks changes to form inputs
 *  
 *  {CompanyList, JobList} -> SearchBar 
 */


function SearchBar({handleSearch}){
    console.log("SearchBar reporting for duty!");

    const initialFormData = {
        query: ""
    };

    const [formData, setFormData] = useState(initialFormData);

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(fData =>({
            ...fData, 
           [name]: value, 
        }));
    }

    function handleSubmit(evt){
        evt.preventDefault();
        handleSearch(formData);
        setFormData(initialFormData);
    }

    
    return (
        <form onSubmit={handleSubmit} className="SearchBar mb-5 input-group w-75 row g-3 ms-auto">
            <div className="col form-outline">
                <input 
                    name="query"
                    id="query"
                    type="search"
                    placeholder="Enter search term"
                    value={formData.query}
                    onChange={handleChange}
                    className="form-control col"
                />
            </div>
            <div className="col">
                <button type="submit" className="btn btn-primary">
                    Search
                </button>
            </div>
        </form>
    );
}


export default SearchBar;