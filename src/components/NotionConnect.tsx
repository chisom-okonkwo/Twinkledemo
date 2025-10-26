import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Lightbulb } from 'lucide-react';

interface NotionConnectProps {
  onConnect: () => void;
  isLoading: boolean;
}

export function NotionConnect({ onConnect, isLoading }: NotionConnectProps) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lightbulb className="w-12 h-12 text-yellow-500" />
          </div>
          <CardTitle>Get Inspired by Your Ideas</CardTitle>
          <CardDescription>
            Connect your Notion workspace to discover patterns and insights from your notes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3>Features:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
              <li>Sync your Notion pages and databases</li>
              <li>Get inspired by your past ideas</li>
              <li>Discover connections between notes</li>
              <li>Find forgotten gems in your workspace</li>
            </ul>
          </div>
          
          <Button 
            onClick={onConnect} 
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Connecting to Notion...
              </>
            ) : (
              'Connect Notes'
            )}
          </Button>
          
          <p className="text-xs text-center text-gray-500">
            We'll redirect you to Notion to authorize access to your workspace
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
