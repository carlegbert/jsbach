import 'mocha';
import { expect } from 'chai';
import Note, { Augmentation, NoteLetter } from './note';

describe('Note', () => {
    it('should throw an exception when constructor is called with octave out of bounds', () => {
        expect(() => new Note(0, -1)).to.throw();
        expect(() => new Note(0, 9)).to.throw();
    });

    it('should throw an exception when constructor is called with augmentation out of bounds', () => {
        expect(() => new Note(0, 1, -3)).to.throw();
        expect(() => new Note(0, 1, 3)).to.throw();
    });

    describe('#toString', () => {
        it('returns string with no accidental when not specified', () => {
            const n: Note = new Note(0, 1);
            const str: string = n.toString();
            const expected: string = `${NoteLetter[0]}1`;
            expect(str).to.equal(expected);
        });

        it('returns string with natural when specified', () => {
            const n: Note = new Note(0, 1);
            const str: string = n.toString(true);
            const expected: string = `${NoteLetter[0]}${Augmentation[0]}1`;
            expect(str).to.equal(expected);
        });

        it('returns note with accidental', () => {
            const n: Note = new Note(0, 1, 1);
            const str: string = n.toString();
            const expected: string = `${NoteLetter[0]}${Augmentation[1]}1`;
            expect(str).to.equal(expected);
        });
    });

    describe('#augment', () => {
        it('throws when a note is augmented out of bounds', () => {
            const n = new Note(0, 1);
            expect(() => n.augment(3)).to.throw();
            expect(() => n.augment(-3)).to.throw();
        });

        it('augments successfully', () => {
            const n = new Note(0, 1);
            n.augment(2);
            expect(n.aug).to.equal(2);
            n.augment(-4);
            expect(n.aug).to.equal(-2);
        });

        it('augments with chaining', () => {
            const note = new Note(0, 1);
            note
                .augment(-1)
                .augment(2)
                .augment(1)
                .augment(-3);
            expect(note.aug).to.equal(-1);
        });
    });
});

