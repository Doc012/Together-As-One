import React from 'react';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Active Maintenance',
          bgColor: 'bg-red-100',
          textColor: 'text-red-800',
          dotColor: 'bg-red-500',
          borderColor: 'border-red-200'
        };
      case 'upcoming':
        return {
          label: 'Upcoming Maintenance',
          bgColor: 'bg-amber-100',
          textColor: 'text-amber-800',
          dotColor: 'bg-amber-500',
          borderColor: 'border-amber-200'
        };
      case 'completed':
        return {
          label: 'Maintenance Completed',
          bgColor: 'bg-green-100',
          textColor: 'text-green-800',
          dotColor: 'bg-green-500',
          borderColor: 'border-green-200'
        };
      case 'delayed':
        return {
          label: 'Maintenance Delayed',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-800',
          dotColor: 'bg-blue-500',
          borderColor: 'border-blue-200'
        };
      default:
        return {
          label: 'Status Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-800',
          dotColor: 'bg-gray-500',
          borderColor: 'border-gray-200'
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center px-3 py-1 rounded-full ${config.bgColor} ${config.textColor} border ${config.borderColor}`}>
      <div className={`w-2 h-2 rounded-full ${config.dotColor} mr-2 animate-pulse`}></div>
      <span className="text-sm font-medium">{config.label}</span>
    </div>
  );
};

export default StatusBadge;