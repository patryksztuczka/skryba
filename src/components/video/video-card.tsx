import { FileText } from 'lucide-react';

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

interface VideoCardProps {
  video: Video;
  onViewTranscript: (videoId: string) => void;
}

const statusColors = {
  downloading: 'from-primary-400 to-accent-400',
  transcribing: 'from-primary-500 to-accent-500',
  summarizing: 'from-primary-600 to-accent-600',
  completed: 'from-primary-700 to-accent-700',
  error: 'from-red-500 to-red-600',
} as const;

const statusLabels = {
  downloading: 'Downloading',
  transcribing: 'Transcribing',
  summarizing: 'Summarizing',
  completed: 'Completed',
  error: 'Error',
} as const;

export const VideoCard = ({ video, onViewTranscript }: VideoCardProps) => {
  return (
    <div className="group border-dark-200/50 bg-dark-200/50 hover:bg-dark-200 relative overflow-hidden rounded-lg border backdrop-blur-sm transition-all">
      <div className="from-primary-600/5 to-accent-600/5 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="bg-dark-300/50 aspect-video w-full">
        {video.thumbnailUrl ? (
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="text-dark-500 flex h-full items-center justify-center">
            No thumbnail
          </div>
        )}
      </div>
      <div className="relative p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="group-hover:from-primary-200 group-hover:to-accent-200 font-medium text-white group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent">
            {video.title}
          </h3>
          <span
            className={`shrink-0 rounded-full bg-gradient-to-r px-2 py-1 text-xs font-medium text-white ${
              statusColors[video.status]
            }`}
          >
            {statusLabels[video.status]}
          </span>
        </div>
        {video.summary && (
          <p className="text-dark-600 mb-4 line-clamp-3 text-sm">
            {video.summary}
          </p>
        )}
        {video.status === 'completed' && (
          <button
            onClick={() => onViewTranscript(video.id)}
            className="text-primary-400 hover:text-primary-300 flex items-center gap-2 text-sm transition-colors"
          >
            <FileText className="h-4 w-4" />
            View Transcript
          </button>
        )}
      </div>
    </div>
  );
};
