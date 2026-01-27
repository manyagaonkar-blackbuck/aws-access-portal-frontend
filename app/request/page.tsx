"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateRequestPage() {
  const router = useRouter();

  const [useCase, setUseCase] = useState("");
  const [service, setService] = useState("");
  const [duration] = useState("1"); // fixed to 1 day

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log({
      useCase,
      service,
      duration: "1 day",
    });

    router.push("/dashboard");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Create Access Request</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: "700px" }}>
        {/* USE CASE */}
        <div style={{ marginBottom: "20px" }}>
          <label>Describe your use case</label>
          <br />
          <textarea
            value={useCase}
            onChange={(e) => setUseCase(e.target.value)}
            required
            style={{ width: "100%", height: "120px" }}
          />
        </div>

        {/* SERVICE */}
        <div style={{ marginBottom: "20px" }}>
          <label>Select AWS service</label>
          <br />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Select</option>
            <option value="S3">S3</option>
            <option value="EC2">EC2</option>
            <option value="DynamoDB">DynamoDB</option>
            <option value="IAM">IAM</option>
          </select>
        </div>

        {/* DURATION (FIXED) */}
        <div style={{ marginBottom: "20px" }}>
          <label>Access duration</label>
          <br />
          <input
            type="text"
            value="1 day (24 hours)"
            disabled
            style={{ width: "100%", padding: "10px", background: "#f3f4f6" }}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
