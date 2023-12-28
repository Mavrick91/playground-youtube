'use client';

import { Search, X } from 'lucide-react';
import React, { useCallback, useState } from 'react';
import { useQueryClient } from 'react-query';
import DotLoader from 'react-spinners/DotLoader';
import { useSearchVideo } from '~/endpoint/useSearchVideo';
import { YouTubeSearchResult } from '~/types/search';
import VideoItem from '../VideoItem';
import Button from '../shared/Button';
import { Input } from '../shared/input/InputText';

type SearchBarProps = {
  children?: React.ReactNode;
};

export default function SearchBar({ children }: SearchBarProps) {
  const queryClient = useQueryClient();
  const [inputValue, setInputValue] = useState('sixen');
  const { data, refetch, isLoading } = useSearchVideo(inputValue);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('searching for', inputValue);
    await refetch();
  };

  const handleClickDeleteSearch = useCallback(() => {
    setInputValue('');
    queryClient.invalidateQueries('google-search');
  }, [queryClient]);

  return (
    <div className="pb-32">
      <form
        onSubmit={onSubmit}
        className="flex items-center max-w-md mt-5 mb-10"
      >
        <div className="relative w-full">
          <Input
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Search"
            className="rounded-none rounded-tl-3xl rounded-bl-3xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
          />
          {inputValue ? (
            <X
              className="absolute top-1/2 transform -translate-y-1/2 right-5 cursor-pointer"
              onClick={handleClickDeleteSearch}
            />
          ) : null}
        </div>
        <Button
          type="submit"
          disabled={!inputValue}
          className="rounded-none rounded-tr-3xl rounded-br-3xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        >
          <Search />
        </Button>
      </form>
      {isLoading ? (
        <div className="flex justify-center">
          <DotLoader size={50} color="#a147f5" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {data
            ? data.items.map((video: YouTubeSearchResult) => {
                if (video.id.kind === 'youtube#channel') {
                  return null;
                }
                return (
                  <VideoItem
                    key={video.snippet.title}
                    channelThumbnail={video.snippet.thumbnails.default.url}
                    channelTitle={video.snippet.channelTitle}
                    publishedAt={video.snippet.publishedAt}
                    thumbnail={video.snippet.thumbnails.high}
                    videoTitle={video.snippet.title}
                    viewCount={'0'}
                  />
                );
              })
            : children}
        </div>
      )}
    </div>
  );
}
