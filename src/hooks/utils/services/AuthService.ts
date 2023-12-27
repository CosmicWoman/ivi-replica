import { AxiosResponse } from "axios";
import $api from "../http";
import { LoginResponse, RegistrationResponse, checkTokenResponse } from "../../../types/models/AuthResponse";

export default class AuthService {
	static async login(email: string, password: string): Promise<AxiosResponse<LoginResponse>> {
		return $api.post<LoginResponse>('/login', { email, password })
	}

	static async registration(email: string, password: string): Promise<AxiosResponse<RegistrationResponse>> {
		return $api.post<RegistrationResponse>('/registration', { email, password })
	}

	static async loginWithOauth(email: string,): Promise<AxiosResponse<RegistrationResponse>> {
		return $api.post<RegistrationResponse>('/outRegistration', { email })
	}

	static async checkToken(): Promise<AxiosResponse<checkTokenResponse>> {
		return $api.get<checkTokenResponse>('/checkToken')
	}

	static async logout(): Promise<void> {
		return $api.post('/logout')
	}
}