import { useEffect, useState } from "react";

import { addEmployee, deleteEmployee, getEmployees } from "../apis/employee";
import Loader from "../components/Loader";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await getEmployees();
      if(res.error) throw new Error(res.error);
      setEmployees(res.data);
    } catch (error) {
      alert(error.message);
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add new employee
  const handleAddEmployee = async () => {
    if (!newEmployee.name || !newEmployee.email) return;
    try {
      const res = await addEmployee(newEmployee);
      if(res.error) throw new Error(res.error);
      setEmployees((prev) => [...prev, res.data]);
      setNewEmployee({ name: "", email: "" });
      setIsModalOpen(false);
    } catch (error) {
      alert(error.message);
      console.error("Error adding employee:", error);
    }
  };

  // Delete employee
  const handleDeleteEmployee = async (id) => {
    if (!id) return;
    try {
      const res = await deleteEmployee(id);
      if(res.error) throw new Error(res.error);
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {loading ? (
        <Loader />
      ) : (
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees?.length > 0 ? (
              employees.map((emp) => (
                <tr key={emp._id || emp.email}>
                  <td className="py-2 px-4 border-b">{emp.name}</td>
                  <td className="py-2 px-4 border-b">{emp.email}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDeleteEmployee(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setIsModalOpen(true)}
      >
        Add Employee
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/25">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
            <input
              type="text"
              placeholder="Name"
              value={newEmployee.name}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, name: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newEmployee.email}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, email: e.target.value })
              }
              className="w-full mb-3 p-2 border rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleAddEmployee}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
