import JobCard from "./JobCard";

/**JobCardList Component
 * 
 * Displays list of job cards
 * 
 * State: none
 * Props: jobs, a list of matching jobs to display
 * 
 * JobCardList -> JobCard
 */

function JobCardList({jobs}){
    return (
        <div>
            <ul>
                {jobs.map(job => <JobCard key={job.id} job={job} />)}
            </ul>
        </div>
    )
}

export default JobCardList;