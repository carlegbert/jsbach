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

export const LETTER_MIN: number = 1;
export const LETTER_MAX: number = 7;
export const AUG_MIN: number = -2;
export const AUG_MAX: number = 2;
