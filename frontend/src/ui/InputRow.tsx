interface InputRowData {
  children: React.ReactNode;
  label: string;
  htmlFor?: string;
  customLabelClass?: string;
}

function InputRow({
  children,
  label,
  htmlFor,
  customLabelClass,
}: Readonly<InputRowData>) {
  return (
    <div>
      <label htmlFor={htmlFor} className={`text-stone-800 ${customLabelClass}`}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default InputRow;
