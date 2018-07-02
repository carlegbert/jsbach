import {
    AUG_MAX,
    AUG_MIN,
    Augmentation,
    LETTER_MAX,
    LETTER_MIN,
    NoteLetter,
} from "./constants";

export default class Note {
    private readonly _letter: number;
    private readonly _octave: number;
    private readonly _aug: number;

    constructor(letter: number, octave: number, aug: number = 0) {
        if (aug < AUG_MIN || aug > AUG_MAX) {
            throw new Error(`Augmentation to ${aug} out of range`);
        }

        if (letter > LETTER_MAX) {
            letter = LETTER_MIN;
            octave += 1;
        } else if (letter < LETTER_MIN) {
            letter = LETTER_MAX;
            octave -= 1;
        }

        this._octave = octave;
        this._letter = letter;
        this._aug = aug;
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
}
