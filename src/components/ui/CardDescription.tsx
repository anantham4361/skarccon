export default function CardDescription({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm text-muted-foreground mt-1">
      {children}
    </p>
  );
}
