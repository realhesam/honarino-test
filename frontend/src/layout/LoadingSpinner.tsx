function LoadingSpinner({
  theme = "primary",
}: Readonly<{ theme?: "primary" | "light" }>) {
  return (
    <div
      className={`w-full h-52 flex flex-col gap-3 items-center justify-center ${
        theme === "primary" ? "text-stone-500" : "text-white"
      }`}
    >
      <div
        className={`spinner ${
          theme === "primary" ? "spinner-primary" : "spinner-light"
        }`}
      ></div>
      <p>درحال بارگذاری</p>
    </div>
  );
}

export default LoadingSpinner;
