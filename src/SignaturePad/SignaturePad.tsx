import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ReactSignatureCanvas from 'react-signature-canvas';
import html2canvas from 'html2canvas';
import { penColorOptions, typeFontFamilyOptions } from '../constants/signaturePad.constants';
import { FormControlLabel, Radio, RadioGroup, Tab, Tabs } from '@mui/material';
import './SignaturePad.css';

import '@fontsource/caveat/700.css';
import '@fontsource/pacifico';
import '@fontsource/marck-script';
import '@fontsource/meddon';

const SignaturePad = () => {
  const [signatureSrc, setSignatureSrc] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('draw');
  const [selectedPenColorOption, setSelectedPenColorOption] = useState(penColorOptions[0]);
  const [typedSignatureValue, setTypedSignatureValue] = useState('');
  const [selectedSignatureFontFamily, setSelectedSignatureFontFamily] = useState(typeFontFamilyOptions[0]);
  let canvasRef: ReactSignatureCanvas | null = null;

  const handlePenColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newPenValue = penColorOptions.find((item) => item.id === +value);

    if (newPenValue) {
      setSelectedPenColorOption(newPenValue);
    }
  }

  const onTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  }

  const onTypeSignatureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypedSignatureValue(event.target.value);
  };

  const onFontFamilyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newFontValue = typeFontFamilyOptions.find((item) => item.id === +value);

    if (newFontValue) {
      setSelectedSignatureFontFamily(newFontValue);
    }
  }

  const onClearSignatureClick = () => {
    canvasRef?.clear();
  };

  const onClearTypedSignatureClick = () => {
    setTypedSignatureValue('');
  };

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const getDataUrlForTypedSignature = async (): Promise<string | undefined> => {
    if (!typedSignatureValue) {
      return;
    }

    const hiddenDiv = document.createElement('div');

    hiddenDiv.style.position = 'absolute';
    hiddenDiv.style.fontFamily = `"${selectedSignatureFontFamily.value}"`;
    hiddenDiv.style.color = selectedPenColorOption.color;
    hiddenDiv.style.fontSize = '30px';
    hiddenDiv.style.position = 'absolute';
    hiddenDiv.style.left = '-9999px';
    hiddenDiv.innerText = typedSignatureValue;
    document.body.appendChild(hiddenDiv);

    const canvas = await html2canvas(hiddenDiv, {
      backgroundColor: 'transparent',
      scale: 5
    });

    document.body.removeChild(hiddenDiv);

    return canvas.toDataURL();
  };

  const onDoneClick = async () => {
    if (selectedTab === 'draw') {
      if (!canvasRef) {
        return;
      }

      setSignatureSrc(canvasRef.toDataURL());
    } else {
      const textDataUrl = await getDataUrlForTypedSignature();

      setSignatureSrc(textDataUrl);
    }

    closeModal();
  };

  return (
    <div className="signature-pad">
      <figure className="signature-pad-figure">
        <div className="signature-pad-img-wrapper" onClick={openModal}>
          <img className="signature-pad-img" src={signatureSrc} />
        </div>
      </figure>
      {isModalOpen && (
        <div className="signature-pad-modal">
          <div className="signature-pad-modal-wrapper">
            <p className="signature-pad-modal-header">
              Add Signature
            </p>
            <Tabs className="signature-pad-modal-tabs" value={selectedTab} onChange={onTabChange}>
              <Tab id="tab-draw" label="Draw" value="draw" />
              <Tab id="tab-type" label="Type" value="type" />
            </Tabs>
            <div className="signature-pad-modal-content">
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
              {selectedTab === 'draw' && (
                <>
                  <div className="signature-pad-modal-canvas">
                    <SignatureCanvas
                      ref={(ref) => canvasRef = ref}
                      penColor={selectedPenColorOption.color}
                      canvasProps={{ className: 'signature-canvas' }}
                    />
                  </div>
                  <button className="clear-signature-button" onClick={onClearSignatureClick}>
                    Clear Signature
                  </button>
                </>
              )}
              {selectedTab === 'type' && (
                <>
                  <div className="signature-pad-type-wrapper">
                    <input
                      className="signature-pad-type-input"
                      placeholder="Signature"
                      style={{
                        fontFamily: `"${selectedSignatureFontFamily.value}", cursive`,
                        color: selectedPenColorOption.color
                      }}
                      value={typedSignatureValue}
                      onChange={onTypeSignatureChange}
                    />
                    <button className="clear-signature-button" onClick={onClearTypedSignatureClick}>
                      Clear Signature
                    </button>
                  </div>
                  <div className="signature-pad-font-options">
                    <RadioGroup
                      name="font-type-selector"
                      className="signature-pad-font-radio-group"
                      onChange={onFontFamilyChange}
                      row
                    >
                      {typeFontFamilyOptions.map((option) => (
                        <FormControlLabel
                          className="font-type-option"
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
              )}
            </div>
            <div className="signature-pad-modal-footer">
              <button onClick={closeModal}>Cancel</button>
              <button className="done-button" onClick={onDoneClick}>Done</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
