import {
    NoteLetter,
    Augmentation,
    LETTER_MIN,
    LETTER_MAX,
    AUG_MIN,
    AUG_MAX,
} from './constants';

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
