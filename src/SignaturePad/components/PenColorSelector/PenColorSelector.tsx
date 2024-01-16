import React from 'react';
import { penColorOptions } from '../../signaturePad.constants';
import { PenColorOption } from '../../signaturePad.types';
import './PenColorSelector.css';

interface Props {
  selectedPenColorOption: PenColorOption;
  handlePenColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PenColorSelector = ({
  selectedPenColorOption,
  handlePenColorChange
}: Props) => {
  return (
    <div className="signature-pag-pen-color-selector">
      {penColorOptions.map((option) => (
        <label
          key={`color_${option.id}`}
          className={`signature-pag-pen-color-label ${
            option.id === selectedPenColorOption.id &&
            'signature-pag-pen-color-option-selected'
          }`}
          title={option.label}
        >
          <span
            className="signature-pag-pen-color-span"
            style={{ backgroundColor: option.color }}
          />
          <input
            type="radio"
            className="signature-pag-pen-color-input"
            value={option.id}
            checked={option.id === selectedPenColorOption.id}
            onChange={handlePenColorChange}
          />
        </label>
      ))}
    </div>
  )
};

export default PenColorSelector;
