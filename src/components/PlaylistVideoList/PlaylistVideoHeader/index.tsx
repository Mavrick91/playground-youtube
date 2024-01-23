'use client';

import { Repeat, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  playlistTitle: string;
  channelTitle: string;
  videosCount: number;
};

export enum ButtonType {
  REPEAT = 'repeat',
  SHUFFLE = 'shuffle',
}

type ButtonState = {
  [ButtonType.REPEAT]?: boolean;
  [ButtonType.SHUFFLE]?: boolean;
};

export default function PlaylistVideoHeader({ playlistTitle, channelTitle, videosCount }: Props) {
  const [selectedButtons, setSelectedButtons] = useState<ButtonState>({});
  const strokeWidth = (buttonName: ButtonType) => (selectedButtons[buttonName] ? 2.5 : 1.5);

  const handleButtonClick = (buttonName: ButtonType) => () => {
    const isButtonCurrentlySelected = selectedButtons[buttonName];

    setSelectedButtons(prevState => ({
      ...prevState,
      [buttonName]: !prevState[buttonName],
    }));

    let toastMessage: string;
    switch (buttonName) {
      case ButtonType.REPEAT:
        toastMessage = isButtonCurrentlySelected ? 'Mode loop deactivated!' : 'Mode loop activated!';
        break;
      case ButtonType.SHUFFLE:
        toastMessage = isButtonCurrentlySelected ? 'Mode Shuffle deactivated!' : 'Mode Shuffle activated!';
        break;
      default:
        toastMessage = 'Button was clicked!';
    }
    toast(toastMessage, {
      hideProgressBar: true,
      autoClose: 2000,
    });
  };

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold truncate">{playlistTitle}</h2>
      </div>
      <div className="text-xs text-gray-800 pt-1">
        {channelTitle} - <span className="text-gray-500">1/{videosCount}</span>
      </div>
      <div className="flex items-center gap-2 pt-2">
        <button
          type="button"
          aria-label={ButtonType.REPEAT}
          className="aspect-square p-1 hover:rounded-full hover:bg-black/10"
          onClick={handleButtonClick(ButtonType.REPEAT)}
        >
          <Repeat width={20} height={20} strokeWidth={strokeWidth(ButtonType.REPEAT)} />
        </button>
        <button
          type="button"
          aria-label={ButtonType.SHUFFLE}
          className="aspect-square p-1 hover:rounded-full hover:bg-black/10"
          onClick={handleButtonClick(ButtonType.SHUFFLE)}
        >
          <Shuffle width={20} height={20} strokeWidth={strokeWidth(ButtonType.SHUFFLE)} />
        </button>
      </div>
    </div>
  );
}
