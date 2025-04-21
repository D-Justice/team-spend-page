export interface CallData {
    totalEstimatedCost: string,
    totalCallTimeInHours: number,
    totalCallTimeInMinutes: number,
    totalCallTimeInSeconds: number,
    totalUniqueParticipants: number,
    calls: Call[]
}
interface Call {
    id: string,
    numberOfParticipants: number,
    estimatedCost: number,
    totalCallDurationInSeconds: number,
    callDurationSeconds: number,
    callDurationMinutes: number,
    callDurationHours: number,
    participants: User[]
}
interface User {
    displayName: string,
    givenName: string,
    surname: string,
    jobTitle: string,
    mail: string,
    id: string,
}