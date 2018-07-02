import { expect } from "chai";
import "mocha";

import { Augmentation, NoteLetter } from "../lib/constants";
import Note from "../lib/note";

describe("Note", () => {
    it("should throw an exception when constructor is called with augmentation out of bounds", () => {
        expect(() => new Note(1, 1, -3)).to.throw(Error, /Augmentation to -3 out of range/);
        expect(() => new Note(1, 1, 3)).to.throw(Error, /Augmentation to 3 out of range/);
    });

    describe("#toString", () => {
        it("returns string with no accidental when not specified", () => {
            const n: Note = new Note(1, 1);
            const str: string = n.toString();
            const expected: string = `${NoteLetter[1]}1`;
            expect(str).to.equal(expected);
        });

        it("returns string with natural when specified", () => {
            const n: Note = new Note(1, 1);
            const str: string = n.toString(true);
            const expected: string = `${NoteLetter[1]}${Augmentation[0]}1`;
            expect(str).to.equal(expected);
        });

        it("returns note with accidental", () => {
            const n: Note = new Note(1, 1, 1);
            const str: string = n.toString();
            const expected: string = `${NoteLetter[1]}${Augmentation[1]}1`;
            expect(str).to.equal(expected);
        });
    });

    describe("#increment", () => {
        it("increments successfully", () => {
            const n = new Note(1, 1);
            const incremented = n.increment();
            expect(incremented.letter).to.equal(2);
            expect(incremented.octave).to.equal(1);
        });

        it("rolls over if end of octave is reached", () => {
            const n = new Note(7, 1);
            const incremented = n.increment();
            expect(incremented.letter).to.equal(1);
            expect(incremented.octave).to.equal(2);
        });

        it("resets augmentation to natural", () => {
            const n = new Note(3, 3, -2);
            const incremented = n.increment();
            expect(incremented.aug).to.equal(0);
        });
    });

    describe("#decrement", () => {
        it("decrements successfully", () => {
            const n = new Note(3, 1);
            const decremented = n.decrement();
            expect(decremented.letter).to.equal(2);
            expect(decremented.octave).to.equal(1);
        });

        it("rolls over if end of octave is reached", () => {
            const n = new Note(1, 2);
            const decremented = n.decrement();
            expect(decremented.letter).to.equal(7);
            expect(decremented.octave).to.equal(1);
        });

        it("resets augmentation to natural", () => {
            const n = new Note(3, 3, 1);
            const decremented = n.decrement();
            expect(decremented.aug).to.equal(0);
        });
    });

    describe("#sharpen", () => {
        it("sharpens successfully", () => {
            const n = new Note(1, 1, 1);
            const raised = n.sharpen();
            expect(raised.aug).to.equal(2);
        });

        it("throws when going higher than a double sharp", () => {
            const n = new Note(2, 3, 2);
            expect(() => n.sharpen()).to.throw(Error, /Can't sharpen above/);
        });
    });

    describe("#flatten", () => {
        it("flattens successfully", () => {
            const n = new Note(7, 3, 1);
            const lowered = n.flatten();
            expect(lowered.aug).to.equal(0);
        });

        it("throws when going lower than a double flat", () => {
            const n = new Note(5, 7, -2);
            expect(() => n.flatten()).to.throw(Error, /Can't flatten below/);
        });
    });
});
