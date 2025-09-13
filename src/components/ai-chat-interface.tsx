
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { aiMentorChat } from '@/ai/flows/ai-mentor-chat-interface';
import { Send, Bot, User, Loader2, Sparkles, PlusCircle, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';


const chatSchema = z.object({
  message: z.string(), // Allow empty to handle the slash command
});

// This now uses a simple content string, matching the corrected backend flow.
type Message = {
  role: 'user' | 'model';
  content: string;
};

const conversationStarters = [
  { title: 'Explain a Concept', prompt: 'Explain the 50-30-20 rule simply.' },
  { title: 'Ask About Careers', prompt: 'What skills do I need to be a UX Designer?' },
  { title: 'Get Practice Help', prompt: 'Help me practice for my lesson on AI Bias.' },
  { title: 'Request a Quiz', prompt: 'Create a short quiz on personal finance.' },
];

const initialMessage: Message = { role: 'model', content: "Hello! I'm MentorAI. How can I help you level up your skills today? Type `/` to see what I can do!" };
const CHAT_HISTORY_KEY = 'ai-mentor-chat-history';

export default function AIChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSlashCommands, setShowSlashCommands] = useState(false);
  const [copiedMessageIndex, setCopiedMessageIndex] = useState<number | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const form = useForm<z.infer<typeof chatSchema>>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  });

  const messageValue = form.watch('message');

  useEffect(() => {
    setShowSlashCommands(messageValue === '/');
  }, [messageValue]);


   useEffect(() => {
    // Load chat history from localStorage on initial render
    try {
      const savedHistory = localStorage.getItem(CHAT_HISTORY_KEY);
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      } else {
        setMessages([initialMessage]);
      }
    } catch (error) {
      console.error("Failed to parse chat history from localStorage", error);
      setMessages([initialMessage]);
    }
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
    // Save chat history to localStorage whenever it changes
     if (messages.length > 0) {
      try {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat history to localStorage", error);
      }
    }
  }, [messages]);

  const handleNewChat = () => {
    localStorage.removeItem(CHAT_HISTORY_KEY);
    setMessages([initialMessage]);
  };
  
  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content).then(() => {
        setCopiedMessageIndex(index);
        setTimeout(() => setCopiedMessageIndex(null), 2000); // Reset after 2 seconds
    });
  };


  async function sendMessage(messageText: string) {
    if (!messageText.trim()) return;

    const userMessage: Message = { role: 'user', content: messageText };
    const currentMessages: Message[] = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoading(true);
    form.reset({ message: '' });
    setShowSlashCommands(false);

    try {
      // The chat history for the API should not include the current user message
      const chatHistoryForApi = currentMessages.slice(0, -1);
      
      const response = await aiMentorChat({
        message: messageText,
        chatHistory: chatHistoryForApi,
      });

      const assistantMessage: Message = { role: 'model', content: response.response };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Mentor Chat Error:", error);
      const errorMessage: Message = { role: 'model', content: 'Sorry, I encountered an error. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(values: z.infer<typeof chatSchema>) {
    if (values.message === '/') return; // Don't send if it's just the slash
    await sendMessage(values.message);
  }

  const handleStarterClick = (starter: string) => {
    form.setValue('message', starter);
    sendMessage(starter);
  };

  const handleSlashCommandClick = (prompt: string) => {
    sendMessage(prompt);
  };


  return (
    <Card className="flex flex-col flex-grow relative">
       <CardHeader className="flex-row items-center justify-between border-b">
         <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
            </Avatar>
            <div>
                <h2 className="font-semibold">MentorAI</h2>
                <p className="text-xs text-muted-foreground">Your Personal Learning Assistant</p>
            </div>
         </div>
        <Button variant="outline" size="sm" onClick={handleNewChat}>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Chat
        </Button>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <ScrollArea className="h-[calc(100vh-22rem)]" ref={scrollAreaRef}>
          <div className="p-6 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                className={cn(
                  'flex items-start gap-4 group',
                  message.role === 'user' ? 'justify-end' : ''
                )}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {message.role === 'model' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-md rounded-lg px-4 py-3 text-sm shadow-md',
                    message.role === 'user'
                      ? 'bg-accent/20 text-accent-foreground'
                      : 'bg-muted'
                  )}
                >
                  <div dangerouslySetInnerHTML={{ __html: message.content.replace(/\\n/g, '<br />') }} className="prose prose-sm dark:prose-invert max-w-none" />
                </div>
                 {message.role === 'model' && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleCopy(message.content, index)}
                        >
                           {copiedMessageIndex === index ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{copiedMessageIndex === index ? 'Copied!' : 'Copy text'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                 )}
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
              </motion.div>
            ))}

            {messages.length > 1 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center"
              >
                <Button variant="outline" onClick={handleNewChat} className="mt-4">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create a new chat
                </Button>
              </motion.div>
            )}

            {messages.length <= 1 && !isLoading && (
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
               >
                 <AnimatePresence>
                  {conversationStarters.map((starter, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full h-full text-left justify-start py-3"
                        onClick={() => handleStarterClick(starter.prompt)}
                        disabled={isLoading}
                      >
                         <Sparkles className="w-4 h-4 mr-2 text-primary shrink-0" />
                        {starter.prompt}
                      </Button>
                    </motion.div>
                  ))}
                  </AnimatePresence>
              </motion.div>
            )}

             {isLoading && (
              <motion.div 
                className="flex items-start gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-3">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
       <AnimatePresence>
        {showSlashCommands && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-20 left-4 right-4 z-10"
          >
            <Card className="shadow-lg">
              <CardHeader className="pb-2">
                <p className="text-sm font-semibold">Conversation Starters</p>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2">
                  {conversationStarters.map((command) => (
                    <Button
                      key={command.title}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => handleSlashCommandClick(command.prompt)}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {command.prompt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <CardFooter className="border-t p-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center space-x-2">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input placeholder="Ask MentorAI... (or type '/' for ideas)" {...field} autoComplete="off" disabled={isLoading} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" size="icon" disabled={isLoading || !messageValue.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </CardFooter>
    </Card>
  );
}
