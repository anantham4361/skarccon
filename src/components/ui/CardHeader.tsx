export default function CardHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b p-4">
      {children}
    </div>
  );
}
