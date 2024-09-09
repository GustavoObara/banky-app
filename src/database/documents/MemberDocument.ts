interface MemberDocument {
    displayName: string;
    login: string;
    wallet?: {
        coins?: number;
    };
    exp?: number;
}

export { MemberDocument };
