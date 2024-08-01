import React from 'react';
import { useQuery, useAction, Link, getSuppliers, getLogistics, createSupplier, updateSupplier, createLogistic, updateLogistic } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: suppliers, isLoading: suppliersLoading, error: suppliersError } = useQuery(getSuppliers);
  const { data: logistics, isLoading: logisticsLoading, error: logisticsError } = useQuery(getLogistics);
  const updateSupplierFn = useAction(updateSupplier);
  const updateLogisticFn = useAction(updateLogistic);

  if (suppliersLoading || logisticsLoading) return 'Loading...';
  if (suppliersError || logisticsError) return 'Error: ' + (suppliersError || logisticsError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <h2 className='text-lg font-bold mb-2'>Suppliers</h2>
      {suppliers.map((supplier) => (
        <div key={supplier.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{supplier.name}</div>
          <div>Carbon Footprint: {supplier.carbonFootprint}</div>
          <button
            onClick={() => updateSupplierFn({ id: supplier.id })}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
          >
            Update
          </button>
        </div>
      ))}
      <h2 className='text-lg font-bold mb-2'>Logistics</h2>
      {logistics.map((logistic) => (
        <div key={logistic.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{logistic.name}</div>
          <div>Carbon Footprint: {logistic.carbonFootprint}</div>
          <button
            onClick={() => updateLogisticFn({ id: logistic.id })}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2'
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;