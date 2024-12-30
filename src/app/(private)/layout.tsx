import LogoutForm from "@/components/LogoutForm";
import UserDisplay from "@/components/UserDisplay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center h-full">
      <div className="w-full flex justify-end px-2 gap-2 items-center sticky">
        <UserDisplay />
        <LogoutForm />
      </div>
      {children}
    </div>
  );
}
