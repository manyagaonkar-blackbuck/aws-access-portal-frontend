"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createAccessRequest } from "@/lib/api";

export default function CreateRequestPage() {
  const router = useRouter();

  const [useCase, setUseCase] = useState("");
  const [service, setService] = useState("");
  const [s3Action, setS3Action] = useState("");
  const [loading, setLoading] = useState(false);

  const durationHours = 24;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const finalUseCase =
        service === "S3"
          ? `${useCase} | S3 Action: ${s3Action}`
          : useCase;

      await createAccessRequest({
        useCase: finalUseCase,
        service,
        durationHours,
      });

      router.push("/dashboard");
    } catch (error) {
      alert("Failed to submit access request");
      console.error(error);
    } finally {
      setLoading(false);
    }
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

        {/* AWS SERVICE */}
        <div style={{ marginBottom: "20px" }}>
          <label>AWS Service</label>
          <br />
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Select service</option>
            <option value="S3">S3</option>
            <option value="EC2">EC2</option>
            <option value="IAM">IAM</option>
            <option value="DynamoDB">DynamoDB</option>
          </select>
        </div>

        {/* S3 ACTIONS — ONLY WHEN S3 */}
        {service === "S3" && (
          <div style={{ marginBottom: "20px" }}>
            <label>S3 Action</label>
            <br />
            <select
              value={s3Action}
              onChange={(e) => setS3Action(e.target.value)}
              required
              style={{ width: "100%", padding: "10px" }}
            >
              <option value="">Select action</option>
              <option value="CreateBucket">Create Bucket</option>
              <option value="UploadObject">Upload Object</option>
              <option value="ReadObject">Read Object</option>
              <option value="DeleteObject">Delete Object</option>
              <option value="ListBuckets">List Buckets</option>
            </select>
          </div>
        )}

        {/* DURATION */}
        <div style={{ marginBottom: "20px" }}>
          <label>Access duration</label>
          <br />
          <input
            type="text"
            value="1 day (24 hours)"
            disabled
            style={{
              width: "100%",
              padding: "10px",
              background: "#f3f4f6",
            }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
