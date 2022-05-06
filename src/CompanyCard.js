import {Link} from "react-router-dom";

/** CompanyCard Component: renders a company's details in a card
 * 
 * Props: company, an obj to extract company data from
 * State: none
 * 
 * CompanyCardList -> CompanyCard
 */

function CompanyCard({company}){
    console.log("CompanyList", "company: ", company);
    return (
        <div>
            <Link to={`/companies/${company.handle}`}>
                <ul>
                    <li>Name: {company.name}</li>
                    <li>Description: {company.description}</li>
                    {company.logoUrl !== null && <li><img src={company.logoUrl} alt={`${company.name}'s logo`} /></li>}
                </ul>
            </Link>
        </div>
    )

}

//can't use <a> tags for each company bc it'll refresh the page after navigating tot hat url, gotta use the Link compnent and its "to" attr

export default CompanyCard;