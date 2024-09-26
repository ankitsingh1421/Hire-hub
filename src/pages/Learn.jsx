
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { BarLoader } from "react-spinners";
import { getSingleJob } from "@/api/apiJobs"; // Import getSingleJob function
import useFetch from "@/hooks/use-fetch"; // Import the useFetch hook
import { useParams } from "react-router-dom";

const Learn = () => {
  const { id } = useParams();
  const { user, isLoaded } = useUser();
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Use the useFetch hook to get job data
 const {
    loading: loadingJob,
    data: job,
    fn: fnJob,
  } = useFetch(getSingleJob, {
    job_id: id,
  });

  // Trigger the fetchJobData function once the user is loaded
  useEffect(() => {
    if (isLoaded && user) {
      fnJob(); // Fetch job data when the component is loaded
    }
  }, [isLoaded, user]);

  if (loadingJob) {
    return <BarLoader width={"100%"} color="#36d7b7" />;
  }
  const skills = job?.skills || []; // Extract skills from job data
  return (
    <div className="flex h-screen">
      {/* Left Side: Skills List */}
      <div className="w-1/3 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Skills</h2>
        <ul className="list-disc pl-5">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <li
                key={index}
                onClick={() => setSelectedSkill(skill)}
                className={`p-2 cursor-pointer ${
                  selectedSkill === skill ? "bg-gray-400" : "bg-gray-300"
                } hover:bg-gray-400`}
              >
                {skill}
              </li>
            ))
          ) : (
            <p>No skills available.</p>
          )}
        </ul>
      </div>

      {/* Right Side: Video Display */}
      <div className="w-2/3 p-4">
        <h2 className="text-lg font-semibold mb-4">{selectedSkill} Videos</h2>
        {selectedSkill ? (
          <div className="grid grid-cols-3 gap-4">
            {/* Replace with actual videos associated with the skill */}
            {[`${selectedSkill} Video 1`, `${selectedSkill} Video 2`, `${selectedSkill} Video 3`].map((video, index) => (
              <div key={index} className="bg-gray-300 p-4">
                {video}
              </div>
            ))}
          </div>
        ) : (
          <p>Select a skill to see videos.</p>
        )}
      </div>
    </div>
  );
};

export default Learn;


