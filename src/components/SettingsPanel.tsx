import React from 'react';
import { observer } from 'mobx-react-lite';
import { useSpeedReaderStore } from '@/stores/StoreProvider';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Sun, Moon } from 'lucide-react';

const SettingsPanel: React.FC = observer(() => {
  const store = useSpeedReaderStore();

  const fontOptions = [
    { value: 'Inter, sans-serif', label: 'Inter' },
    { value: 'Georgia, serif', label: 'Georgia' },
    { value: 'monospace', label: 'Mono' },
    { value: 'system-ui', label: 'System' },
  ];

  return (
    <div className="space-y-6">
      {/* Header with Dark Mode Toggle */}
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold">Settings</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => store.toggleDarkMode()}
          className="rounded-full hover:bg-accent"
          aria-label={
            store.darkMode ? 'Switch to light mode' : 'Switch to dark mode'
          }
        >
          {store.darkMode ? (
            <Sun className="h-5 w-5 text-amber-500" />
          ) : (
            <Moon className="h-5 w-5 text-slate-700" />
          )}
        </Button>
      </div>

      {/* Font Size Controls */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Display Size</label>
        <div className="flex items-center justify-between gap-3 p-3 bg-accent/30 rounded-lg">
          <Button
            variant="outline"
            size="sm"
            onClick={() => store.setFontSize(Math.max(16, store.fontSize - 4))}
            disabled={store.fontSize <= 16}
            className="rounded-full h-8 w-8 p-0"
            aria-label="Decrease font size"
          >
            <span className="text-base">A-</span>
          </Button>
          <div className="text-center flex-1">
            <div className="text-2xl font-bold text-primary tabular-nums">
              {store.fontSize}
            </div>
            <div className="text-xs text-muted-foreground">pixels</div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => store.setFontSize(Math.min(72, store.fontSize + 4))}
            disabled={store.fontSize >= 72}
            className="rounded-full h-8 w-8 p-0"
            aria-label="Increase font size"
          >
            <span className="text-base">A+</span>
          </Button>
        </div>
      </div>

      {/* Font Family Selection */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Font Style</label>
        <ToggleGroup
          type="single"
          value={store.fontFamily}
          onValueChange={(value) => {
            if (value) store.setFontFamily(value);
          }}
          className="grid grid-cols-2 gap-2"
        >
          {fontOptions.map((font) => (
            <ToggleGroupItem
              key={font.value}
              value={font.value}
              aria-label={`Set font to ${font.label}`}
              className="text-sm py-2 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
            >
              {font.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Divider */}
      <div className="border-t border-border" />

      {/* Reading Tips */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
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
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h4 className="text-sm font-semibold text-foreground">Pro Tips</h4>
        </div>
        <ul className="space-y-2.5 text-xs text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <span>Start at 300 WPM, then gradually increase as you get comfortable</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <span>Take 2-3 minute breaks every 15 minutes for optimal retention</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <span>Focus on the highlighted letter for better eye tracking</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
            <span>Experiment with fonts to find your perfect reading style</span>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default SettingsPanel;
