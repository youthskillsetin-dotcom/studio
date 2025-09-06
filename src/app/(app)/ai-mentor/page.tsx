import AIChatInterface from '@/components/ai-chat-interface';

export default function AIMentorPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.24))]">
        <div className="mb-4">
            <h1 className="text-3xl font-bold font-headline">AI Mentor</h1>
            <p className="text-muted-foreground">Ask me anything about your lessons or career path!</p>
        </div>
      <AIChatInterface />
    </div>
  );
}
