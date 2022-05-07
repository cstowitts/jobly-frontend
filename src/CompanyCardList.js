import CompanyCard from "./CompanyCard";

/**CompanyCardList Component
 * 
 * Displays list of company cards
 * 
 * State: none
 * Props: companies, a list of matching companies to display
 * 
 * CompanyList -> CompanyCardList -> CompanyCard
 */

function CompanyCardList({companies}){
    console.log("CompanyCardList, companies: ", companies);


    return (
        <div className="CompanyCardList mt-3">
            {companies.map(co => <CompanyCard key={co.handle} company={co} />)}
        </div>
    )
}


export default CompanyCardList;












