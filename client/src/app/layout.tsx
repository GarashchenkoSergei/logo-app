import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LogoBet',
  description: 'FE part',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-900 text-white">
        {children}
      </body>
    </html>
  );
}
