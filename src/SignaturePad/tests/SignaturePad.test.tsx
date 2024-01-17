import { act, render, screen } from '@testing-library/react';
import SignaturePad from '../SignaturePad';
import userEvent from '@testing-library/user-event';
import { penColorOptions, typeFontFamilyOptions } from '../signaturePad.constants';

describe('SignaturePad tests', () => {
  it('should render input field', () => {
    render(<SignaturePad />);

    expect(screen.getByTestId('signature-display-field')).toBeInTheDocument();
    expect(screen.queryByTestId('signature-pad-modal')).not.toBeInTheDocument();
    expect(screen.getByTestId('signature-pad-img')).not.toHaveAttribute('src');
  });

  it('should open Add Signature modal on signature field click', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    expect(screen.getByTestId('signature-pad-modal')).toBeInTheDocument();
    expect(screen.getByTestId('signature-pad-modal-header')).toHaveTextContent('Add Signature');
    expect(screen.getByTestId('cancel-button')).toBeInTheDocument();
    expect(screen.getByTestId('done-button')).toBeInTheDocument();
  });

  it('should properly display default Draw tab section of Add Signature modal', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    expect(screen.getByTestId('tab-draw')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('tab-type')).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByTestId('pen-color-selector')).toBeInTheDocument();
    expect(screen.getByTestId('signature-canvas-wrapper').querySelector('canvas')).toBeInTheDocument();
    expect(screen.getByTestId('clear-signature-button')).toBeInTheDocument();
  });

  it('should have correct pen color values and correct selected default pen color', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    expect(screen.getByTestId('pen-color-selector')).toBeInTheDocument();

    const displayedPenColorOptions = screen.getAllByTestId('pen-color-selector-option');

    displayedPenColorOptions.forEach((element, i) => {
      const inputElement = element.querySelector('input');

      expect(element.title).toBe(penColorOptions[i].label);
      expect(inputElement).toHaveAttribute('value', `${penColorOptions[i].id}`);

      if (i === 0) {
        expect(inputElement).toBeChecked();
      } else {
        expect(inputElement).not.toBeChecked();
      }
    });
  });

  it('should properly display Type tab section of Add Signature modal', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    expect(screen.getByTestId('tab-type')).toHaveAttribute('aria-selected', 'false');
    await act(() => userEvent.click(screen.getByTestId('tab-type')));
    expect(screen.getByTestId('tab-type')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('signature-pad-type-input')).toBeInTheDocument();
    expect(screen.getByTestId('clear-signature-button')).toBeInTheDocument();
    expect(screen.getByTestId('font-type-selector')).toBeInTheDocument();
    expect(screen.getByTestId('signature-pad-type-input')).toHaveAttribute('placeholder', 'Signature');
  });

  it('should be able to type into input field of Type tab', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    await act(() => userEvent.click(screen.getByTestId('tab-type')));
    expect(screen.getByTestId('signature-pad-type-input')).toBeInTheDocument();
    expect(screen.getByTestId('signature-pad-type-input')).toHaveValue('');
    await act(() => userEvent.type(screen.getByTestId('signature-pad-type-input'), 'test signature'));
    expect(screen.getByTestId('signature-pad-type-input')).toHaveValue('test signature');
  });

  it('should be able to clear input value in Type tab', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    await act(() => userEvent.click(screen.getByTestId('tab-type')));
    await act(() => userEvent.type(screen.getByTestId('signature-pad-type-input'), 'test signature'));
    expect(screen.getByTestId('signature-pad-type-input')).toHaveValue('test signature');
    await act(() => userEvent.click(screen.getByTestId('clear-signature-button')));
    expect(screen.getByTestId('signature-pad-type-input')).toHaveValue('');
  });

  it('should have correct font family options in Type tab', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    await act(() => userEvent.click(screen.getByTestId('tab-type')));

    const displayedFontFamilyOption = screen.getAllByTestId('font-type-option')
      .map((element) => element.querySelector('input'));

    displayedFontFamilyOption.forEach((element, i) => {
      expect(element).toHaveAttribute('value', `${typeFontFamilyOptions[i].id}`);

      if (i === 0) {
        expect(element).toBeChecked();
      }
    });
  });

  it('should have correct default pen color and font family applied', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    await act(() => userEvent.click(screen.getByTestId('tab-type')));
    expect(screen.getByTestId('signature-pad-type-input')).toHaveStyle({
      'font-family': `"${typeFontFamilyOptions[0].value}", cursive`,
      color: penColorOptions[0].color,
    });
  });

  it('should be able to change pen color and font family', async () => {
    render(<SignaturePad />);

    await act(() => userEvent.click(screen.getByTestId('signature-display-field')));
    await act(() => userEvent.click(screen.getByTestId('tab-type')));

    const displayedPenColorOptions = screen.getAllByTestId('pen-color-selector-option')
      .map((element) => element.querySelector('input'));
    const displayedFontFamilyOption = screen.getAllByTestId('font-type-option')
      .map((element) => element.querySelector('input'));

    await act(() => userEvent.click(displayedPenColorOptions[2]!));
    await act(() => userEvent.click(displayedFontFamilyOption[3]!));
    expect(screen.getByTestId('signature-pad-type-input')).toHaveStyle({
      'font-family': `"${typeFontFamilyOptions[3].value}", cursive`,
      color: penColorOptions[2].color,
    });
  });
});
