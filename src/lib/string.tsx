/* eslint-disable react/no-array-index-key */
import React from 'react';
import LinkifyIt from 'linkify-it';
import Link from 'next/link';

const linkify = LinkifyIt();

export function descriptionElements(str: string): JSX.Element[] {
  return str.split('\n').map((line, lineIndex) => {
    const words = line.split(' ').map(word => {
      const links = linkify.match(word);
      if (links) {
        return (
          <a
            href={links[0].url}
            key={links[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:underline"
          >
            {word}
          </a>
        );
      }

      const cleanedWord = word.replace(/\u200B/g, '').trim(); // \u200B is the unicode for zero-width space
      if (cleanedWord.startsWith('@@')) {
        const match = cleanedWord.match(/^@@([a-zA-Z0-9_]+)(https?:\/\/\S*)?(.*)?$/);
        if (match) {
          let username = match[1];
          let url = match[2] || '';
          const rest = match[3] || '';
          if (username.endsWith('https')) {
            username = username.slice(0, -5);
            url = `https${rest}`;
          }
          const urlElement = url ? (
            <a
              href={url.trim()}
              key={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline"
            >
              {url}
            </a>
          ) : null;

          return (
            <>
              <Link href={`/channel/${username}`} key={username} className="text-blue-700 hover:underline">
                {`@${username}`}
              </Link>
              {' '}
              {urlElement}
              {rest.startsWith('://') ? null : rest}
            </>
          );
        }
      }

      return ` ${word} `;
    });

    if (line === '') return <br data-testid="line-break" key={(lineIndex)} />;

    return <p key={(lineIndex)}>{words}</p>;
  });
}
