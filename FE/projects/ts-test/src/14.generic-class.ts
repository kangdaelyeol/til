// Generic

// Class

class UserClassG<P> {
    constructor(public payload: P) {}

    getPayload(): P {
        return this.payload
    }
}

interface UserIA {
    name: string
    age: number
}

interface UserIB extends UserIA {
    age: number
    isValid: boolean
}

const u_A = new UserClassG<UserIB>({
    name: 'rkdeofu',
    age: 27,
    isValid: true,
})
