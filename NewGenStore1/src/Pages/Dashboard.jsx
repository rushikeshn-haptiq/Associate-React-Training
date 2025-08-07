import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHairChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      hair: {
        ...prev.hair,
        [name]: value
      }
    }));
  };

  const handleSave = () => {
    alert('Profile updated!');
    setEditMode(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Welcome, {user?.firstName} {user?.lastName}
      </h2>

      <div className="flex justify-center mb-6">
        <img
          src={formData?.image}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField label="Username" name="username" value={formData.username} onChange={handleChange} disabled={!editMode} />
        <InputField label="Email" name="email" value={formData.email} onChange={handleChange} disabled={!editMode} />
        <InputField label="Phone" name="phone" value={formData.phone} onChange={handleChange} disabled={!editMode} />
        <SelectField label="Gender" name="gender" value={formData.gender} onChange={handleChange} disabled={!editMode} />
        <InputField label="Age" name="age" value={formData.age} onChange={handleChange} disabled={!editMode} type="number" />
        <InputField label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} disabled={!editMode} />
        <InputField label="Eye Color" name="eyeColor" value={formData.eyeColor} onChange={handleChange} disabled={!editMode} />
        <InputField label="Hair Color" name="color" value={formData.hair?.color} onChange={handleHairChange} disabled={!editMode} />
        <InputField label="Hair Type" name="type" value={formData.hair?.type} onChange={handleHairChange} disabled={!editMode} />
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {editMode ? (
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Edit Profile
          </button>
        )}
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, disabled, type = 'text' }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">{label}:</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      }`}
    />
  </div>
);

const SelectField = ({ label, name, value, onChange, disabled }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium text-gray-700">{label}:</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      className={`p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
      }`}
    >
      <option value="">Select</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  </div>
);

export default Dashboard;
