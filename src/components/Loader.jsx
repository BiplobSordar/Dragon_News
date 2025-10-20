import { Loader as LoaderIcon } from 'lucide-react';
export default function Loader() {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="flex items-center gap-2">
        <LoaderIcon className="animate-spin" size={24} />
        <span className="font-medium">Loading...</span>
      </div>
    </div>
  );
}
