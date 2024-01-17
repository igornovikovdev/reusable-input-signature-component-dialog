# Reusable Input Signature Component

## Installation of the package from a local folder
1. Clone this repository into the same directory that contains a root folder of your React app
2. `cd .\reusable-input-signature-component-dialog\`
3. Run `npm install`
4. `cd ..\test-vite-project\` (replace `test-vite-project` with the name of your React app folder)
5. Run `npm install --save ..\reusable-input-signature-component-dialog`

## Integration

1. Install the package into your React app
2. Import the `SignaturePad` component into file where you want to use it as follows:
    ```tsx
    import SignaturePad from 'reusable-input-signature-component-dialog/src/SignaturePad/SignaturePad';
    ```
3. Create state for `signatureSrc` and `setSignatureSrc` in the following way and pass it as props to the `SignaturePad`:
    ```tsx
    const [signatureSrc, setSignatureSrc] = useState<string | undefined>();
    <...>
    <SignaturePad
      signatureSrc={signatureSrc}
      setSignatureSrc={setSignatureSrc}
    />
    ```
    The package exposes `signatureSrc` to allow users to clear signature from the field by settings its value to `undefined`, or to save the signature on the server.
4. You can restrict the size of the signature field by wrapping `SignaturePad` in another element with set sizes, e.g.:
    ```tsx
    <div style={{ width: '350px', height: '120px' }}>
      <SignaturePad
        signatureSrc={signatureSrc}
        setSignatureSrc={setSignatureSrc}
      />
    </div>
    ```
