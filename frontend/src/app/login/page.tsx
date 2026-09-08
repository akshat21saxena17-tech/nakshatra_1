import { LoginForm } from "@/components/auth/LoginForm";
import { Starfield } from "@/components/nakshatra/sections";
import TopBanner from "@/components/TopBanner";

export default function LoginPage() {
  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-black text-white">
      <TopBanner />
      <Starfield />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-[1200px] items-center justify-center px-4 pt-20 pb-10">
        <LoginForm />
      </div>
    </div>
  );
}
