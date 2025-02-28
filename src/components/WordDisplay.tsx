import React from 'react';
import { observer } from 'mobx-react-lite';
import { useSpeedReaderStore } from '@/stores/StoreProvider';
import { cn } from '@/lib/utils';

const WordDisplay: React.FC = observer(() => {
  const store = useSpeedReaderStore();
  const { currentWord } = store;

  if (!currentWord) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground text-center">
          Enter text and press play to start reading
        </p>
      </div>
    );
  }

  // Find the optimal focus point (typically 1/3 of the way through the word)
  const word = currentWord.word;
  const focusPoint = Math.max(1, Math.min(Math.floor(word.length / 3), 4));

  // Split the word into three parts: before focus point, focus letter, and after
  const beforeFocus = word.substring(0, focusPoint - 1);
  const focusLetter = word.substring(focusPoint - 1, focusPoint);
  const afterFocus = word.substring(focusPoint);

  return (
    <div
      className="flex items-center justify-center h-full transition-all duration-150"
      style={{
        fontFamily: store.fontFamily,
      }}
    >
      <div className="relative text-center">
        <span
          className={cn('inline-block transition-all duration-150')}
          style={{ fontSize: `${store.fontSize}px` }}
        >
          <span className="text-muted-foreground">{beforeFocus}</span>
          <span className="text-primary font-bold">{focusLetter}</span>
          <span className="text-foreground">{afterFocus}</span>
        </span>

        {/* Optional: Show a vertical line at the focus point for better visual alignment */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-primary/20 opacity-50"
          style={{
            left: `calc(${beforeFocus.length + 0.5}ch)`,
            height: `${store.fontSize * 1.2}px`,
          }}
        />
      </div>
    </div>
  );
});

export default WordDisplay;
