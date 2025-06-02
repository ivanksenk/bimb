export const storeTokens = (role: string, token: string, refreshToken: string): void => {
    localStorage.setItem('role', role);
    localStorage.setItem('token', token);
    localStorage.setItem('refreshToken', refreshToken);
}

export const clearStore = () =>{
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
}