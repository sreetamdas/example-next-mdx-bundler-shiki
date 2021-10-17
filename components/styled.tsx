// import Link from "next/link";
import styled from "styled-components";

export const Title = styled.h1<{ color?: string }>`
	font-size: 2rem;
	color: ${({ color }) => (color ? color : "red")};
`;

// export const MDXLink = styled(Link)`
// 	color: var(--color-primary-accent);
// 	text-decoration: none;
// 	&:hover {
// 		color: var(--color-primary-accent);
// 	}
// `;
