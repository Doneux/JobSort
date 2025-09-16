import { saveJobsToFile, loadJobsFromFile } from "./FileFuncs.js";

import { Job } from "./Job.js";

import { jobsort, jobfilter, jobsearch } from "./SortFuncs.js";

//i do know how to use Jest
//i just don't like it that much (nor do we need it that bad)
//if you employ me, i will gladly switch to it
//check my school projects to see my Jest usage - Seth Doneux

//create jobs
let job1 = new Job({
    title: "Job A",
    company: "Company A",
    location: "Somewhere",
    pay: 1000,
    listingDate: null,
    skills: ["skill1", "skill2"],
    status: "applied",
    interviewDate: null,
    appliedOn: null
});

let job2 = new Job({
    title: "Job B",
    company: "Company B",
    location: "Somewhere else",
    pay: 2000,
    listingDate: null,
    skills: ["skill2", "skill3"],
    status: "accepted",
    interviewDate: null,
    appliedOn: null
});

//put jobs into array
let testjobs = [job1, job2];

//save to file
saveJobsToFile(testjobs);

//load from file
let resultjobs = loadJobsFromFile();

//assert jobs saved (in order)
if ((resultjobs[0].title === "Job A") && (resultjobs[1].title === "Job B")) {
    console.log("Saved and loaded file successfully");
} else {
    console.log("File operations failed!");
}

//sort array by pay
let testjobs1 = jobsort(testjobs, "salary");

//assert job B is first
if (testjobs1[0].title === "Job B") {
    console.log("Sorted by pay successfully");
} else {
    console.log("Sort by pay failed!");
    console.log(testjobs1[0].pay);
    console.log(testjobs1[1].pay);
    console.log(testjobs1[0].pay - testjobs[1].pay);
}

//sort array by title
let testjobs2 = jobsort(testjobs, "title");

//assert job A is first
if (testjobs2[0].title === "Job A") {
    console.log("Sorted by title successfully");
} else {
    console.log("Sort by title failed!");
}

//sort array by status
let testjobs3 = jobsort(testjobs, "status");

//assert job B is first
if (testjobs3[0].title === "Job B") {
    console.log("Sorted by status successfully");
} else {
    console.log("Sort by status failed!");
}

//TODO: implement dates and sort them