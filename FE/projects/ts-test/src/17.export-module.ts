export interface UserExp {
    firstName: string
    lastName: string
    age: number
    isValid: boolean
}

export function getFullName(user: UserExp) {
    return `${user.firstName} ${user.lastName}`
}
