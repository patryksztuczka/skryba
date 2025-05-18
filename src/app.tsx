import { useState } from 'react';
import { MainLayout } from './components/layout/main-layout';
import { Sidebar } from './components/layout/sidebar';
import { PrimaryPane } from './components/layout/primary-pane';

import './styles/global.css';

interface Video {
  id: string;
  title: string;
  status:
    | 'downloading'
    | 'transcribing'
    | 'summarizing'
    | 'completed'
    | 'error';
  summary?: string;
  thumbnailUrl?: string;
}

interface Collection {
  id: string;
  name: string;
  description?: string;
  videos: Video[];
}

function App() {
  const [selectedCollectionId, setSelectedCollectionId] = useState<string>();
  const [collections] = useState<Collection[]>([
    {
      id: '1',
      name: 'Programming Tutorials',
      description: 'Collection of programming tutorials and guides',
      videos: [],
    },
    {
      id: '2',
      name: 'Tech Talks',
      description: 'Interesting tech conference talks',
      videos: [
        {
          id: '1',
          title: 'The Future of React',
          status: 'completed',
          summary: 'A talk about the future of React and its ecosystem',
          thumbnailUrl: 'https://i.ytimg.com/vi/123/maxresdefault.jpg',
        },
      ],
    },
  ]);

  const selectedCollection = collections.find(
    c => c.id === selectedCollectionId,
  );

  const handleNewCollection = () => {
    // TODO: Implement new collection creation
    console.log('New collection clicked');
  };

  const handleAddVideo = () => {
    // TODO: Implement video addition
    console.log('Add video clicked');
  };

  const handleViewTranscript = (videoId: string) => {
    // TODO: Implement transcript viewing
    console.log('View transcript clicked', videoId);
  };

  return (
    <MainLayout>
      <Sidebar
        collections={collections}
        selectedCollectionId={selectedCollectionId}
        onCollectionSelect={setSelectedCollectionId}
        onNewCollection={handleNewCollection}
      />
      <PrimaryPane
        selectedCollection={selectedCollection}
        onAddVideo={handleAddVideo}
        onViewTranscript={handleViewTranscript}
      />
    </MainLayout>
  );
}

export default App;
