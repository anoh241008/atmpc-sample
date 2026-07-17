import React from 'react';

const Notifications = () => {
  const notifications = [
    {
      id: 'NTF001',
      type: 'Payment Received',
      message: 'Juan Dela Cruz paid ₱5,000 for Room 101',
      date: 'May 21, 2025',
      status: 'New',
    },
    {
      id: 'NTF002',
      type: 'Overdue Alert',
      message: 'Payment overdue for Room 102 since May 10, 2025',
      date: 'May 21, 2025',
      status: 'Urgent',
    },
    {
      id: 'NTF003',
      type: 'Payment Failed',
      message: 'Payment failed for Maria Clara (Room 103)',
      date: 'May 20, 2025',
      status: 'Attention',
    },
    {
      id: 'NTF004',
      type: 'Lease Request',
      message: 'Request for lease extension from Juan Dela Cruz (Room 101)',
      date: 'May 19, 2025',
      status: 'Pending',
    },
    {
      id: 'NTF005',
      type: 'Tenant Message',
      message: 'Maria Clara sent a message regarding noise complaint',
      date: 'May 18, 2025',
      status: 'New',
    },
  ];

  // Status color based on notification urgency/type
  const statusColor = (status) => {
    switch (status) {
      case 'Urgent':
        return 'text-red-600 ';
      case 'Attention':
        return 'text-yellow-700 ';
      case 'Pending':
        return 'text-blue-600 ';
      case 'New':
      default:
        return 'text-green-600 ';
    }
  };

  return (

      <div className="h-screen font-oswald px-6 md:px-20 bg-gray-100 pb-10">
        <div className="mx-auto max-w-3xl grid grid-cols-1 gap-6 mt-10 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border">
            <h2 className="text-lg font-bold text-black mb-6">🔔 Notifications</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-black">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="text-left p-3">Type</th>
                    <th className="text-left p-3">Message</th>
                    <th className="text-left p-3">Date</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {notifications.map((notif) => (
                    <tr key={notif.id} className="border-t hover:bg-gray-50">
                      <td className="p-3 font-semibold">{notif.type}</td>
                      <td className="p-3">{notif.message}</td>
                      <td className="p-3">{notif.date}</td>
                      <td className={`p-2 px-4 rounded-full font-semibold w-max ${statusColor(notif.status)}`}>
                        {notif.status}
                      </td>
                      <td className="p-3 flex gap-2">
                        <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded hover:bg-blue-600">
                          View
                        </button>
                        <button className="bg-green-500 text-white text-xs px-3 py-1 rounded hover:bg-green-600">
                          Mark Read
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>  
      </div>
  );
};

export default Notifications;
