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

  const stats = calculateReadingStats(store.text, store.wordsPerMinute);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor="text-input" className="text-sm font-medium">
          Enter Text
        </label>
        {store.text.length > 0 && (
          <div className="text-xs text-muted-foreground">
            {stats.wordCount} words · {Math.ceil(stats.estimatedReadTime / 60)}{' '}
            min read
          </div>
        )}
      </div>

      <Textarea
        id="text-input"
        className="min-h-[150px] font-mono text-sm"
        placeholder="Paste or type text here to begin speed reading..."
        value={store.text}
        onChange={handleTextChange}
        disabled={store.isPlaying}
      />

      <div className="text-xs text-muted-foreground">
        <p>
          Tip: For best results, paste clean text without extra formatting. The
          reader will automatically handle punctuation and spacing.
        </p>
      </div>
    </div>
  );
});

export default TextInput;
