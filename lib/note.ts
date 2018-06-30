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
    "𝄫" = -2,
    "♭" = -1,
    "♮" = 0,
    "♯" = 1,
    "𝄪" = 2,
}

const OCTAVE_MIN: number = 1;
const OCTAVE_MAX: number = 7;
const LETTER_MIN: number = 1;
const LETTER_MAX: number = 7;
const AUG_MIN: number = -2;
const AUG_MAX: number = 2;

const validateOctave = (octave: number): void => {
    if (octave < OCTAVE_MIN || octave > OCTAVE_MAX) {
        throw new Error(`Octave ${octave} out of range`);
    }
};

const validateAugmentation = (aug: Augmentation): void => {
    if (aug < AUG_MIN || aug > AUG_MAX) {
        throw new Error(`Augmentation to ${aug} out of range`);
    }
};

export default class Note {
    private _letter: NoteLetter;
    private _octave: number;
    private _aug: Augmentation;

    constructor(letter: NoteLetter, octave: number, aug: Augmentation = 0) {
        validateAugmentation(aug);
        this._letter = letter;
        this._octave = octave;
        this._aug = aug;
        validateOctave(octave);
    }

    get letter() {
        return this._letter;
    }

    get octave() {
        return this._octave;
    }

    get aug() {
        return this._aug;
    }

    public toString(showNaturalSymbol = false): string {
        const augSymbol = (showNaturalSymbol || this._aug !== 0) ? Augmentation[this._aug] : "";
        return `${NoteLetter[this._letter]}${augSymbol}${this._octave}`;
    }

    public sharpen(): Note {
        if (this._aug === AUG_MAX) {
            throw new Error("Can't sharpen above 𝄪");
        }
        return new Note(
            this._letter,
            this._octave,
            this._aug + 1,
        );
    }

    public flatten(): Note {
        if (this._aug === AUG_MIN) {
            throw new Error("Can't flatten below 𝄫");
        }
        return new Note(
            this._letter,
            this._octave,
            this._aug - 1,
        );
    }

    public increment(): Note {
        return new Note(
            this._letter + 1,
            this._octave,
        ).normalize();
    }

    public decrement(): Note {
        return new Note(
            this._letter - 1,
            this._octave,
        ).normalize();
    }

    private normalize(): Note {
        if (this._letter > LETTER_MAX) {
            this._letter = LETTER_MIN;
            this._octave += 1;
        } else if (this._letter < LETTER_MIN) {
            this._letter = LETTER_MAX;
            this._octave -= 1;
        }
        validateOctave(this._octave);
        return this;
    }
}
