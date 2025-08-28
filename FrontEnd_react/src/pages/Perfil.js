// Perfil.jsx
import React, { useState } from 'react';

const SideBar = ({ drawerOpen, toggleDrawer }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
        drawerOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-20`}
    >
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Perfil
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Configurações
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-600 hover:text-green-600">
              Sair
            </a>
          </li>
        </ul>
        <button onClick={toggleDrawer} className="mt-4 text-gray-600">
          <i className="material-icons">close</i>
        </button>
      </div>
    </div>
  );
};

const Perfil = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    name: 'Usuário',
    cpf: '999.999.999-99',
    email: 'usuario@exemplo.com',
    crq: '9999999999',
    role: '-',
    admissionDate: '2022-05-13',
  });
  const [editData, setEditData] = useState(userData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setToast({ message: 'Imagem muito grande (máx. 2MB)', type: 'error' });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleEditChange = (field, value) => {
    setEditData({ ...editData, [field]: value });
  };

const handleSave = () => {
    if (!editData.name || !editData.email) {
      setToast({ message: 'Nome e e-mail são obrigatórios', type: 'error' });
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(editData.email)) {
      setToast({ message: 'E-mail inválido', type: 'error' });
      return;
    }
    setUserData(editData);
    setIsModalOpen(false);
    setToast({ message: 'Dados salvos com sucesso!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* AppBar */}
      <header className="bg-green-600 text-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <button onClick={toggleDrawer} className="text-white">
            <i className="material-icons">menu</i>
          </button>
          <h1 className="text-xl font-semibold">Perfil do Usuário</h1>
        </div>
      </header>

      {/* Sidebar */}
      <SideBar drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} />

      {/* Main Content */}
      <main className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Toast Notification */}
        {toast && (
          <div
            className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {toast.message}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Perfil do Usuário
          </h1>

          {/* Profile Photo */}
          <div className="flex flex-col items-center mb-6">
            <img
              src={
                image ||
                `https://ui-avatars.com/api/?name=${userData.name}&background=fb923c&color=fff`
              }
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-green-600 mb-4"
            />
            <h2 className="text-xl font-medium text-gray-700">{userData.name}</h2>
          </div>

          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Dados Pessoais
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">CPF:</span> {userData.cpf}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">E-mail:</span> {userData.email}
              </p>
            </div>
          </div>

          {/* Professional Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Dados Profissionais
            </h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">CRQ:</span> {userData.crq}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Cargo:</span> {userData.role}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Data de Admissão:</span>{' '}
                {userData.admissionDate}
              </p>
            </div>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Editar Dados
          </button>
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
              <div className="space-y-4">
                {/* Profile Photo */}
                <div className="flex flex-col items-center">
                  <img
                    src={
                      image ||
                      `https://ui-avatars.com/api/?name=${editData.name}&background=fb923c&color=fff`
                    }
                    alt="Profile"
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                  <label className="bg-green-600 text-white px-3 py-1 rounded-lg cursor-pointer">
                    Alterar Foto
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>

                {/* Personal Information */}
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => handleEditChange('name', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Nome"
                />
                <input
                  type="text"
                  value={editData.cpf}
                  onChange={(e) => handleEditChange('cpf', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="CPF"
                />
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleEditChange('email', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="E-mail"
                />

                {/* Professional Information */}
                <input
                  type="text"
                  value={editData.crq}
                  onChange={(e) => handleEditChange('crq', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="CRQ"
                />
                <input
                  type="text"
                  value={editData.role}
                  onChange={(e) => handleEditChange('role', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                  placeholder="Cargo"
                />
                <input
                  type="date"
                  value={editData.admissionDate}
                  onChange={(e) => handleEditChange('admissionDate', e.target.value)}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />

                {/* Modal Buttons */}
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Perfil;