export interface UserResponse {
    id: string
    email: string
    isPremium: boolean
    dailyQrCount: number
    createdAt: Date
    lastUpdate: Date
    lastQrUpdate: Date
}

export interface UserCreate {
    email: string
    password: string
}

export interface UserLogin {
    email: string
    password: string
}