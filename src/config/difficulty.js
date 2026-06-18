export const DIFFICULTIES = ['Normal', 'Hard', 'Expert', 'Nightmare', 'Hell', 'Abyss'];

export const DIFF_NAMES = {
    Normal:   { ru: 'Обычный', de: 'Normal' },
    Hard:     { ru: 'Сложный', de: 'Schwer' },
    Expert:   { ru: 'Эксперт', de: 'Experte' },
    Nightmare:{ ru: 'Кошмар', de: 'Alptraum' },
    Hell:     { ru: 'Ад', de: 'Hölle' },
    Abyss:    { ru: 'Бездна', de: 'Abgrund' }
};

export const DIFF_MULT = {
    Normal:   { hp: 1,   dmg: 1,   exp: 1 },
    Hard:     { hp: 1.5, dmg: 1.3, exp: 1.5 },
    Expert:   { hp: 2.5, dmg: 2,   exp: 2.5 },
    Nightmare:{ hp: 4,   dmg: 3,   exp: 4 },
    Hell:     { hp: 7,   dmg: 5,   exp: 7 },
    Abyss:    { hp: 12,  dmg: 8,   exp: 12 }
};

export const DIFF_COLORS = {
    Normal:    '#4CAF50',
    Hard:      '#FF9800',
    Expert:    '#F44336',
    Nightmare: '#9C27B0',
    Hell:      '#FF1744',
    Abyss:     '#8888CC'
};

export const DIFF_TEXT_COLORS = {
    Normal:    '#ffffff',
    Hard:      '#ffffff',
    Expert:    '#ffffff',
    Nightmare: '#ffffff',
    Hell:      '#ffffff',
    Abyss:     '#E0E0FF'
};
