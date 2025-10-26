import { TwinkleLogo } from './TwinkleLogo';

interface Service {
  id: string;
  name: string;
  color: string;
  icon: string;
}

interface ServiceSelectionProps {
  onServiceSelect: (serviceId: string) => void;
}

export function ServiceSelection({ onServiceSelect }: ServiceSelectionProps) {
  const services: Service[] = [
    {
      id: 'notion',
      name: 'Notion',
      color: '#000000',
      icon: 'N',
    },
    {
      id: 'google-keep',
      name: 'Google Keep Notes',
      color: '#FBBC04',
      icon: 'G',
    },
    {
      id: 'evernote',
      name: 'Evernote',
      color: '#00A82D',
      icon: 'E',
    },
    {
      id: 'apple-notes',
      name: 'Apple Notes',
      color: '#FFCC00',
      icon: 'A',
    },
    {
      id: 'asana',
      name: 'Asana',
      color: '#F06A6A',
      icon: 'a',
    },
    {
      id: 'onenote',
      name: 'OneNote',
      color: '#7719AA',
      icon: 'O',
    },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Logo at very top */}
      <div className="flex justify-center pt-8 mb-20">
        <TwinkleLogo size="lg" />
      </div>

      <div className="max-w-3xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="mb-4 text-5xl tracking-tight bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
            Let's reimagine your ideas
          </h1>
          <p className="text-gray-500">
            Connect your favourite note service(s)
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-3 gap-x-12 gap-y-10">
          {services.map((service) => (
            <button
              key={service.id}
              className="flex flex-col items-center gap-3 group cursor-pointer transition-transform hover:scale-105"
              onClick={() => onServiceSelect(service.id)}
            >
              {/* Logo */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all group-hover:shadow-md"
                style={{ backgroundColor: service.color }}
              >
                <span className="text-white text-xl">
                  {service.icon}
                </span>
              </div>

              {/* Service Name */}
              <span className="text-gray-700 text-sm">
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
