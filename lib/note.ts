export enum NoteLetter {
    A = 1,
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
const LETTER_MIN: number = 1;
const LETTER_MAX: number = 7;
const AUG_MIN: number = -2;
const AUG_MAX: number = 2;

const validateOctave: Function = (octave: number) => {
    if (octave < OCTAVE_MIN || octave > OCTAVE_MAX) throw new Error(`Octave ${octave} out of range`);
};


export default class Note {
    public letter: NoteLetter;
    public octave: number;
    public aug: Augmentation;

    constructor (letter: NoteLetter, octave: number, aug: Augmentation = 0) {
        this.letter = letter;
        this.octave = octave;
        this.aug = aug;
        this.validateAugmentation();
        validateOctave(octave);
    }

    private normalize (): Note {
        if (this.letter > LETTER_MAX) {
            this.letter = LETTER_MIN;
            this.octave += 1;
        } else if (this.letter < LETTER_MIN) {
            this.letter = LETTER_MAX;
            this.octave -= 1;
        }
        validateOctave(this.octave);
        this.validateAugmentation();
        return this;
    }

    private validateAugmentation (): void {
        if (this.aug < AUG_MIN || this.aug > AUG_MAX) throw new Error(`Augmentation to ${this.aug} out of range`);
    }

    toString (showNaturalSymbol = false): string {
        const augSymbol = (showNaturalSymbol || this.aug !== 0) ? Augmentation[this.aug] : '';
        return `${NoteLetter[this.letter]}${augSymbol}${this.octave}`;
    }

    augment (augIncrement: number): Note {
        try {
            this.aug += augIncrement;
            this.validateAugmentation();
        } catch (err) {
            throw err;
        }
        return this;
    }

    increment (): Note {
        return new Note(
            this.letter + 1,
            this.octave,
            this.aug,
        ).normalize();
    }

    decrement (): Note {
        return new Note(
            this.letter - 1,
            this.octave,
            this.aug,
        ).normalize();
    }
}
