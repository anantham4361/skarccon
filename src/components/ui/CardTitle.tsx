export default function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-lg font-semibold">
      {children}
    </h3>
  );
}
