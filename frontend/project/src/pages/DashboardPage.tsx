import { useState, useEffect } from "react";
import axios from "axios";
import { Plus } from "lucide-react";
import { Repository } from "../types";
import { RepositoryList } from "../components/repository/RepositoryList";
import { CreateRepositoryModal } from "../components/repository/CreateRepositoryModal";

export function DashboardPage() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Fetch repositories from the backend
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/repository/get-repos", {
          withCredentials: true,
        });
        setRepositories(response.data.repos);
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
    setRepositories((prev) => prev.filter((repo) => repo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Your Repositories
            </h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="inline-flex items-center px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              <Plus className="h-5 w-5 mr-2" />
              New
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {repositories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No repositories yet. Create your first repository to get started!
          </div>
        ) : (
          <RepositoryList
            repositories={repositories}
            onDeleteRepository={handleDeleteRepository}
          />
        )}
      </main>

      <CreateRepositoryModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateRepository}
      />
    </div>
  );
}