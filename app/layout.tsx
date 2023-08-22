import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	icons: {
		icon: '/favicon.svg',
		shortcut: '/favicon/svg',
	},
	title: 'Akili AI Creativity Assistant',
	description:
		'Discover Akili AI: Your all-in-one AI creativity assistant. Create images, code snippets, and more with ease. Get started with 5 free generations and upgrade for unlimited access. Transform your workflow today!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
