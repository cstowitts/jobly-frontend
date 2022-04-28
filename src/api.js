import axios from "axios";
import jwt_decode from "jwt-decode";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
let userToken = "";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // Remember, the backend needs to be authorized with a token
  // We're providing a token you can use to interact with the backend API
  // DON'T MODIFY THIS TOKEN
  // static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
  //   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
  //   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${userToken}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get a list of all companies */
  static async getCompanies(searchData) {
    let query = searchData !== "" ? {name: searchData} : {};
    let res = await this.request("companies", query);
    
    return res.companies;
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get a list of all jobs */

  static async getJobs(searchData) {
    let query = searchData !== "" ? {title: searchData} : {};
    let res = await this.request("jobs", query);
    return res.jobs;
  }

  /** Get details on a job by title */

  static async getJob(id) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Authenticate User to get user object and token */

  static async loginUser(loginFormData){
    console.log("in the loginUser method! loginFormData = ", loginFormData);

    let res = await this.request('auth/token', loginFormData, 'post');
    userToken = res.token;
    console.log("in the loginUser method! res = ", res);

    let username = jwt_decode(userToken).username;
    console.log("in the loginUser method! username = ", username);

    return username;
  }

  /** Register a new user's data and get token */
  static async registerUser(registerFormData){
    console.log("in the registerUser method! registerFormData = ", registerFormData);

    let res = await this.request('auth/register', registerFormData, 'post');
    console.log("in the registerUser method! res = ", res);

    userToken = res.token;
    let username = jwt_decode(userToken).username;
    console.log("in the registerUser method! username = ", username);

    return username;
  }

  /** Get a user's data */

  static async getUser(username){
    const user = await this.request(`users/${username}`);
    return user;
  }

  /** Update a user's profile */
  
  static async updateUser(profileFormData){
    const user = this.request(`users/${profileFormData.username}`, profileFormData, 'patch');
    return user; 
  }

  /** Logout the current user */

  static deleteUserToken(){
    userToken = "";
    return;
  }

}

export default JoblyApi;