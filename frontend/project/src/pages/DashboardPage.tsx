import { useState, useEffect } from "react";
import axios from "axios";
import { Plus, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Repository } from "../types";
import { CreateRepositoryModal } from "../components/repository/CreateRepositoryModal";

export function DashboardPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeRepo, setActiveRepo] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  // Fetch repositories from the backend
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/repository/get-user-repos",
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setRepositories(response.data.data);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    };

    fetchRepositories();
  }, []);

  const handleCreateRepository = async (
    name: string,
    description: string,
    isPrivate: boolean
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/repository/create-repo",
        { name, description, priv: isPrivate },
        { withCredentials: true }
      );
      setRepositories((prev) => [...prev, response.data.data]);
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Error creating repository:", error);
    }
  };

  const handleDeleteRepository = (id: string) => {
    setRepositories((prev) => prev.filter((repo) => repo._id !== id));
  };

  const handleRepoClick = (id: string) => {
    console.log(id);
    navigate(`/issues/${id}`);
  };

  const filteredRepositories = repositories.filter((repo) =>
    repo.repoName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-lg rounded-b-md mb-8">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-white">
              Your Repositories
            </h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Repository
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto px-6 sm:px-8 lg:px-10 py-10 flex-1">
        {repositories.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <h2 className="text-2xl font-semibold text-gray-300">
              No repositories yet. Create your first repository to get started!
            </h2>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {repositories.map((repo, index) => {
              console.log(repo);
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-lg shadow-md p-6 hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <h3
                    onClick={() => handleRepoClick(repo._id)}
                    className={`text-xl font-semibold text-white cursor-pointer transition-all duration-300 ${
                      activeRepo === repo._id
                        ? "underline text-blue-500"
                        : "hover:underline hover:text-blue-500"
                    }`}
                  >
                    {repo.repoName}
                  </h3>
                  <p className="mt-2 text-gray-400 min-w-96 line-clamp-2">
                    {repo.desc
                      ? repo.desc
                      : "No description for given repository"}
                  </p>
                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`text-sm ${
                        repo.private ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {repo.private ? "Private" : "Public"}
                    </span>
                    <button
                      onClick={() => handleDeleteRepository(repo._id)}
                      className="text-sm text-white bg-red-500 hover:bg-red-600 rounded-full px-4 py-2 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <CreateRepositoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRepository}
      />

      <footer className="bg-gray-800 text-gray-500 text-lg px-6 py-4 mt-auto w-full text-center">
        <p className="font-semibold">
          CodeCollab - Collaborate and Share Effortlessly
        </p>
      </footer>
    </div>
  );
}
