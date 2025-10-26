import { useState } from 'react';
import { ServiceSelection } from './components/ServiceSelection';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
    }, 1000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isConnected ? (
        <ServiceSelection onServiceSelect={handleServiceSelect} />
      ) : (
        <Dashboard onDisconnect={handleDisconnect} />
      )}
    </div>
  );
}
