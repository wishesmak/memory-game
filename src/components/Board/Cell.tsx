import React from 'react';
import { ICell } from '../../types/types';
import classNames from 'classnames';
import { useGameContext } from '../../contexts/GameContext';

interface Props {
  cell: ICell;
}

const Cell: React.FC<Props> = ({ cell }) => {
  let cellStyles = classNames({
    cell,
    'cell-active': cell.isVisible,
    'cell-finded': cell.isFinded,
  });

  const { onCellClick } = useGameContext();

  return (
    <div onClick={() => onCellClick(cell.id)} className={cellStyles}>
      {(cell.isVisible || cell.isFinded) && cell.item}
    </div>
  );
};

export default Cell;
