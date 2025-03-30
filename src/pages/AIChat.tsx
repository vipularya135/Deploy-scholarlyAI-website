
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const AIChat = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
      <Navbar />

      <div className="text-center p-6">
        <h2 className="text-2xl font-bold mb-4">AI Chat</h2>
        <p className="text-gray-400 mb-6">Click the button below to open the AI chat in a new tab.</p>
        <Button
          onClick={() => window.open("https://app-aichat-vipul.streamlit.app/", "_blank")}
          className="h-12 px-6 text-lg"
        >
          Open AI Chat
        </Button>
      </div>
    </div>
  );
};

export default AIChat;
