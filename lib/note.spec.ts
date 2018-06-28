import 'mocha';
import { expect } from 'chai';
import Note, { Augmentation, NoteLetter } from './note';

describe('Note', () => {
    it('should through an exception when octave is out of bounds', () => {
        expect(() => new Note(0, -1)).to.throw();
        expect(() => new Note(0, -1)).to.throw();
    });

    it('toString returns string with no accidental when not specified', () => {
        const n: Note = new Note(0, 1);
        const str: string = n.toString();
        const expected = `${NoteLetter[0]}1`;
        expect(str).to.equal(expected);
    });

    it('toString returns string with accidental when specified', () => {
        const n: Note = new Note(0, 1);
        const str: string = n.toString(true);
        const expected = `${NoteLetter[0]}${Augmentation[0]}1`;
        expect(str).to.equal(expected);
    });
});

