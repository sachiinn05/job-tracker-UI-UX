import AddPreparationForm from "../components/AddPreparationForm";
import PreparationCard from "../components/PreparationCard";
import PreparationDetailsPanel from "../components/PreparationDetailsPanel";
import bg from "../assets/bg.jpg";

function PreparationPage() {
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

            <div className="lg:col-span-2 space-y-6">

              <AddPreparationForm />

              <PreparationCard />
              <PreparationCard />

            </div>

            <PreparationDetailsPanel />

          </div>

        </div>

      </div>
    </div>
  );
}

export default PreparationPage;