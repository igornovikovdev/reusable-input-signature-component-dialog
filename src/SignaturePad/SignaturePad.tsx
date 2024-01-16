import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ReactSignatureCanvas from 'react-signature-canvas';
import { penColorOptions } from '../constants/signaturePad.constants';
import { Tab, Tabs } from '@mui/material';
import './SignaturePad.css';

const SignaturePad = () => {
  const [signatureSrc, setSignatureSrc] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedTab, setSelectedTab] = useState('draw');
  const [selectedPenColorOption, setSelectedPenColorOption] = useState(penColorOptions[2]);
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

  const onClearSignatureClick = () => {
    canvasRef?.clear();
  };

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const onDoneClick = () => {
    if (!canvasRef) {
      return;
    }

    setSignatureSrc(canvasRef.toDataURL());
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
            <Tabs value={selectedTab} onChange={onTabChange}>
              <Tab label="Draw" value="draw" />
              <Tab label="Type" value="type" />
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