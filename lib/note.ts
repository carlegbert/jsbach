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
    private _letter: NoteLetter;
    private _octave: number;
    private _aug: Augmentation;

    constructor (letter: NoteLetter, octave: number, aug: Augmentation = 0) {
        this._letter = letter;
        this._octave = octave;
        this._aug = aug;
        this.validateAugmentation();
        validateOctave(octave);
    }

    get letter () {
        return this._letter;
    }

    get octave () {
        return this._octave;
    }

    get aug () {
        return this._aug;
    }

    private normalize (): Note {
        if (this._letter > LETTER_MAX) {
            this._letter = LETTER_MIN;
            this._octave += 1;
        } else if (this._letter < LETTER_MIN) {
            this._letter = LETTER_MAX;
            this._octave -= 1;
        }
        validateOctave(this._octave);
        this.validateAugmentation();
        return this;
    }

    private validateAugmentation (): void {
        if (this._aug < AUG_MIN || this._aug > AUG_MAX) throw new Error(`Augmentation to ${this._aug} out of range`);
    }

    toString (showNaturalSymbol = false): string {
        const augSymbol = (showNaturalSymbol || this._aug !== 0) ? Augmentation[this._aug] : '';
        return `${NoteLetter[this._letter]}${augSymbol}${this._octave}`;
    }

    augment (augIncrement: number): Note {
        try {
            this._aug += augIncrement;
            this.validateAugmentation();
        } catch (err) {
            throw err;
        }
        return this;
    }

    increment (): Note {
        return new Note(
            this._letter + 1,
            this._octave,
            this._aug,
        ).normalize();
    }

    decrement (): Note {
        return new Note(
            this._letter - 1,
            this._octave,
            this._aug,
        ).normalize();
    }
}
