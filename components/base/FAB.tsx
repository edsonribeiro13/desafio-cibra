import { useFABStore } from "@/store/FABStore";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface FABProps {
    route: string;
    hidden: boolean;
}

const FAB = ({ route }: FABProps) => {
  const router = useRouter();
  const { hideFAB } = useFABStore();

  return (
    <button
      onClick={() => router.push(route)}
      className={`fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg transition-opacity 
        duration-700 ease-in-out transform ${
        hideFAB ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100"
      } hover:bg-blue-700`}
    >
      <Plus size={28} />
    </button>
  );
};

export default FAB;
