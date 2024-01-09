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
import SearchFilters from '../SearchFilters';
import { useFilters } from '~/providers/FiltersProvider';
import SearchInput from '../shared/SearchInput';

type SearchBarProps = {
  children?: React.ReactNode;
};

export default function SearchBar({ children }: SearchBarProps) {
  const queryClient = useQueryClient();
  const { resetFilters } = useFilters();
  const [inputValue, setInputValue] = useState('');
  const { data, refetch, isFetching } = useSearchVideo({
    q: inputValue,
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    resetFilters();
    await refetch();
  };

  const handleClickDeleteSearch = useCallback(() => {
    setInputValue('');
    queryClient.invalidateQueries('google-search');
  }, [queryClient]);

  const clearSearchInput = useCallback(() => {
    setInputValue('');
  }, []);

  return (
    <div className="pb-32">
      <form onSubmit={onSubmit} className="flex items-center max-w-md my-5">
        <SearchInput
          onChange={value => setInputValue(value)}
          value={inputValue}
          handleClickDeleteSearch={handleClickDeleteSearch}
          className="rounded-none rounded-tl-3xl rounded-bl-3xl"
        />
        <Button
          type="submit"
          disabled={!inputValue}
          className="rounded-none rounded-tr-3xl rounded-br-3xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
        >
          <Search />
        </Button>
      </form>
      <SearchFilters clearSearchInput={clearSearchInput} />
      {isFetching ? (
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
                    thumbnail={video.snippet.thumbnails.medium}
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
