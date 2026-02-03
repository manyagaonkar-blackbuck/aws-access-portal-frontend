"use client";

import { useParams } from "next/navigation";

export default function RequestDetailPage() {
  const { id } = useParams();

  return (
    <div style={{ padding: 40 }}>
      <h1>Access Request #{id}</h1>
    </div>
  );
}
