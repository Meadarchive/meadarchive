import { PropsWithChildren } from "react";
import { useAuth } from "../hooks/useAuth";

interface Props {
	children: string
}

export default function Auth(props: PropsWithChildren<Props>) {
	const { signIn } = useAuth();

	return (
		<div>
			<button className="auth-button" onClick={signIn}>
				{props.children}
			</button>
		</div>
	);
}
