import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreProvider, useSpeedReaderStore } from '@/stores/StoreProvider';
import WordDisplay from '@/components/WordDisplay';
import ReadingControls from '@/components/ReadingControls';
import TextInput from '@/components/TextInput';
import SettingsPanel from '@/components/SettingsPanel';
import '@/styles/globals.css';

const AppContent: React.FC = observer(() => {
  const store = useSpeedReaderStore();

  // Apply dark mode class to document
  useEffect(() => {
    if (store.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [store.darkMode]);

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-6 md:py-10 max-w-7xl">
        {/* Header */}
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Speed Reader
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Train your brain to read faster with precision and comprehension
          </p>
        </header>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Word Display - Primary Focus */}
            <div className="bg-card border border-border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-8 md:p-12 min-h-[280px] flex items-center justify-center">
              <WordDisplay />
            </div>

            {/* Reading Controls */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
              <ReadingControls />
            </div>

            {/* Text Input */}
            <div className="bg-card border border-border rounded-xl shadow-sm p-6 md:p-8">
              <TextInput />
            </div>
          </div>

          {/* Settings Panel */}
          <div className="lg:sticky lg:top-6 bg-card border border-border rounded-xl shadow-sm p-6 md:p-8 h-fit">
            <SettingsPanel />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 md:mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            Speed Reader &copy; {new Date().getFullYear()} · Built for better reading
          </p>
        </footer>
      </div>
    </div>
  );
});

const App: React.FC = () => {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
};

export default App;
