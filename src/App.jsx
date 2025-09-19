import React, { useState, useEffect } from "react";
import { jobfilter, jobsort } from "./logic/SortFuncs";
import { Job } from "./logic/Job.js";

function JobCard({ job, index, onDelete, onEdit }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "8px",
        marginBottom: "6px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "16px",
        }}
      >
        {/* LEFT SIDE */}
        <div>
          <h3>{job.title}</h3>
          <p>Company: {job.company}</p>
          <p>Location: {job.location}</p>
          <p>Salary: {job.pay}</p>
          <p>Skills: {job.skills.join(", ")}</p>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ textAlign: "right"}}>
          <h3>Status: {job.status}</h3>
          <p>Listed on: {job.listingDate ? job.listingDate.toLocaleDateString() : "N/A"}</p>
          <p>Applied on: {job.appliedOn ? job.appliedOn.toLocaleDateString() : "N/A"}</p>
        </div>
      </div>

      <button
        onClick={() => onEdit(index)}
      >
        Edit
      </button>

      <button onClick={onDelete} style={{ marginLeft: "8px" }}>
        Delete
      </button>
    </div>
  );
}

export default function App() {
  //display jobs
  const [jobs, setJobs] = useState([]);
  //internal jobs
  const [intJobs, setIntJobs] = useState([]);
  //sort type
  const [sort, setSort] = useState("title");
  //filter type
  const [key, setKey] = useState("")
  const [filter, setFilter] = useState("title")

  //add job form
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    pay: "",
    skills: "",
    status: "applied",
    listingDate: "",
    appliedOn: "",
  });

  // Load jobs on startup
  useEffect(() => {
    window.api.loadJobs().then(setJobs);
    window.api.loadJobs().then(setIntJobs);
  }, []);

  //add job, update internal array/save
  const addJob = () => {
    const newJob = new Job({
      ...form,
      skills: form.skills.split(",").map(s => s.trim()),
      listingDate: form.listingDate ? new Date(form.listingDate) : null,
      appliedOn: form.appliedOn ? new Date(form.appliedOn) : null,
    });

    const updated = [...jobs, newJob];
    setJobs(updated);
    setIntJobs(updated);
    window.api.saveJobs(updated);
    setForm({ title: "", company: "", location: "", pay: "", skills: "", status: "applied", listingDate: "", appliedOn: "" });
    setShowForm(false);
  };

  //edit job
  const onEdit = (index) => {
    const job = jobs[index];

    // Fill form with this job's data
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      pay: job.pay,
      skills: job.skills.join(", "),
      status: job.status,
      listingDate: job.listingDate ? job.listingDate.toISOString().split("T")[0] : "",
      appliedOn: job.appliedOn ? job.appliedOn.toISOString().split("T")[0] : ""
    });

    // Remove the job from list
    const newJobs = jobs.filter((_, i) => i !== index);
    setJobs(newJobs);
    window.api.saveJobs(newJobs);

    setShowForm(true);
  };

  //delete a job
  const deleteJob = (index) => {
    const newJobs = jobs.filter((_, i) => i !== index);
    setJobs(newJobs);
    setIntJobs(newJobs);
    window.api.saveJobs(newJobs); // persist change
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>JobSort</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Job"}
      </button>

      {showForm && (
        <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
          <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})}/>
          <input placeholder="Company" value={form.company} onChange={e=>setForm({...form, company:e.target.value})}/>
          <input placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})}/>
          <p></p>
          <input placeholder="Salary" value={form.pay} type="number" onChange={e=>setForm({...form, pay:e.target.value})}/>
          <input placeholder="Skills (comma-separated)" value={form.skills} onChange={e=>setForm({...form, skills:e.target.value})}/>
          <label>Status:</label><select placeholder="Status" value={form.status} onChange={e=>setForm({...form, status:e.target.value})}>
            <option value="applied">applied</option>
            <option value="interview">interview</option>
            <option value="accepted">accepted</option>
            <option value="rejected">rejected</option>
          </select>
          <p></p>
          <label>Listed On:</label><input type="date" value={form.listingDate} onChange={e=>setForm({...form, listingDate:e.target.value})}/>
          <label>Applied On:</label><input type="date" value={form.appliedOn} onChange={e=>setForm({...form, appliedOn:e.target.value})}/>
          <p></p>
          <button onClick={addJob}>Add</button>
        </div>
      )}

      <p></p>
      <label htmlFor="sort">Sort By...</label>
      <select style={{ marginLeft: "2px" }} value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="title">Title</option>
        <option value="salary">Salary</option>
        <option value="status">Status</option>
        <option value="date">Date Applied</option>
      </select>
      <button onClick={() => setJobs(jobsort(jobs, sort))}>Sort</button>
      
      <label style={{ marginLeft: "8px" }} htmlFor="filter"> Filter By...</label>
      <input style={{ marginLeft: "2px" }} htmlFor="key" onChange={(e) => setKey(e.target.value)}></input>
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="title">Title</option>
        <option value="company">Company</option>
        <option value="salary">Salary</option>
        <option value="status">Status</option>
        <option value="skills">Skills</option>
      </select>
      <button onClick={() => setJobs(jobfilter(intJobs, filter, key))}>Filter</button>

      <button style={{ marginLeft: "8px" }} onClick={() => setJobs(intJobs)}>Clear</button>
      
      <p></p>
      <div>
        {jobs.length === 0 ? (
          <p>No jobs yet</p>
        ) : (
          jobs.map((job, i) => (
            <JobCard key={i} job={job} index={i} onDelete={() => deleteJob(i)} onEdit={onEdit} />
          ))
        )}
      </div>
    </div>
  );
}
