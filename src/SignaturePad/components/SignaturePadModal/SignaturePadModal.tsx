import React, { useState } from 'react';
import PenColorSelector from '../PenColorSelector/PenColorSelector';
import DrawSignatureTab from '../DrawSignatureTab/DrawSignatureTab';
import TypeSignatureTab from '../TypeSignatureTab/TypeSignatureTab';
import SignatureCanvas from 'react-signature-canvas';
import { Tab, Tabs } from '@mui/material';
import { FontFamilyOption, PenColorOption } from '../../signaturePad.types';
import './SignaturePadModal.css';

interface Props {
  selectedPenColorOption: PenColorOption;
  typedSignatureValue: string;
  selectedSignatureFontFamily: FontFamilyOption;
  handlePenColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setCanvasRef: (ref: SignatureCanvas | null) => void;
  onClearSignatureClick: () => void;
  onTypeSignatureChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFontFamilyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClearTypedSignatureClick: () => void;
  closeModal: () => void;
  onDoneClick: (selectedTab: string) => void;
}

const SignaturePadModal = ({
  selectedPenColorOption,
  typedSignatureValue,
  selectedSignatureFontFamily,
  handlePenColorChange,
  setCanvasRef,
  onClearSignatureClick,
  onTypeSignatureChange,
  onFontFamilyChange,
  onClearTypedSignatureClick,
  closeModal,
  onDoneClick
}: Props) => {
  const [selectedTab, setSelectedTab] = useState('draw');

  const onTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  }

  return (
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
          <PenColorSelector
            selectedPenColorOption={selectedPenColorOption}
            handlePenColorChange={handlePenColorChange}
          />
          {selectedTab === 'draw' && (
            <DrawSignatureTab
              selectedPenColorOption={selectedPenColorOption}
              setCanvasRef={setCanvasRef}
              onClearSignatureClick={onClearSignatureClick}
            />
          )}
          {selectedTab === 'type' && (
            <TypeSignatureTab
              typedSignatureValue={typedSignatureValue}
              selectedPenColorOption={selectedPenColorOption}
              selectedSignatureFontFamily={selectedSignatureFontFamily}
              onTypeSignatureChange={onTypeSignatureChange}
              onFontFamilyChange={onFontFamilyChange}
              onClearTypedSignatureClick={onClearTypedSignatureClick}
            />
          )}
        </div>
        <div className="signature-pad-modal-footer">
          <button onClick={closeModal}>Cancel</button>
          <button
            className="done-button"
            onClick={() => onDoneClick(selectedTab)}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignaturePadModal;
