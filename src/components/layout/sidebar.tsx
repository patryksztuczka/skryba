import { Plus } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  description?: string;
}

interface SidebarProps {
  collections: Collection[];
  onNewCollection: () => void;
  onCollectionSelect: (id: string) => void;
  selectedCollectionId?: string;
}

export const Sidebar = ({
  collections,
  onNewCollection,
  onCollectionSelect,
  selectedCollectionId,
}: SidebarProps) => {
  return (
    <aside className="border-dark-200 bg-dark-100 flex h-full w-64 flex-col border-r p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Collections</h2>
        <button
          onClick={onNewCollection}
          className="bg-dark-200 text-primary-400 hover:bg-dark-300 rounded-full p-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {collections.map(collection => (
          <button
            key={collection.id}
            onClick={() => onCollectionSelect(collection.id)}
            className={`w-full rounded-lg p-3 text-left transition-colors ${
              selectedCollectionId === collection.id
                ? 'bg-dark-200 text-primary-400'
                : 'hover:bg-dark-200 text-white'
            }`}
          >
            <div className="font-medium">{collection.name}</div>
            {collection.description && (
              <div className="text-dark-600 mt-1 line-clamp-2 text-sm">
                {collection.description}
              </div>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
};
