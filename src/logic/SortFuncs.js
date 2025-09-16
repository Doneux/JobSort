
export function jobsort(jobs, by) {
    //takes jobs, an array of Job types
    //takes by, a string indicating what to sort by
    //returns a sorted array of jobs

    //if sort by title (alphabetical)
    if (by === "title") {
        //the "..." operator makes a spread of each element in an array
        //wrapping it in [] essentially makes a copy of the array
        return [...jobs].sort((a, b) => a.title.localeCompare(b.title));
    }

    //if sort by date applied (oldest first)
    if (by === "date") {
        return [...jobs].sort((a, b) => a.appliedOn - b.appliedOn);
    }

    //if sort by salary/wage (highest first)
    if (by === "salary") {
        return [...jobs].sort((a, b) => b.pay - a.pay);
    }

    //if sort by status (accepted > interview > applied > rejected)
    if (by === "status") {
        const priority = {
            //calculate prio by using object literal
            accepted: 4,
            interview: 3,
            applied: 2,
            rejected: 1
        };
        return [...jobs].sort((a, b) => priority[b.status] - priority[a.status]);
    }

    //if bad usage just return unsorted
    return jobs;
}

export function jobfilter(jobs, by, key) {
    //takes jobs, an array of Job types
    //takes by, a string indicating what to filter by
    //returns a filtered array of jobs
    //NOTE: keep a backup of current jobs array when filter is removed

    if (by === "title") {
        return jobs.filter(job => job.title.toLowerCase() === key.toLowerCase());
    }

    if (by === "company") {
        return jobs.filter(job => job.company.toLowerCase() === key.toLowerCase());
    }

    if (by === "salary") {
        return jobs.filter(job => job.salary === Number(key));
    }

    if (by === "status") {
        return jobs.filter(job => job.status === key.toLowerCase());
    }

    if (by === "skills") {
            return jobs.filter(job =>
        job.skills.some(s => s.toLowerCase() === key.toLowerCase()));
    }

    return jobs;
}

//may be worth waiting to implement at a later date
export function jobsearch(jobs, by) {
    return;
}