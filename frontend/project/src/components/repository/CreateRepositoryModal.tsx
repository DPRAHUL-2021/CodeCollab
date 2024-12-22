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
  const [selectedRepoIndex, setSelectedRepoIndex] = useState<number | null>(
    null
  );

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
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="p-6">
          <h2 className="text-2xl text-black font-bold mb-6">
            Create a new repository
          </h2>
          <div className="mb-4">
            <div className="flex space-x-4 mb-4">
              <div
                className={`flex-1 py-2 px-4 rounded-md bg-blue-500 text-white`}
              >
                Import from GitHub
              </div>
            </div>
          </div>

          {/* Dropdown to select repository */}
          {repos && (
            <select
              value={selectedRepoIndex ?? ""}
              onChange={(e) => setSelectedRepoIndex(Number(e.target.value))}
              className="mb-4 text-black"
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

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addRepository}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Add repository
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
