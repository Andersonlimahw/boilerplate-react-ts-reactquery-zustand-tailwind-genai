import { describe, it, expect, vi } from 'vitest';
import { signInWithGoogle, signInCompanyWithEmail } from './index';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';

vi.mock('../firebase', () => ({
    auth: {}
}));

vi.mock('firebase/auth', () => ({
    GoogleAuthProvider: vi.fn().mockImplementation(() => ({ providerId: 'google.com' })),
    GithubAuthProvider: vi.fn(),
    OAuthProvider: vi.fn(),
    signInWithPopup: vi.fn().mockResolvedValue('popup'),
    signInWithEmailAndPassword: vi.fn().mockResolvedValue('email'),
}));

describe('Auth service', () => {
    it('signInWithGoogle uses Google provider', async () => {
        await signInWithGoogle();
        expect(signInWithPopup).toHaveBeenCalled();
        const provider = (signInWithPopup as any).mock.calls[0][1];
        expect(provider.providerId).toBe('google.com');
    });

    it('signInCompanyWithEmail calls signInWithEmailAndPassword', async () => {
        await signInCompanyWithEmail('a@a.com', '1234');
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith({}, 'a@a.com', '1234');
    });
});
