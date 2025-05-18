import { useState } from 'react';
import { MainLayout } from './components/layout/main-layout';
import { Sidebar } from './components/layout/sidebar';

import './styles/global.css';

function App() {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>();
  const [collections] = useState([
    {
      id: '1',
      name: 'Programming Tutorials',
      description: 'Collection of programming tutorials and guides',
    },
    {
      id: '2',
      name: 'Tech Talks',
      description: 'Interesting tech conference talks',
    },
  ]);

  const handleNewCollection = () => {
    // TODO: Implement new collection creation
    console.log('New collection clicked');
  };

  return (
    <MainLayout>
      <Sidebar
        collections={collections}
        selectedCollectionId={selectedCollectionId}
        onCollectionSelect={setSelectedCollectionId}
        onNewCollection={handleNewCollection}
      />
      <div className="flex-1 p-6">
        {selectedCollectionId ? (
          <div>Selected collection: {selectedCollectionId}</div>
        ) : (
          <div className="flex h-full items-center justify-center text-neutral-500">
            Select a collection or create a new one
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default App;
