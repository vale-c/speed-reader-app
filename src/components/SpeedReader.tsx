import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useSpeedReaderStore } from '@/stores/StoreProvider';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatTime } from '@/lib/utils';
import { Play, Pause, RotateCcw, Sun, Moon } from 'lucide-react';

const SpeedReader: React.FC = observer(() => {
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
    <div className="flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-200">
      <div className="w-full max-w-3xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Speed Reader</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => store.toggleDarkMode()}
            aria-label={
              store.darkMode ? 'Switch to light mode' : 'Switch to dark mode'
            }
          >
            {store.darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Word Display */}
        <div className="flex flex-col items-center justify-center p-10 bg-card rounded-lg shadow-lg min-h-[200px]">
          {store.currentWord ? (
            <div
              className="text-center transition-all duration-200 ease-in-out"
              style={{
                fontSize: `${store.fontSize}px`,
                fontFamily: store.fontFamily,
              }}
            >
              <span className="text-foreground">{store.currentWord.word}</span>
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              Enter text below and press play to start
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            onClick={() => store.start()}
            disabled={store.isPlaying || store.textChunks.length === 0}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" /> Play
          </Button>
          <Button
            onClick={() => store.pause()}
            disabled={!store.isPlaying}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Pause className="h-4 w-4" /> Pause
          </Button>
          <Button
            onClick={() => store.stop()}
            disabled={!store.isPlaying && store.currentIndex === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="speed-slider" className="text-sm font-medium">
              Reading Speed: {store.wordsPerMinute} WPM
            </label>
            {store.isPlaying && (
              <span className="text-sm text-muted-foreground">
                Time remaining: {formatTime(store.estimatedTimeRemaining)}
              </span>
            )}
          </div>
          <Slider
            id="speed-slider"
            min={100}
            max={1000}
            step={10}
            value={[store.wordsPerMinute]}
            onValueChange={(value) => store.setWordsPerMinute(value[0])}
            aria-label="Reading speed"
          />
        </div>

        {/* Progress Bar */}
        {store.textChunks.length > 0 && (
          <div className="w-full bg-secondary rounded-full h-2.5">
            <div
              className="bg-primary h-2.5 rounded-full transition-all duration-200"
              style={{ width: `${store.progress}%` }}
            ></div>
          </div>
        )}

        {/* Text Input */}
        <div className="space-y-2">
          <label htmlFor="text-input" className="text-sm font-medium">
            Enter Text
          </label>
          <textarea
            id="text-input"
            className="w-full min-h-[150px] p-4 rounded-md border border-input bg-background text-foreground"
            placeholder="Paste or type text here..."
            onChange={(e) => store.setText(e.target.value)}
            disabled={store.isPlaying}
          />
        </div>

        {/* Font Size Controls */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Font Size</label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                store.setFontSize(Math.max(16, store.fontSize - 4))
              }
              disabled={store.fontSize <= 16}
            >
              A-
            </Button>
            <span className="text-sm">{store.fontSize}px</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                store.setFontSize(Math.min(72, store.fontSize + 4))
              }
              disabled={store.fontSize >= 72}
            >
              A+
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SpeedReader;
