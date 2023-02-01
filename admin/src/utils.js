const key = 'lux-admin';

export const storeItem = (name, item) => localStorage.setItem(`${key}-${name}`, item);
export const getItem = (name) => localStorage.getItem(`${key}-${name}`);
export const destroyItem = (name) => localStorage.removeItem(`${key}-${name}`);
