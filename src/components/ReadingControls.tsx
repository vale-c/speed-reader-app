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
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleSkipBackward}
          disabled={store.currentIndex === 0 || store.textChunks.length === 0}
          aria-label="Skip backward"
        >
          <SkipBack className="h-4 w-4" />
        </Button>

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

        <Button
          variant="outline"
          size="icon"
          onClick={handleSkipForward}
          disabled={
            store.currentIndex === store.textChunks.length - 1 ||
            store.textChunks.length === 0
          }
          aria-label="Skip forward"
        >
          <SkipForward className="h-4 w-4" />
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
    </div>
  );
});

export default ReadingControls;
