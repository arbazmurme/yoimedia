import './globals.css';

export const metadata = {
  title: 'Yoi® Media — We Engineer Growth',
  description: 'Yoi® Media is a Hyderabad-based digital marketing and AI growth company. We engineer growth systems that help ambitious businesses build, scale, and automate. Premium digital advertising, SEO, AI & automation.',
  keywords: ['digital marketing', 'AI growth', 'performance marketing', 'SEO', 'automation', 'Hyderabad', 'Yoi Media'],
  openGraph: {
    title: 'Yoi® Media — We Engineer Growth',
    description: 'We don\'t run random campaigns. We engineer growth.',
    url: 'https://yoimedia.com',
    siteName: 'Yoi® Media',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yoi® Media — We Engineer Growth',
    description: 'We don\'t run random campaigns. We engineer growth.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ scrollBehavior: 'auto' }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#020408" />
      </head>
      <body style={{ cursor: 'none' }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
