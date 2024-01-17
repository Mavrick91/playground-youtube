'use client';

import { CircleLoader, PuffLoader } from 'react-spinners';
import { LoaderSizeProps } from 'react-spinners/helpers/props';

type CirclesLoaderPropsProps = {
  type: 'circles' | 'puff';
} & LoaderSizeProps;

type Props = CirclesLoaderPropsProps;

function Loading({ type, ...loaderProps }: Props) {
  return (
    <div className="w-full flex justify-center items-center">
      {type === 'circles' && <CircleLoader {...loaderProps} />}{' '}
      {type === 'puff' && <PuffLoader {...loaderProps} />}{' '}
    </div>
  );
}

export default Loading;
