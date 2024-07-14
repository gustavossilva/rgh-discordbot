import { Roles, emojis } from '../constants/roles.js';

export const getRoles = ({ rolesCache }) => {
    if (!rolesCache) {
        console.error('No cache detected');
        return;
    }
    const availableRoles = new Map();
    Roles.forEach((role, index) => {
        const searchedRole = rolesCache.find(cachedRole => cachedRole.name === role);
        if (searchedRole) {
            availableRoles.set(emojis[index], searchedRole);
        }
    });
    return availableRoles;
}