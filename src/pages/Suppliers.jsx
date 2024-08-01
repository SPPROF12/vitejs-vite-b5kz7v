import React, { useState } from 'react';
import { useQuery, useAction, getSuppliers, createSupplier, updateSupplier } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const Suppliers = () => {
  const { data: suppliers, isLoading, error } = useQuery(getSuppliers);
  const createSupplierFn = useAction(createSupplier);
  const updateSupplierFn = useAction(updateSupplier);
  const [newSupplierName, setNewSupplierName] = useState('');
  const [newSupplierCarbonFootprint, setNewSupplierCarbonFootprint] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateSupplier = () => {
    createSupplierFn({ name: newSupplierName, carbonFootprint: newSupplierCarbonFootprint });
    setNewSupplierName('');
    setNewSupplierCarbonFootprint('');
  };

  const handleUpdateSupplier = (supplierId, name, carbonFootprint) => {
    updateSupplierFn({ supplierId, name, carbonFootprint });
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Supplier Name'
          className='px-1 py-2 border rounded text-lg'
          value={newSupplierName}
          onChange={(e) => setNewSupplierName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Carbon Footprint'
          className='px-1 py-2 border rounded text-lg'
          value={newSupplierCarbonFootprint}
          onChange={(e) => setNewSupplierCarbonFootprint(e.target.value)}
        />
        <button
          onClick={handleCreateSupplier}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Supplier
        </button>
      </div>
      <div>
        {suppliers.map((supplier) => (
          <div
            key={supplier.id}
            className='py-2 px-2 flex items-center hover:bg-gray-100 gap-x-2 rounded'
          >
            <p>{supplier.name}</p>
            <p>{supplier.carbonFootprint}</p>
            <button
              onClick={() => handleUpdateSupplier(supplier.id, `${supplier.name} Updated`, supplier.carbonFootprint + 1)}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            >
              Update
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Suppliers;