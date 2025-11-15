import React from 'react';
import { observer } from 'mobx-react-lite';
import { useSpeedReaderStore } from '@/stores/StoreProvider';
import { Textarea } from '@/components/ui/textarea';
import { calculateReadingStats } from '@/lib/utils';

const TextInput: React.FC = observer(() => {
  const store = useSpeedReaderStore();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    store.setText(e.target.value);
  };

  const handleClearText = () => {
    store.setText('');
  };

  const stats = calculateReadingStats(store.text, store.wordsPerMinute);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label htmlFor="text-input" className="text-sm font-semibold flex items-center gap-2">
          <svg
            className="w-4 h-4 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Your Text
        </label>
        <div className="flex items-center gap-3">
          {store.text.length > 0 && (
            <>
              <div className="text-xs text-muted-foreground bg-secondary px-3 py-1.5 rounded-full">
                <span className="font-semibold text-foreground">{stats.wordCount}</span> words
                <span className="mx-1.5">·</span>
                <span className="font-semibold text-foreground">
                  {Math.ceil(stats.estimatedReadTime / 60)}
                </span> min
              </div>
              <button
                onClick={handleClearText}
                disabled={store.isPlaying}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Clear text"
              >
                Clear
              </button>
            </>
          )}
        </div>
      </div>

      <Textarea
        id="text-input"
        className="min-h-[180px] text-sm resize-none focus:ring-2 focus:ring-primary/20 transition-shadow"
        placeholder="Paste or type your text here to begin speed reading..."
        value={store.text}
        onChange={handleTextChange}
        disabled={store.isPlaying}
      />

      <div className="flex items-start gap-2 p-3 bg-accent/50 rounded-lg border border-accent">
        <svg
          className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-xs text-muted-foreground leading-relaxed">
          We've loaded a sample from <span className="font-medium text-foreground">Alice in Wonderland</span> to get you started.
          Replace it with your own text or try the sample to experience speed reading!
        </p>
      </div>
    </div>
  );
});

export default TextInput;
