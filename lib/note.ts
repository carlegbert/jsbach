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

const LETTER_MIN: number = 1;
const LETTER_MAX: number = 7;
const AUG_MIN: number = -2;
const AUG_MAX: number = 2;

export default class Note {
    private _letter: NoteLetter;
    private _octave: number;
    private _aug: Augmentation;

    constructor(letter: NoteLetter, octave: number, aug: Augmentation = 0) {
        if (aug < AUG_MIN || aug > AUG_MAX) {
            throw new Error(`Augmentation to ${aug} out of range`);
        }
        this._octave = octave + Math.floor(letter / LETTER_MAX);
        this._letter = letter % LETTER_MAX;
        this._aug = aug;
        this.normalize();
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
        );
    }

    public decrement(): Note {
        return new Note(
            this._letter - 1,
            this._octave,
        );
    }

    private normalize(): void {
        if (this._letter > LETTER_MAX) {
            this._letter = LETTER_MIN;
            this._octave += 1;
        } else if (this._letter < LETTER_MIN) {
            this._letter = LETTER_MAX;
            this._octave -= 1;
        }
    }
}
