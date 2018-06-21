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

export default class Note {
    private _letter: NoteLetter;
    private _octave: number;
    private _aug: Augmentation;

    constructor (letter: NoteLetter, octave: number, aug = 0) {
        this._letter = letter;
        this._octave = octave;
        this._aug = aug;
    }

    get letter () {
        return NoteLetter[this._letter];
    }

    get aug () {
        return Augmentation[this._aug];
    }

    get octave () {
        return this._octave;
    }

    toString (showNaturalSymbol = false): string {
        const augSymbol = (showNaturalSymbol && this._aug === 0) ? '' : this.aug;
        return `${this.letter}${augSymbol}${this.octave}`;
    }
}
