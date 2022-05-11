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
        <div className="CompanyCard card container p-3 mb-3">
            <Link to={`/companies/${company.handle}`}>
                <ul className="card-body">
                    <li className="card-title mb-4">
                        <h4 className="fw-bold">{company.name}</h4>
                    </li>
                    <li className="mb-3">{company.description}</li>
                    {company.logoUrl !== null 
                    && 
                    <li>
                        <img src={`./assets/${company.logoUrl}`} alt={`${company.name}'s logo`} />
                    </li>}
                    {company.logoUrl === null
                    &&
                    <li>
                        <img src="./assets/logos/logo5.png" alt="placeholder company logo"/>
                    </li>
                    }
                </ul>
            </Link>
        </div>
    )

}

//can't use <a> tags for each company bc it'll refresh the page after navigating to that url, gotta use the Link compnent and its "to" attr
//line 22 bc the logoUrl actually includes /logos/ in the path

export default CompanyCard;