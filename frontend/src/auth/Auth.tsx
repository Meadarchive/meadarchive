import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";
import GoogleButton from 'react-google-button'

interface Props {
	children: string
}

export default function Auth(props: PropsWithChildren<Props>) {
	const { signIn } = useAuth();

	return (
		<div>
			<GoogleButton type="dark" onClick={signIn}>
				{props.children}
			</GoogleButton>
		</div>
	);
}
