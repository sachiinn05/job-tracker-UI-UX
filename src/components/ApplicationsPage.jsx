import JobCard from "../components/JobCard";

function ApplicationsPage() {
    const jobs=[
        {
      _id: "1",
      role: "Frontend Developer",
      companyName: "Google",
      platform: "LinkedIn",
      currentStatus: "Applied"
    },
    {
      _id: "2",
      role: "Backend Engineer",
      companyName: "Amazon",
      platform: "Naukri",
      currentStatus: "Interview"
    },
    {
      _id: "3",
      role: "Frontend Developer",
      companyName: "Backtracing",
      platform: "LinkedIn",
      currentStatus: "Applied"
    },
    {
      _id: "4",
      role: "Backend Engineer",
      companyName: "OpenAI",
      platform: "Naukri",
      currentStatus: "Interview"
    },
    {
      _id: "5",
      role: "Frontend Developer",
      companyName: "GXM",
      platform: "LinkedIn",
      currentStatus: "Applied"
    },
    {
      _id: "6",
      role: "Backend Engineer",
      companyName: "AMD",
      platform: "Naukri",
      currentStatus: "Interview"
    },
    ]
  return (
    
    <div className="pt-24 px-6 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">My Applications</h1>

      <div className="space-y-4">
       {jobs.map((job)=>(
        <JobCard key={job._id} job={job}/>
       ))}
      </div>
    </div>
  );
}

export default ApplicationsPage;