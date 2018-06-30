export enum NoteLetter {
    A,
    B,
    C,
    D,
    E,
    F,
    G,
}

export enum Augmentation {
    '𝄫' = -2,
    '♭' = -1,
    '♮' = 0,
    '♯' = 1,
    '𝄪' = 2,
}

const OCTAVE_MIN: number = 1;
const OCTAVE_MAX: number = 7;
const AUG_MIN: number = -2;
const AUG_MAX: number = 2;

const validateOctave: Function = (octave: number) => {
    if (octave < OCTAVE_MIN || octave > OCTAVE_MAX) throw new Error(`Octave ${octave} out of range`);
};

const validateAugmentation: Function = (augmentation: number) => {
    if (augmentation < AUG_MIN || augmentation > AUG_MAX) throw new Error(`Augmentation to ${augmentation} out of range`);
}

export default class Note {
    public letter: NoteLetter;
    public octave: number;
    public aug: Augmentation;

    constructor (letter: NoteLetter, octave: number, aug = 0) {
        validateOctave(octave);
        validateAugmentation(aug);
        this.letter = letter;
        this.octave = octave;
        this.aug = aug;
    }

    toString (showNaturalSymbol = false): string {
        const augSymbol = (showNaturalSymbol || this.aug !== 0) ? Augmentation[this.aug] : '';
        return `${NoteLetter[this.letter]}${augSymbol}${this.octave}`;
    }

    augment (augIncrement: number): Note {
        const newAug: number = augIncrement + this.aug;
        validateAugmentation(newAug);
        this.aug = newAug;
        return this;
    }

    increment (inc: number): void {

    }
}
