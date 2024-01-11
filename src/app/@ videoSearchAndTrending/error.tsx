'use client'; // Error components must be Client Components

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Button from '~/components/shared/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);

    // Extract the <a> tag from the error message
    const regex = /<a href="([^"]*)"[^>]*>.*?<\/a>/;
    const linkMatch = error.message.match(regex);
    if (linkMatch) {
      // Use DOMParser to parse the HTML string and extract the href
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(linkMatch[0], 'text/html');
      const href = htmlDoc.body.firstChild
        ? (htmlDoc.body.firstChild as HTMLElement)?.getAttribute('href')
        : '';

      setLink(href || '');

      // Remove the <a> tag from the error message
      const messageWithoutLink = error.message.replace(regex, '');
      setMessage(messageWithoutLink);
    } else {
      setMessage(error.message);
    }
  }, [error]);

  return (
    <div className="h-[496px] border border-purple-400 rounded-md flex items-center justify-center flex-col gap-4">
      <h1 className="font-medium text-gray-800">{message}</h1>
      <a
        href={`https://developers.google.com${link}`}
        className="text-purple-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        See the documentation
      </a>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
