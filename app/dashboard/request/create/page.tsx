"use client";

import CreateAccessRequestForm from "@/components/CreateAccessRequestForm";
import { useRouter } from "next/navigation";

export default function CreateRequestPage() {
  const router = useRouter();

  return (
    <div style={{ padding: 40 }}>
      <h1>Create Access Request</h1>

      <CreateAccessRequestForm
        onSuccess={() => router.push("/dashboard")}
      />
    </div>
  );
}
