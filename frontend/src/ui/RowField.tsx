function RowField({
  children,
  icon,
  label,
}: Readonly<{
  children: React.ReactNode;
  icon: React.ReactNode;
  label: string;
}>) {
  return (
    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
      <h5 className="mb-2.5 flex gap-1 items-center">
        <span className="inline-block *:size-5 bg-primary/20 text-primary rounded-lg p-1">
          {icon}
        </span>
        <span className="text-stone-600">{label}</span>
      </h5>
      <div className="flex justify-end">{children}</div>
    </div>
  );
}

export default RowField;
