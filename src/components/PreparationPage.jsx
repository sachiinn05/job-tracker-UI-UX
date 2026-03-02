import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import AddPreparationForm from "../components/AddPreparationForm";
import PreparationCard from "../components/PreparationCard";
import PreparationDetailsPanel from "../components/PreparationDetailsPanel";
import bg from "../assets/bg.jpg";

function PreparationPage() {

  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

 
  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    const res = await axios.get(`${BASE_URL}/preparation`, {
      withCredentials: true,
    });
    setTopics(res.data);
  };

 
  const handleDelete = async (id) => {
    await axios.delete(`${BASE_URL}/preparation/${id}`, {
      withCredentials: true,
    });

    setTopics((prev) => prev.filter((t) => t._id !== id));

    if (selectedTopic?._id === id) {
      setSelectedTopic(null);
    }
  };

 
  const handleUpdate = async (id) => {
    const updatedConfidence = prompt("Enter new confidence (1-10)");
    if (!updatedConfidence) return;

    const res = await axios.patch(
      `${BASE_URL}/preparation/${id}`,
      { confidence: updatedConfidence },
      { withCredentials: true }
    );

    const updatedTopic = res.data;

    setTopics((prev) =>
      prev.map((t) =>
        t._id === id ? updatedTopic : t
      )
    );

    if (selectedTopic?._id === id) {
      setSelectedTopic(updatedTopic);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="bg-black/70 min-h-screen px-8 py-8">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-4xl font-bold mb-2">
            Preparation Tracker
          </h1>

          <p className="text-gray-400 mb-6">
            Track your learning & confidence
          </p>

          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">

              <AddPreparationForm
                onAdd={(topic) =>
                  setTopics((prev) => [topic, ...prev])
                }
              />

              {topics.length === 0 ? (
                <p className="text-gray-400">
                  No topics added yet.
                </p>
              ) : (
                topics.map((topic) => (
                  <PreparationCard
                    key={topic._id}
                    topic={topic}
                    onSelect={() => setSelectedTopic(topic)}
                    onDelete={() => handleDelete(topic._id)}
                    onUpdate={() => handleUpdate(topic._id)}
                  />
                ))
              )}

            </div>

          
            <PreparationDetailsPanel topic={selectedTopic} />

          </div>

        </div>
      </div>
    </div>
  );
}

export default PreparationPage;