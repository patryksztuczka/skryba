import { Plus, Youtube } from 'lucide-react';
import { VideoCard } from '../video/video-card';

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

interface PrimaryPaneProps {
  selectedCollection?: Collection;
  onAddVideo: (url: string) => void;
  onViewTranscript: (videoId: string) => void;
}

export const PrimaryPane = ({
  selectedCollection,
  onAddVideo,
  onViewTranscript,
}: PrimaryPaneProps) => {
  if (!selectedCollection) {
    return (
      <div className="text-dark-600 flex h-full flex-col items-center justify-center p-6">
        <p className="mb-2 text-lg">Select a collection or create a new one</p>
        <p className="text-sm">Your videos will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-dark-100/30 flex h-full flex-1 flex-col overflow-hidden p-6">
      <div className="mb-6">
        <h1 className="from-primary-300 to-accent-300 bg-gradient-to-r bg-clip-text text-2xl font-semibold text-transparent">
          {selectedCollection.name}
        </h1>
        {selectedCollection.description && (
          <p className="text-dark-600 mt-1">{selectedCollection.description}</p>
        )}
      </div>

      <div className="mb-6">
        <form
          onSubmit={e => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const input = form.elements.namedItem('url') as HTMLInputElement;
            onAddVideo(input.value);
            input.value = '';
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
              <Youtube className="text-dark-600 h-5 w-5" />
            </div>
            <input
              type="url"
              name="url"
              placeholder="Paste YouTube video URL here..."
              className="bg-dark-200/80 placeholder-dark-600 ring-primary-500/50 shadow-primary-900/5 focus:bg-dark-200 focus:shadow-primary-900/10 w-full rounded-lg py-2 pr-4 pl-10 text-white shadow-lg transition-all outline-none focus:ring-2"
              pattern="^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$"
              required
            />
          </div>
          <button
            type="submit"
            className="from-primary-500 to-accent-500 shadow-primary-900/20 hover:shadow-primary-900/30 flex items-center gap-2 rounded-lg bg-gradient-to-r px-4 py-2 font-medium text-white shadow-lg transition-all hover:scale-105 active:scale-100"
          >
            <Plus className="h-4 w-4" />
            Add Video
          </button>
        </form>
      </div>

      <div className="flex-1 overflow-y-auto">
        {selectedCollection.videos.length === 0 ? (
          <div className="border-dark-200/50 bg-dark-200/20 text-dark-600 flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed py-12 backdrop-blur-sm">
            <Youtube className="mb-4 h-12 w-12" />
            <p className="mb-2 text-lg">No videos yet</p>
            <p className="text-sm">Paste a YouTube URL above to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {selectedCollection.videos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                onViewTranscript={onViewTranscript}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
