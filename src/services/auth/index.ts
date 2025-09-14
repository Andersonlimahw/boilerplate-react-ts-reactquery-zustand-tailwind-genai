import { GoogleAuthProvider, GithubAuthProvider, OAuthProvider, signInWithPopup, signInWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { auth } from '../firebase';

export const signInWithGoogle = (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const signInWithApple = (): Promise<UserCredential> => {
    const provider = new OAuthProvider('apple.com');
    return signInWithPopup(auth, provider);
};

export const signInWithLinkedIn = (): Promise<UserCredential> => {
    const provider = new OAuthProvider('linkedin.com');
    return signInWithPopup(auth, provider);
};

export const signInWithGitHub = (): Promise<UserCredential> => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
};

export const signInCompanyWithEmail = (email: string, password: string): Promise<UserCredential> => {
    return signInWithEmailAndPassword(auth, email, password);
};

export const signInCompanyWithSSO = (): Promise<UserCredential> => {
    const provider = new OAuthProvider('saml.company');
    return signInWithPopup(auth, provider);
};
