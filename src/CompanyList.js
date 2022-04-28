import {useState, useEffect} from "react";
import JoblyApi from "./api.js";
import CompanyCardList from "./CompanyCardList";
import SearchBar from "./SearchBar.js";

/** CompanyList Component
 * 
 * Requests list of all companies on load, 
 * handles search callback to update list
 * 
 * Props: none
 * State: [companies, setCompanies] 
 * 
 *   
 * Routes -> CompanyList -> {SearchBar, CompanyCardList}
 */

function CompanyList(){
    
    const [companies, setCompanies] = useState(null);

    console.log("CompanyList", "State:", companies);

    useEffect(
        function getAllCompaniesOnLoad(){
            async function getAllCompanies(){
                const companiesResponse = await JoblyApi.getCompanies();
                setCompanies(companies => companiesResponse);
            }
            getAllCompanies();
        },
        []
    );

    if (companies === null){
        return <h1>Loading...</h1>
    };

    async function handleSearch({query}){
        const companiesResponse = await JoblyApi.getCompanies(query);
        setCompanies(companies => companiesResponse);
    }

    return (
        <div className="CompanyList">
            <SearchBar handleSearch={handleSearch}/>
            {companies.length > 0 ? 
                <div>
                    <CompanyCardList companies={companies} />
                </div>
            : 
                <div>
                    Sorry, no results were found!
                </div>
            }
        </div>
    );
}


export default CompanyList;