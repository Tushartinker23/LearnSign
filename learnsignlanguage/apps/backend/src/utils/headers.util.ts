/* eslint-disable prettier/prettier */
export const Header = (accessToken: string) => {
    return {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };
};