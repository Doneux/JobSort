const fs = require("fs");
const path = require("path");
const { app } = require("electron");
const { Job } = require("./Job");

//either parcel or node really doesn't get filepaths, use of __dirname fixes that
const JOBS_FILE = path.join(app.getPath("userData"), "jobs.json");

// Save jobs to jobs.json
function saveJobsToFile(jobs) {
  const jsonData = jobs.map((job) => new Job(job).toJSON());
  const dir = path.dirname(JOBS_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(JOBS_FILE, JSON.stringify(jsonData, null, 2), "utf-8");
}

// Load jobs from jobs.json
function loadJobsFromFile() {
  if (!fs.existsSync(JOBS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(JOBS_FILE, "utf-8");
    if (data === "") {
    return [];
  }
  const parsed = JSON.parse(data);
  return parsed.map(jobData => new Job(jobData));
}

module.exports = {
  saveJobsToFile,
  loadJobsFromFile
};
