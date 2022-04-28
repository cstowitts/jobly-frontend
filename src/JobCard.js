
/** JobCard Component: renders a job's details in a card
 * 
 * Props: job, an obj to extract job data from
 * State: none
 * 
 * JobCardList -> JobCard
 */

function JobCard({job}){
    return (
        <li className="JobCard">
            <h3>{job.title}</h3> 
            {/* TODO: if no company name, don't render */}
            <p>Sell your soul to: {job.companyName}</p>
            <p>Salary: {job.salary}</p>
            <p>Equity: {job.equity}</p>
        </li>
    )
}

export default JobCard;