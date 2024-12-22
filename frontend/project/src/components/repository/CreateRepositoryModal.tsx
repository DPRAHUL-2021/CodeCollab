import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface CreateRepositoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    description: string,
    isPrivate: boolean,
    githubUrl?: string
  ) => void;
}

export function CreateRepositoryModal({
  isOpen,
  onClose,
}: CreateRepositoryModalProps) {
  const navigate = useNavigate();
  const [repos, setRepos] = useState<any[]>([]);
  const [selectedRepoIndex, setSelectedRepoIndex] = useState<number | null>(null);

  const getGithubRepos = async () => {
    try {
      const repos = await axios.get(
        "http://localhost:3000/api/v1/repository/get-repos",
        {
          withCredentials: true,
        }
      );
      console.log(repos.data);
      setRepos(repos.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addRepository = async () => {
    if (selectedRepoIndex === null) return; // Make sure a repository is selected

    const repo = repos[selectedRepoIndex];

    console.log(repo);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/repository/add-repo",
        {
          name: repo.name,
          id: repo.id,
          htmlUrl: repo.html_url,
          cloneUrl: repo.clone_url,
          desc: repo.description,
          priv: repo.private,
          language: repo.language,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.statusCode === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error adding repository:", error);
    }
  };

  useEffect(() => {
    getGithubRepos();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 text-white rounded-lg w-full max-w-md shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Create a New Repository
          </h2>

          {/* Import from GitHub Section */}
          <div className="flex items-center justify-between bg-blue-600 text-white p-2 rounded-md mb-4">
            <span>Import from GitHub</span>
            <div className="bg-blue-700 text-xs text-white px-3 py-1 rounded-full">
              GitHub Repositories
            </div>
          </div>

          {/* Dropdown to select repository */}
          {repos && (
            <select
              value={selectedRepoIndex ?? ""}
              onChange={(e) => setSelectedRepoIndex(Number(e.target.value))}
              className="w-full p-3 mb-4 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>
                Select a repository
              </option>
              {repos.map((repo: any, index: any) => (
                <option key={index} value={index}>
                  {repo.name}
                </option>
              ))}
            </select>
          )}

          <div className="flex justify-between space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addRepository}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Repository
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
