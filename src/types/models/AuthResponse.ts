
export interface LoginResponse {
	email: string
	userId: number
	message?: {
		message: string | undefined
	}
	role: [
		{
			value: string
		}
	]
	token: {
		token: string
	}
}

export interface RegistrationResponse {
	User: {
		id: number
		email: string
		password: string
		updatedAt: string
		createdAt: string
		roles: [
			{
				value: string
			}
		]
	},
	token: {
		token: string
	}
}

export interface checkTokenResponse {
	message?: string
	email: string
	id: number
	exp: number
	iat: number
	roles: [
		{
			value: string
		}
	]

}