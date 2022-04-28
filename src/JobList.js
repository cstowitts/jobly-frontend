import {useState, useEffect} from "react";
import JoblyApi from "./api.js";
import JobCardList from "./JobCardList";
import SearchBar from "./SearchBar";

/** JobList Component
 * 
 * Requests list of all jobs on load, 
 * handles search callback to update list
 * 
 * Props: handleSearch, fn passed to SearchBar, 
    takes search params and makes axios req to API, 
    parses JSON and passes list(arr) of matching jobs(objs) to the JobList 
 * State: [jobs, setJobs] 
 *    
 *   Routes -> JobList -> {SearchBar, JobCardList}
 */

function JobList(){

    const [jobs, setJobs] = useState(null);
    
    console.log("JobList");

    useEffect(
        function getAllJobsOnLoad(){
            async function getAllJobs(){
                const jobsResponse = await JoblyApi.getJobs();
                setJobs(jobs => jobsResponse);
            }
            getAllJobs();
        },
        []
    );

    if (jobs === null){
        return <h1>Loading...</h1>
    };

    async function handleSearch({query}){
        const jobResponse = await JoblyApi.getJobs(query);
        setJobs(jobs => jobResponse);
    }

    return (
        <div className="JobList">
            <SearchBar handleSearch={handleSearch}/>
            {jobs.length > 0 ? 
                <div>
                    <JobCardList jobs={jobs} />
                </div>
            : 
                <div>
                    Sorry, no results were found!
                </div>
            }
        </div>
    )
}


export default JobList;