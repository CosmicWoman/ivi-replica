import { FC, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { LoginForm } from "../../LoginForm/LoginForm";
import { useDispatch } from "react-redux";
import { registrationWithOauth } from "../../../store/reducers/authReducer";
import { ThunkDispatch } from "redux-thunk";
import './AuthPage.scss'
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useTranslation } from "react-i18next";
declare var VK: any;

interface IAuthPageProps { };

export const AuthPage: FC<IAuthPageProps> = (props) => {
	const { t, i18n } = useTranslation([]);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>()
	const isAuth = useTypedSelector(state => state.auth.isAuth)
	const navigate = useNavigate()
	let locale = t('authPage.locale')

	useEffect(() => {
		if (isAuth) {
			navigate('/movies-website')
		}
	}, [isAuth])

	const vkAuth = () => {
		VK.Auth.login(function (response: any) {
			if (response.session) {
				let user = response.session.user
				dispatch(registrationWithOauth(user.first_name + user.last_name + user.id + '@vk.com'))
				if (response.settings) {
					/* Выбранные настройки доступа пользователя, если они были запрошены */
				}
			} else {
				/* Пользователь нажал кнопку Отмена в окне авторизации */
			}
		});
	}
	return (
		<div className="container">
			<div className="authPage__container" data-testid='authPage'>
				<LoginForm />
				<div className="authPage__googleBtn">
					<GoogleLogin
						locale={locale}
						width="240"
						onSuccess={credentialResponse => {
							if (credentialResponse.credential) {
								const decoded = jwt_decode<any>(credentialResponse.credential);
								dispatch(registrationWithOauth(decoded.email))
							}
						}}
						onError={() => {
							console.log('Login Failed');
						}}
					/>
				</div>
				<div onClick={vkAuth} className="authPage__vkBtn">
					<div>
						<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/2048px-VK_Compact_Logo_%282021-present%29.svg.png" alt="" />
					</div>
					<div>{t('authPage.VKauth')}</div>
				</div>
			</div>

		</div>
	);
}
