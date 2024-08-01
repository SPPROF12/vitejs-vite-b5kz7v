import React, { useState } from 'react';
import { useQuery, useAction, createLogistic, updateLogistic } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const LogisticsPage = () => {
  const { data: logistics, isLoading, error } = useQuery(getLogistics);
  const createLogisticFn = useAction(createLogistic);
  const updateLogisticFn = useAction(updateLogistic);
  const [newLogisticName, setNewLogisticName] = useState('');
  const [newLogisticCarbonFootprint, setNewLogisticCarbonFootprint] = useState(0);
  const [editingLogisticId, setEditingLogisticId] = useState(null);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateLogistic = () => {
    createLogisticFn({ name: newLogisticName, carbonFootprint: newLogisticCarbonFootprint });
    setNewLogisticName('');
    setNewLogisticCarbonFootprint(0);
  };

  const handleUpdateLogistic = (logisticId) => {
    const updatedName = prompt('Enter new name:');
    const updatedCarbonFootprint = prompt('Enter new carbon footprint:');
    updateLogisticFn({ logisticId, name: updatedName, carbonFootprint: parseFloat(updatedCarbonFootprint) });
  };

  return (
    <div className='p-4'>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='New Logistic Name'
          className='px-1 py-2 border rounded text-lg'
          value={newLogisticName}
          onChange={(e) => setNewLogisticName(e.target.value)}
        />
        <input
          type='number'
          placeholder='New Logistic Carbon Footprint'
          className='px-1 py-2 border rounded text-lg'
          value={newLogisticCarbonFootprint}
          onChange={(e) => setNewLogisticCarbonFootprint(parseFloat(e.target.value))}
        />
        <button
          onClick={handleCreateLogistic}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Logistic
        </button>
      </div>
      <div>
        {logistics.map((logistic) => (
          <div
            key={logistic.id}
            className='py-2 px-2 flex items-center justify-between hover:bg-gray-100 gap-x-2 rounded'
          >
            <div>{logistic.name}</div>
            <div>{logistic.carbonFootprint}</div>
            <div>
              <button
                onClick={() => handleUpdateLogistic(logistic.id)}
                className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LogisticsPage;