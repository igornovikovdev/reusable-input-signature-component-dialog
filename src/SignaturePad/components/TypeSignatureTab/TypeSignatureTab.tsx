import React from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { typeFontFamilyOptions } from '../../signaturePad.constants';
import { FontFamilyOption, PenColorOption } from '../../signaturePad.types';
import './TypeSignatureTab.css';
import '../../SignaturePad.css';

interface Props {
  selectedSignatureFontFamily: FontFamilyOption;
  selectedPenColorOption: PenColorOption;
  typedSignatureValue: string;
  onTypeSignatureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearTypedSignatureClick: () => void;
  onFontFamilyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TypeSignatureTab = ({
  selectedSignatureFontFamily,
  selectedPenColorOption,
  typedSignatureValue,
  onTypeSignatureChange,
  onClearTypedSignatureClick,
  onFontFamilyChange
}: Props) => {
  return (
    <>
      <div className="signature-pad-type-wrapper">
        <input
          className="signature-pad-type-input"
          data-testid="signature-pad-type-input"
          placeholder="Signature"
          style={{
            fontFamily: `"${selectedSignatureFontFamily.value}", cursive`,
            color: selectedPenColorOption.color
          }}
          value={typedSignatureValue}
          onChange={onTypeSignatureChange}
        />
        <button
          className="clear-signature-button"
          data-testid="clear-signature-button"
          onClick={onClearTypedSignatureClick}
        >
          Clear Signature
        </button>
      </div>
      <div className="signature-pad-font-options">
        <RadioGroup
          name="font-type-selector"
          className="signature-pad-font-radio-group"
          data-testid="font-type-selector"
          onChange={onFontFamilyChange}
          row
        >
          {typeFontFamilyOptions.map((option) => (
            <FormControlLabel
              className="font-type-option"
              data-testid="font-type-option"
              label="Signature"
              key={`font_${option.id}`}
              value={option.id}
              checked={option.id === selectedSignatureFontFamily.id}
              control={<Radio />}
              sx={{
                '.MuiFormControlLabel-label': {
                  fontFamily: `"${option.value}", cursive`,
                  fontSize: '30px',
                  color: selectedPenColorOption.color
                }
              }}
            />
          ))}
        </RadioGroup>
      </div>
    </>
  );
};

export default TypeSignatureTab;
