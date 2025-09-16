class Job {
  constructor({
    title = "",
    company = "",
    location = "",
    pay = "",
    listingDate = null,
    skills = [],
    status = "",
    interviewDate = null,
    appliedOn = null
  }) {
    this.title = title;
    this.company = company;
    this.location = location;
    this.pay = pay;
    this.listingDate = listingDate ? new Date(listingDate) : null;
    this.skills = skills;
    this.status = status;
    this.interviewDate = interviewDate ? new Date(interviewDate) : null;
    this.appliedOn = appliedOn ? new Date(appliedOn) : null;
  }

  toJSON() {
    return {
      title: this.title,
      company: this.company,
      location: this.location,
      pay: this.pay,
      listingDate: this.listingDate?.toISOString() || null,
      skills: this.skills,
      status: this.status,
      interviewDate: this.interviewDate?.toISOString() || null,
      appliedOn: this.appliedOn?.toISOString() || null
    };
  }
}

module.exports = { Job };
