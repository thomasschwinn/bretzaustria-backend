"use client";
export default function TopMenuWrapper({ children }) {
	return (
		<nav>
			<ul>{children}</ul>
		</nav>
	);
}
