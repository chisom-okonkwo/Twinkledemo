import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Calendar, Sparkles } from 'lucide-react';
import { NoteDetailDialog } from './NoteDetailDialog';

interface Memory {
  id: string;
  title: string;
  snippet: string;
  date: string;
  timeAgo: string;
  fullContent?: string;
}

export function MemoryHighlights() {
  const [selectedMemoryIndex, setSelectedMemoryIndex] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data - in real implementation, this would fetch notes from the same day in previous months/years
  const memories: Memory[] = [
    {
      id: '1',
      title: 'Bathroom Musings',
      snippet: 'There’s a place for innovation and a place for preservation. Not everything has to change,...',
      date: 'October 12, 2025',
      timeAgo: '14 days ago',
    },
    {
      id: '2',
      title: 'Project Idea',
      snippet: 'SnapNotes - notes that speak to you - It utilizes AI to analyze the notes and predict your thought process...',
      date: 'July 26, 2025',
      timeAgo: '3 months ago',
    },
    {
      id: '3',
      title: 'Comeback Season - Goto Scriptures',
      snippet: 'Isaiah 28:11 - "for with stammering lips and another tongue will he speak to this people."...',
      date: 'October 26, 2024',
      timeAgo: '6 months ago',
    },
    {
      id: '5',
      title: 'Bathroom Musings',
      snippet: 'People who truly made an impact will be remembered and not missed....',
      date: 'October 26, 2023',
      timeAgo: '1 years ago',
    },
    {
      id: '4',
      title: 'College Essay Inspo',
      snippet: 'As the words from my heart/mouth read like a manifesto...',
      date: 'October 26, 2024',
      timeAgo: '2 year ago',
    },
  ];

  const handleMemoryClick = (index: number) => {
    setSelectedMemoryIndex(index);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setTimeout(() => setSelectedMemoryIndex(null), 200);
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (selectedMemoryIndex === null) return;
    
    if (direction === 'prev' && selectedMemoryIndex > 0) {
      setSelectedMemoryIndex(selectedMemoryIndex - 1);
    } else if (direction === 'next' && selectedMemoryIndex < memories.length - 1) {
      setSelectedMemoryIndex(selectedMemoryIndex + 1);
    }
  };

  if (memories.length === 0) {
    return null;
  }

  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const selectedMemory = selectedMemoryIndex !== null ? memories[selectedMemoryIndex] : null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-500" />
        <h2>On This Day - {today}</h2>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
        {memories.map((memory, index) => (
          <Card 
            key={memory.id} 
            className="min-w-[320px] max-w-[320px] snap-start hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
            onClick={() => handleMemoryClick(index)}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                  {memory.timeAgo}
                </Badge>
                <Calendar className="w-4 h-4 text-purple-400" />
              </div>
              
              <h3 className="mb-2">{memory.title}</h3>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                {memory.snippet}
              </p>
              
              <div className="text-xs text-gray-500">
                {memory.date}
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Empty state card encouraging more notes */}
        <Card className="min-w-[320px] max-w-[320px] snap-start border-dashed flex items-center justify-center">
          <CardContent className="pt-6 text-center">
            <Sparkles className="w-8 h-8 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">
              Keep taking notes to build your memory timeline
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-xs text-gray-500 mt-2">
        💡 Swipe to see more memories from this day
      </div>

      <NoteDetailDialog
        memory={selectedMemory}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onNavigate={handleNavigate}
        canNavigatePrev={selectedMemoryIndex !== null && selectedMemoryIndex > 0}
        canNavigateNext={selectedMemoryIndex !== null && selectedMemoryIndex < memories.length - 1}
      />
    </div>
  );
}
