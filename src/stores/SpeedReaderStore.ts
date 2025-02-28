import { makeAutoObservable, runInAction } from 'mobx';

export interface TextChunk {
  id: number;
  word: string;
  isPunctuation: boolean;
}

class SpeedReaderStore {
  text: string = '';
  textChunks: TextChunk[] = [];
  currentIndex: number = 0;
  isPlaying: boolean = false;
  wordsPerMinute: number = 300;
  darkMode: boolean = false;
  intervalId: number | null = null;
  fontSize: number = 32;
  fontFamily: string = 'Inter, sans-serif';

  constructor() {
    makeAutoObservable(this);
  }

  setText(text: string) {
    this.text = text;
    this.textChunks = this.parseText(text);
    this.currentIndex = 0;
    this.stop();
  }

  parseText(text: string): TextChunk[] {
    // Split text by spaces and handle punctuation
    const words = text.trim().split(/\s+/);
    return words.map((word, id) => {
      const isPunctuation = /^[.,;:!?]$/.test(word);
      return { id, word, isPunctuation };
    });
  }

  start() {
    if (this.textChunks.length === 0) return;

    if (this.currentIndex >= this.textChunks.length) {
      this.currentIndex = 0;
    }

    this.isPlaying = true;

    // Clear any existing interval
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
    }

    // Calculate milliseconds per word
    const msPerWord = (60 * 1000) / this.wordsPerMinute;

    // Set an interval to update the current index
    this.intervalId = window.setInterval(() => {
      runInAction(() => {
        if (this.currentIndex < this.textChunks.length - 1) {
          this.currentIndex++;
        } else {
          this.stop();
        }
      });
    }, msPerWord);
  }

  pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  stop() {
    this.isPlaying = false;
    this.currentIndex = 0;
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  setWordsPerMinute(wpm: number) {
    this.wordsPerMinute = wpm;
    // If currently playing, restart with new speed
    if (this.isPlaying) {
      this.pause();
      this.start();
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
  }

  setFontSize(size: number) {
    this.fontSize = size;
  }

  setFontFamily(font: string) {
    this.fontFamily = font;
  }

  reset() {
    this.stop();
    this.text = '';
    this.textChunks = [];
    this.currentIndex = 0;
    this.wordsPerMinute = 300;
  }

  get currentWord(): TextChunk | null {
    if (
      this.textChunks.length === 0 ||
      this.currentIndex >= this.textChunks.length
    ) {
      return null;
    }
    return this.textChunks[this.currentIndex];
  }

  get progress(): number {
    if (this.textChunks.length === 0) return 0;
    return (this.currentIndex / (this.textChunks.length - 1)) * 100;
  }

  get estimatedTimeRemaining(): number {
    if (!this.isPlaying || this.textChunks.length === 0) return 0;
    const wordsRemaining = this.textChunks.length - this.currentIndex - 1;
    return Math.ceil((wordsRemaining / this.wordsPerMinute) * 60);
  }
}

export default SpeedReaderStore;
