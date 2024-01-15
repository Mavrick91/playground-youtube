import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { Info } from 'lucide-react';

interface Props {
  tip: string;
}

export default function Tooltip({ tip }: Props) {
  return (
    <div data-tooltip-id="my-tooltip" data-tooltip-content={tip} className="ml-[2px]">
      <Info data-tip className="tooltip" size={10} />
      <ReactTooltip id="my-tooltip" />
    </div>
  );
}
