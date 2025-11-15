import { makeAutoObservable, runInAction } from 'mobx';

export interface TextChunk {
  id: number;
  word: string;
  isPunctuation: boolean;
}

const DEFAULT_SAMPLE_TEXT = `Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do: once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it, "and what is the use of a book," thought Alice "without pictures or conversations?"

So she was considering in her own mind (as well as she could, for the hot day made her feel very sleepy and stupid), whether the pleasure of making a daisy-chain would be worth the trouble of getting up and picking the daisies, when suddenly a White Rabbit with pink eyes ran close by her.

There was nothing so very remarkable in that; nor did Alice think it so very much out of the way to hear the Rabbit say to itself, "Oh dear! Oh dear! I shall be late!" (when she thought it over afterwards, it occurred to her that she ought to have wondered at this, but at the time it all seemed quite natural); but when the Rabbit actually took a watch out of its waistcoat-pocket, and looked at it, and then hurried on, Alice started to her feet, for it flashed across her mind that she had never before seen a rabbit with either a waistcoat-pocket, or a watch to take out of it, and burning with curiosity, she ran across the field after it, and fortunately was just in time to see it pop down a large rabbit-hole under the hedge.`;

class SpeedReaderStore {
  text: string = DEFAULT_SAMPLE_TEXT;
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
    // Parse the default text on initialization
    this.textChunks = this.parseText(DEFAULT_SAMPLE_TEXT);
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
