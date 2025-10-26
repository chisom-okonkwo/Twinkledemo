import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle, LogOut, FileText, Sparkles } from 'lucide-react';
import { MemoryHighlights } from './MemoryHighlights';

interface DashboardProps {
  onDisconnect: () => void;
}

export function Dashboard({ onDisconnect }: DashboardProps) {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <h1>Idea Inspiration</h1>
            <Badge variant="outline" className="flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-green-500" />
              Connected to Notion
            </Badge>
          </div>
          <Button variant="outline" onClick={onDisconnect}>
            <LogOut className="w-4 h-4 mr-2" />
            Disconnect
          </Button>
        </div>

        {/* Memory Highlights Section */}
        <MemoryHighlights />

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Stats Cards */}
          <Card>
            <CardHeader>
              <CardTitle>Total Notes</CardTitle>
              <CardDescription>Synced from Notion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">127</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ideas Found</CardTitle>
              <CardDescription>Unique concepts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">43</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connections</CardTitle>
              <CardDescription>Between ideas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl">89</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Ideas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recent Notes
              </CardTitle>
              <CardDescription>
                Your latest synced notes from Notion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { title: 'Project ideas for Q1', date: '2 hours ago' },
                  { title: 'Marketing strategy thoughts', date: '5 hours ago' },
                  { title: 'App feature brainstorm', date: '1 day ago' },
                  { title: 'Book notes: Atomic Habits', date: '2 days ago' },
                ].map((note, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>{note.title}</div>
                    <div className="text-sm text-gray-500">{note.date}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Inspiration Feed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Inspiration Feed
              </CardTitle>
              <CardDescription>
                Rediscover your ideas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { idea: 'You mentioned "AI automation" 5 times this month', type: 'Trend' },
                  { idea: 'Similar to your note from 3 months ago about productivity', type: 'Connection' },
                  { idea: 'You haven\'t revisited this idea in 6 months', type: 'Reminder' },
                  { idea: 'This concept appears in 3 different projects', type: 'Pattern' },
                ].map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                    <Badge variant="secondary" className="mb-2">{item.type}</Badge>
                    <div className="text-sm">{item.idea}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder for future features */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>More Features Coming Soon</CardTitle>
            <CardDescription>
              We're building additional tools to help you get inspired
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-dashed rounded-lg text-center">
                <div>Search & Filter</div>
              </div>
              <div className="p-4 border border-dashed rounded-lg text-center">
                <div>Idea Graph View</div>
              </div>
              <div className="p-4 border border-dashed rounded-lg text-center">
                <div>AI Suggestions</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
