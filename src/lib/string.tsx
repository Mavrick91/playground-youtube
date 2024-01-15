/* eslint-disable react/no-array-index-key */
import React from 'react';
import LinkifyIt from 'linkify-it';

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
      return ` ${word} `;
    });

    if (line === '') return <br data-testid="line-break" key={lineIndex} />;

    return <p key={lineIndex}>{words}</p>;
  });
}
