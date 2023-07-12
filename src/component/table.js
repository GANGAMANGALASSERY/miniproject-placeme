import React, { useState, useEffect, useRef } from 'react';
import Adminnavbar from '../admin/adminnavbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const RegistrationTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const storedRegistrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const sortedRegistrations = [...storedRegistrations].sort((a, b) => a.name.localeCompare(b.name));
    setRegistrations(sortedRegistrations);
  }, []);

  const handleDelete = (index) => {
    const updatedRegistrations = [...registrations];
    updatedRegistrations.splice(index, 1);
    localStorage.setItem('registrations', JSON.stringify(updatedRegistrations));
    setRegistrations(updatedRegistrations);
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.autoTable({ html: tableRef.current });
    doc.save('registration_table.pdf');
  };

  return (
    <div>
      <Adminnavbar />
      <h2>Registered students</h2>
      <button onClick={handlePrint}>Print</button>
      <table ref={tableRef}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact Number</th>
            <th>Address</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration, index) => (
            <tr key={index}>
              <td>{registration.name}</td>
              <td>{registration.email}</td>
              <td>{registration.contactNumber}</td>
              <td>{registration.address}</td>
              <td>{registration.city}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrationTable;
