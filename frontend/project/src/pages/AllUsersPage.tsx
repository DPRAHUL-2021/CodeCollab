import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RepositoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const navigate = useNavigate();

  const fetchRepositories = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/repository/get-all-repos",
      {
        withCredentials: true,
      }
    );
    setRepositories(response.data.data);
  };

  const filteredRepos = repositories.filter((repo) =>
    repo.repoName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return (
    <div className="relative min-h-screen bg-gray-900">
      {/* Sticky Navbar */}
      <nav className="bg-gray-800 bg-opacity-80 shadow-md  p-4 flex items-center justify-between sticky top-0 z-50">
        <input
          type="text"
          placeholder="Search repositories"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-96 bg-gray-700 text-gray-200 rounded-full px-4 py-2 shadow focus:outline-none focus:ring-4 focus:ring-blue-400"
        />
        <div className="flex items-center gap-4 relative">
          {/* "Our Repos" Button */}
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300"
          >
            Your Repos
          </button>
          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <div
              className="w-10 h-10 bg-gray-700 text-gray-200 rounded-full cursor-pointer flex items-center justify-center shadow-md"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="font-bold">P</span>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-gray-800 text-gray-200 rounded-xl shadow-lg z-50">
                <button
                  onClick={() => alert("Logging out...")}
                  className="block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left rounded-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Repository Cards */}
      <main className="flex flex-col items-center px-4 pt-6">
        <div className="w-full max-w-3xl">
          {filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => (
              <div
                key={repo._id}
                className="bg-gray-800 bg-opacity-90 text-gray-200 p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 mb-4"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-blue-400">
                      {repo.repoName}
                    </h2>
                    <p className="text-gray-400 mt-2 text-sm">{repo.desc}</p>
                    <div className="flex items-center gap-3 mt-4 text-xs">
                      <span className="bg-blue-700 text-white px-2 py-1 rounded-full">
                        {repo.language ? repo.language : "None"}
                      </span>
                      {/* <span className="text-gray-400">
                        Updated {repo.lastUpdated}
                      </span> */}
                    </div>
                  </div>
                </div>

                {/* URL Section */}
                <div className="mt-4 flex items-center gap-4">
                  <input
                    type="text"
                    readOnly
                    value={repo.cloneUrl}
                    className="w-full bg-gray-700 text-gray-200 rounded-full px-4 py-2 shadow focus:outline-none text-sm"
                  />
                  <button
                    onClick={() => handleCopy(repo.cloneUrl)}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-full shadow-md focus:outline-none focus:ring-4 focus:ring-blue-400 transition duration-300 px-3 py-1 text-sm"
                  >
                    Copy
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No repositories found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
