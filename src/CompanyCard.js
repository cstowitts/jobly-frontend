
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
            <a href={`/companies/${company.handle}`}>
                <ul>
                    <li>Name: {company.name}</li>
                    <li>Description: {company.description}</li>
                    {company.logoUrl !== null && <li><img src={company.logoUrl} alt={`${company.name}'s logo`} /></li>}
                </ul>
            </a>
        </div>
    )
//TODO: when company.logo is null in the db, sub default img src
}

export default CompanyCard;