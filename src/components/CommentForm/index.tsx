'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';
import { postComment } from '~/app/watch/action';
import { cn } from '~/lib/utils';
import { Bounce, toast } from 'react-toastify';
import { useUser } from '~/providers/UserProvider';
import Button from '../shared/Button';
import ClientImage from '../ClientImage';

interface Props {
  videoId?: string;
  commentId?: string | null;
  onCancel?: () => void;
  defaultValues?: string;
  size?: string;
}

interface CommentFormInputs {
  comment: string;
}

const schema = yup.object().shape({
  comment: yup.string().required('Comment is required'),
});

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="rounded-full" size="sm" type="submit" isLoading={pending} aria-disabled={pending}>
      Post Comment
    </Button>
  );
}

export default function CommentForm({ videoId, commentId, onCancel, defaultValues, size = 'md' }: Props): JSX.Element {
  const { user } = useUser();

  const {
    control,
    reset,
    formState: { errors },
    watch,
  }: UseFormReturn<CommentFormInputs> = useForm<CommentFormInputs>({
    defaultValues: {
      comment: defaultValues,
    },
    resolver: yupResolver(schema),
  });
  const comment = watch('comment');
  const [isFocused, setIsFocused] = useState(false);

  const resetAndCancel = () => {
    reset({ comment: '' });
    setIsFocused(false);

    if (onCancel) onCancel();
  };

  return (
    <div
      className={cn('flex items-start gap-1', {
        'mb-8': size === 'md',
      })}
    >
      <ClientImage
        src={user?.snippet?.thumbnails?.default?.url || ''}
        className="rounded-full cursor-pointer"
        alt="avatar"
        quality={100}
        width={size === 'md' ? 40 : 24}
        height={size === 'md' ? 40 : 24}
      />
      <form
        className="w-full ml-4"
        action={async formData => {
          await postComment({ videoId, commentId }, formData);
          toast('Your comment has been sent! (wait 1 minute to see it)', {
            position: 'bottom-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            transition: Bounce,
          });
          resetAndCancel();
        }}
      >
        <div
          className={cn('w-full mb-2 transition-colors', {
            'border-b-2 border-black': comment || isFocused,
            'border-b-2 border-gray-300': !comment && !isFocused,
            'border-red-500': errors.comment,
          })}
        >
          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <TextareaAutosize
                {...field}
                placeholder="Write a comment..."
                className="w-full resize-none text-sm bg-transparent"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                autoFocus={!!defaultValues}
              />
            )}
          />
        </div>
        {(isFocused || comment || onCancel) && (
          <div className="flex items-center justify-between">
            {errors.comment ? <p>{errors.comment.message}</p> : <div />}
            <div className="flex gap-2 items-center">
              <Button className="hover:bg-transparent" variant="ghost" size="sm" onClick={resetAndCancel}>
                Cancel
              </Button>
              <SubmitButton />
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
