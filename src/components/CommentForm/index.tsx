'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Controller, UseFormReturn, useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';
import { postComment } from '~/app/watch/action';
import { cn } from '~/lib/utils';
import Button from '../shared/Button';

interface Props {
  videoId?: string;
  commentId?: string | null;
  onCancel?: () => void;
  defaultValues?: string;
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

export default function CommentForm({ videoId, commentId, onCancel, defaultValues }: Props): JSX.Element {
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
    <form
      action={async formData => {
        await postComment(
          {
            videoId,
            commentId,
          },
          formData
        );
        resetAndCancel();
      }}
    >
      <div
        className={cn('w-full transition-colors', {
          'border-b-2 border-black mb-4': comment || isFocused,
          'border-b-2 border-gray-300 mb-3': !comment && !isFocused,
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
              className="w-full resize-none text-sm"
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              autoFocus={!!defaultValues}
            />
          )}
        />
      </div>
      {(isFocused || comment || onCancel) && (
        <div className="flex mb-3 items-center justify-between">
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
  );
}
