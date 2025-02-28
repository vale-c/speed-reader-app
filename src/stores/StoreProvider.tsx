import React, { createContext, useContext } from 'react';
import SpeedReaderStore from './SpeedReaderStore';

interface StoreContextValue {
  speedReaderStore: SpeedReaderStore;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const speedReaderStore = React.useMemo(() => new SpeedReaderStore(), []);

  const value = {
    speedReaderStore,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStores = (): StoreContextValue => {
  const context = useContext(StoreContext);
  if (context === null) {
    throw new Error('useStores must be used within a StoreProvider');
  }
  return context;
};

export const useSpeedReaderStore = (): SpeedReaderStore => {
  const { speedReaderStore } = useStores();
  return speedReaderStore;
};
