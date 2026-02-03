"use client";

import { useState } from "react";
import { createAccessRequest } from "@/lib/utils";

const SERVICE_ACTIONS: Record<string, string[]> = {
  S3: ["ListBucket", "GetObject", "PutObject"],
  EC2: ["DescribeInstances", "StartInstances", "StopInstances"],
};

export default function CreateAccessRequestForm({
  onSuccess,
}: {
  onSuccess?: (data?: { services: string[] }) => void;
}) {
  const [useCase, setUseCase] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [actions, setActions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function toggleService(service: string) {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );

    // remove actions if service unselected
    setActions((prev) =>
      prev.filter((a) => !SERVICE_ACTIONS[service]?.includes(a))
    );
  }

  function toggleAction(action: string) {
    setActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      await createAccessRequest({
        requesterEmail: "user@company.com",
        awsAccount: "ZINKA",
        reason: useCase,
        services,
        resourceArns: actions,
        durationHours: 24,
      });

      // 🔥 send services back to dashboard
      onSuccess?.({ services });

    } catch (err) {
      alert("Failed to submit request");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div style={{ marginBottom: 20 }}>
        <label>Describe your use case</label>
        <textarea
          value={useCase}
          onChange={(e) => setUseCase(e.target.value)}
          required
          style={{ width: "100%", height: 120 }}
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label>AWS Services</label>

        {Object.keys(SERVICE_ACTIONS).map((service) => (
          <div key={service}>
            <label>
              <input
                type="checkbox"
                checked={services.includes(service)}
                onChange={() => toggleService(service)}
              />
              {service}
            </label>
          </div>
        ))}
      </div>

      {services.map((service) => (
        <div
          key={service}
          style={{
            marginBottom: 16,
            paddingLeft: 12,
            borderLeft: "2px solid #e5e7eb",
          }}
        >
          <strong>{service} Actions</strong>

          {SERVICE_ACTIONS[service].map((action) => (
            <div key={action}>
              <label>
                <input
                  type="checkbox"
                  checkedphchecked={actions.includes(action)}
                  onChange={() => toggleAction(action)}
                />
                {action}
              </label>
            </div>
          ))}
        </div>
      ))}

      <button
        type="submit"
        disabled={
          loading ||
          useCase.trim() === "" ||
          services.length === 0 ||
          actions.length === 0
        }
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
