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
    <aside className="bg-dark-100/80 flex h-full w-72 flex-col p-4 backdrop-blur-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="from-primary-300 to-accent-300 bg-gradient-to-r bg-clip-text text-lg font-semibold text-transparent">
          Collections
        </h2>
        <button
          onClick={onNewCollection}
          className="from-primary-500 to-accent-500 shadow-primary-900/20 hover:shadow-primary-900/30 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r text-white shadow-lg transition-all hover:scale-105 active:scale-100"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto">
        {collections.map(collection => (
          <button
            key={collection.id}
            onClick={() => onCollectionSelect(collection.id)}
            className={`group relative w-full overflow-hidden rounded-lg p-3 text-left transition-all ${
              selectedCollectionId === collection.id
                ? 'from-primary-500/20 to-accent-500/20 shadow-primary-900/10 bg-gradient-to-r shadow-lg'
                : 'hover:bg-dark-200/80'
            }`}
          >
            {selectedCollectionId === collection.id && (
              <div className="from-primary-500/10 to-accent-500/10 absolute inset-0 bg-gradient-to-r" />
            )}
            <div className="relative">
              <div
                className={`font-medium ${
                  selectedCollectionId === collection.id
                    ? 'from-primary-300 to-accent-300 bg-gradient-to-r bg-clip-text text-transparent'
                    : 'text-white'
                }`}
              >
                {collection.name}
              </div>
              {collection.description && (
                <div className="text-dark-600 mt-1 text-sm">
                  {collection.description}
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};
