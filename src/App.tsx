import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreProvider, useSpeedReaderStore } from '@/stores/StoreProvider';
import SpeedReader from '@/components/SpeedReader';
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <div className="container py-8 mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-center">Speed Reader</h1>
          <p className="text-center text-muted-foreground mt-2">
            Improve your reading speed and comprehension
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Word Display */}
            <div className="bg-card rounded-lg shadow-lg p-8 min-h-[250px] flex items-center justify-center">
              <WordDisplay />
            </div>

            {/* Reading Controls */}
            <div className="bg-card rounded-lg shadow p-6">
              <ReadingControls />
            </div>

            {/* Text Input */}
            <div className="bg-card rounded-lg shadow p-6">
              <TextInput />
            </div>
          </div>

          {/* Settings Panel */}
          <div className="bg-card rounded-lg shadow p-6 h-fit">
            <SettingsPanel />
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-muted-foreground">
          <p>Speed Reader App &copy; {new Date().getFullYear()}</p>
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
