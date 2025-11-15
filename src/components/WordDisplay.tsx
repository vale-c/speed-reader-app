import React from 'react';
import { observer } from 'mobx-react-lite';
import { useSpeedReaderStore } from '@/stores/StoreProvider';
import { cn } from '@/lib/utils';

const WordDisplay: React.FC = observer(() => {
  const store = useSpeedReaderStore();
  const { currentWord } = store;

  if (!currentWord) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4 text-center px-4">
        <div className="p-4 rounded-full bg-primary/10 mb-2">
          <svg
            className="w-12 h-12 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div>
          <p className="text-lg font-medium text-foreground mb-2">
            Ready to speed read?
          </p>
          <p className="text-sm text-muted-foreground max-w-sm">
            We've loaded a sample from Alice in Wonderland. Press play below to start, or paste your own text!
          </p>
        </div>
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
      className="flex items-center justify-center h-full w-full transition-all duration-150"
      style={{
        fontFamily: store.fontFamily,
      }}
    >
      <div className="relative text-center">
        {/* Crosshair guide - top */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-8 w-[2px] h-6 bg-primary/20" />

        {/* Main word display */}
        <span
          className={cn('inline-block transition-all duration-100 ease-out select-none')}
          style={{
            fontSize: `${store.fontSize}px`,
            lineHeight: 1.2,
          }}
        >
          <span className="text-muted-foreground/80">{beforeFocus}</span>
          <span className="text-primary font-bold relative">
            {focusLetter}
            {/* Focus indicator dot */}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full" />
          </span>
          <span className="text-foreground">{afterFocus}</span>
        </span>

        {/* Crosshair guide - bottom */}
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-8 w-[2px] h-6 bg-primary/20" />

        {/* Vertical alignment line */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[1px] bg-primary/15 pointer-events-none"
          style={{
            left: '50%',
            height: `${store.fontSize * 1.6}px`,
          }}
        />
      </div>
    </div>
  );
});

export default WordDisplay;
