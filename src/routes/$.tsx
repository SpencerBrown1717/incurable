import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/site/shell";

export const Route = createFileRoute("/$")({
  component: Missing,
});

function Missing() {
  return (
    <Shell>
      <div className="frame section">
        <p className="kicker">404</p>
        <h1 className="title mt-4">That page is not in the hall.</h1>
        <p className="dek mt-6">The floor plan is short on purpose. Start at the field, or at the list.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-primary">
            Incurable?
          </Link>
          <Link to="/alzheimers" className="btn btn-ghost">
            Alzheimer’s
          </Link>
        </div>
      </div>
    </Shell>
  );
}
