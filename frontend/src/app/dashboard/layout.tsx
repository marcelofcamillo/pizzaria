import { Sidebar } from '@/components/dashboard/sidebar';
import { requiredAdmin } from '@/lib/auth';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requiredAdmin();
  console.log(user);

  return (
    <div className='flex h-screen overflow-hidden '>
      {/* Sidebar Desktop */}
      <Sidebar userName={user.name} />
      {children}
    </div>
  );
}
