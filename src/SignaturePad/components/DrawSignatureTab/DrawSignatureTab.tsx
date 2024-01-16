import SignatureCanvas from 'react-signature-canvas';
import { PenColorOption } from '../../signaturePad.types';
import './DrawSignatureTab.css';
import '../../SignaturePad.css';

interface Props {
  selectedPenColorOption: PenColorOption;
  setCanvasRef: (ref: SignatureCanvas | null) => void;
  onClearSignatureClick: () => void;
}

const DrawSignatureTab = ({
  selectedPenColorOption,
  setCanvasRef,
  onClearSignatureClick
}: Props) => {
  return (
    <>
      <div className="signature-pad-modal-canvas">
        <SignatureCanvas
          ref={setCanvasRef}
          penColor={selectedPenColorOption.color}
          canvasProps={{ className: 'signature-canvas' }}
        />
      </div>
      <button className="clear-signature-button" onClick={onClearSignatureClick}>
        Clear Signature
      </button>
    </>
  );
};

export default DrawSignatureTab;
