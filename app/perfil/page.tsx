import PerfilForm from "@/components/base/PerfilForm";

export default function PerfilPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-lg text-black w-full p-6 bg-white shadow-md rounded-lg bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-4">Perfil</h2>
        <PerfilForm />
      </div>
    </div>
  );
}
