import { AppShell } from "@/components/layout/AppShell";
import { WelcomeScreen } from "@/components/welcome/WelcomeScreen";

export default function Home() {
  return (
    <AppShell>
      <WelcomeScreen />
    </AppShell>
  );
}
