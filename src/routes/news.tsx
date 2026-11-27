import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";

export const Route = createFileRoute("/news")({
  component: NewsLayout,
});

function NewsLayout() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  );
}
