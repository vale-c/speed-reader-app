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
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Settings</h3>
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

      {/* Font Size Controls */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Font Size</label>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => store.setFontSize(Math.max(16, store.fontSize - 4))}
            disabled={store.fontSize <= 16}
          >
            A-
          </Button>
          <span className="text-sm min-w-[50px] text-center">
            {store.fontSize}px
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => store.setFontSize(Math.min(72, store.fontSize + 4))}
            disabled={store.fontSize >= 72}
          >
            A+
          </Button>
        </div>
      </div>

      {/* Font Family Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Font Family</label>
        <ToggleGroup
          type="single"
          value={store.fontFamily}
          onValueChange={(value) => {
            if (value) store.setFontFamily(value);
          }}
        >
          {fontOptions.map((font) => (
            <ToggleGroupItem
              key={font.value}
              value={font.value}
              aria-label={`Set font to ${font.label}`}
              className="text-xs"
            >
              {font.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      {/* Reading Tips */}
      <div className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
        <h4 className="font-medium mb-1">Reading Tips</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Start with 300 WPM and gradually increase</li>
          <li>Take breaks every 10-15 minutes</li>
          <li>Adjust font size for comfortable viewing</li>
          <li>Try different fonts to find what works best</li>
        </ul>
      </div>
    </div>
  );
});

export default SettingsPanel;
