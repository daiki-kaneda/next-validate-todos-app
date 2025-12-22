import { CreateTodoModal } from "@/src/components/CreateTodoModal";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <CreateTodoModal/>
      </body>
    </html>
  );
}
