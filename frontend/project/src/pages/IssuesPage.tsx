import { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";

export default function IssuesPage() {
  const [issues, setIssues] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newIssue, setNewIssue] = useState({ heading: "", desc: "", skills: "", repoId: "" });

  // Fetch issues from the backend
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await axios.get("/api/issues/get-issues");
        setIssues(response.data.data || []);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssues();
  }, []);

  const handleCreateIssue = async (heading, desc, skills, repoId) => {
    try {
      const response = await axios.post(
        "/api/issues/create-issue",
        { heading, desc, skills: skills.split(",").map((skill) => skill.trim()), repoId }
      );
      setIssues((prev) => [response.data.data, ...prev]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating issue:", error);
    }
  };

  const handleMarkAsDone = async (issueId) => {
    try {
      // Assuming your backend allows marking an issue as done
      const response = await axios.post("/api/issues/mark-done", { issueId });
      setIssues(issues.filter((issue) => issue._id !== issueId)); // Remove the issue from the list
    } catch (error) {
      console.error("Error marking issue as done:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg rounded-b-md mb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-white">Your Issues</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Issue
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-10 flex-1">
        {issues.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <h2 className="text-2xl font-semibold text-gray-300">
              No issues yet. Create your first issue to get started!
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {issues.map((issue) => (
              <div
                key={issue._id}
                className="bg-gray-800 rounded-lg shadow-md p-6 hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <h3 className="text-xl font-semibold text-white hover:text-blue-500 hover:underline cursor-pointer">
                  {issue.heading}
                </h3>
                <p className="mt-2 text-gray-400 line-clamp-2">
                  {issue.description}
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">
                    Skills: {issue.skills.join(", ")}
                  </span>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleMarkAsDone(issue._id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold text-white mb-4">Create New Issue</h2>
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Repository ID"
                value={newIssue.repoId}
                onChange={(e) => setNewIssue({ ...newIssue, repoId: e.target.value })}
                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Heading"
                value={newIssue.heading}
                onChange={(e) => setNewIssue({ ...newIssue, heading: e.target.value })}
                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Description"
                value={newIssue.desc}
                onChange={(e) => setNewIssue({ ...newIssue, desc: e.target.value })}
                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Skills (comma-separated)"
                value={newIssue.skills}
                onChange={(e) => setNewIssue({ ...newIssue, skills: e.target.value })}
                className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleCreateIssue(
                    newIssue.heading,
                    newIssue.desc,
                    newIssue.skills,
                    newIssue.repoId
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
