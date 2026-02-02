import AdminHeader from '../../component/adminheader'
import AdminSidebar from '../../component/adminsidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <AdminSidebar />
      <main className="pt-16 pl-64 transition-all duration-300">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
