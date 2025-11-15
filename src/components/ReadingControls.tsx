import React from 'react';
import { observer } from 'mobx-react-lite';
import { useSpeedReaderStore } from '@/stores/StoreProvider';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { formatTime } from '@/lib/utils';
import { Play, Pause, RotateCcw, SkipBack, SkipForward } from 'lucide-react';

const ReadingControls: React.FC = observer(() => {
  const store = useSpeedReaderStore();

  const handleSkipBackward = () => {
    if (store.currentIndex > 0) {
      store.currentIndex = Math.max(0, store.currentIndex - 5);
    }
  };

  const handleSkipForward = () => {
    if (store.currentIndex < store.textChunks.length - 1) {
      store.currentIndex = Math.min(
        store.textChunks.length - 1,
        store.currentIndex + 5
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Playback Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSkipBackward}
          disabled={store.currentIndex === 0 || store.textChunks.length === 0}
          aria-label="Skip backward 5 words"
          className="h-10 w-10 rounded-full"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

        <Button
          onClick={() => store.start()}
          disabled={store.isPlaying || store.textChunks.length === 0}
          size="lg"
          className="flex items-center gap-2 px-8 rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          <Play className="h-5 w-5" /> Play
        </Button>

        <Button
          onClick={() => store.pause()}
          disabled={!store.isPlaying}
          variant="outline"
          size="lg"
          className="flex items-center gap-2 px-8 rounded-full"
        >
          <Pause className="h-5 w-5" /> Pause
        </Button>

        <Button
          onClick={() => store.stop()}
          disabled={!store.isPlaying && store.currentIndex === 0}
          variant="outline"
          size="icon"
          className="h-10 w-10 rounded-full"
          aria-label="Reset to beginning"
        >
          <RotateCcw className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={handleSkipForward}
          disabled={
            store.currentIndex === store.textChunks.length - 1 ||
            store.textChunks.length === 0
          }
          aria-label="Skip forward 5 words"
          className="h-10 w-10 rounded-full"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar with Stats */}
      {store.textChunks.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              {store.currentIndex + 1} / {store.textChunks.length} words
            </span>
            {store.isPlaying && (
              <span className="flex items-center gap-1">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {formatTime(store.estimatedTimeRemaining)} remaining
              </span>
            )}
          </div>
          <div className="relative w-full bg-secondary/50 rounded-full h-2 overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-blue-600 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${store.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Speed Control */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label htmlFor="speed-slider" className="text-sm font-semibold">
            Reading Speed
          </label>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary tabular-nums">
              {store.wordsPerMinute}
            </span>
            <span className="text-sm text-muted-foreground">WPM</span>
          </div>
        </div>
        <Slider
          id="speed-slider"
          min={100}
          max={1000}
          step={10}
          value={[store.wordsPerMinute]}
          onValueChange={(value) => store.setWordsPerMinute(value[0])}
          aria-label="Reading speed in words per minute"
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Slow (100)</span>
          <span>Average (300)</span>
          <span>Fast (1000)</span>
        </div>
      </div>
    </div>
  );
});

export default ReadingControls;
