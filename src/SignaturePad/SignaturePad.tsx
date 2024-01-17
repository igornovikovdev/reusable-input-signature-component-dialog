import React, { useState } from 'react';
import ReactSignatureCanvas from 'react-signature-canvas';
import html2canvas from 'html2canvas';
import SignaturePadModal from './components/SignaturePadModal/SignaturePadModal';
import { penColorOptions, typeFontFamilyOptions } from './signaturePad.constants';
import './SignaturePad.css';
import '@fontsource/caveat/700.css';
import '@fontsource/pacifico/400.css';
import '@fontsource/marck-script/400.css';
import '@fontsource/meddon/400.css';

interface Props {
  signatureSrc: string | undefined;
  setSignatureSrc: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SignaturePad = ({
  signatureSrc,
  setSignatureSrc,
}: Props) => {
  // const [signatureSrc, setSignatureSrc] = useState<string | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPenColorOption, setSelectedPenColorOption] = useState(penColorOptions[0]);
  const [typedSignatureValue, setTypedSignatureValue] = useState('');
  const [selectedSignatureFontFamily, setSelectedSignatureFontFamily] = useState(typeFontFamilyOptions[0]);
  const [signatureCanvas, setSignatureCanvas] = useState<ReactSignatureCanvas | null>(null);

  const handlePenColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newPenValue = penColorOptions.find((item) => item.id === +value);

    if (newPenValue) {
      setSelectedPenColorOption(newPenValue);
    }
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
    signatureCanvas?.clear();
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

  const onDoneClick = async (selectedTab: string) => {
    if (selectedTab === 'draw') {
      if (!signatureCanvas) {
        return;
      }

      setSignatureSrc(signatureCanvas.toDataURL());
    } else {
      const textDataUrl = await getDataUrlForTypedSignature();

      setSignatureSrc(textDataUrl);
    }

    closeModal();
  };

  return (
    <div className="signature-pad">
      <figure className="signature-pad-figure">
        <div
          data-testid="signature-display-field"
          className="signature-pad-img-wrapper"
          onClick={openModal}
        >
          <img
            className="signature-pad-img"
            data-testid="signature-pad-img"
            src={signatureSrc}
          />
        </div>
      </figure>
      {isModalOpen && (
        <SignaturePadModal
          selectedPenColorOption={selectedPenColorOption}
          selectedSignatureFontFamily={selectedSignatureFontFamily}
          typedSignatureValue={typedSignatureValue}
          setCanvasRef={setSignatureCanvas}
          closeModal={closeModal}
          handlePenColorChange={handlePenColorChange}
          onClearSignatureClick={onClearSignatureClick}
          onClearTypedSignatureClick={onClearTypedSignatureClick}
          onTypeSignatureChange={onTypeSignatureChange}
          onFontFamilyChange={onFontFamilyChange}
          onDoneClick={onDoneClick}
        />
      )}
    </div>
  );
};

export default SignaturePad;
