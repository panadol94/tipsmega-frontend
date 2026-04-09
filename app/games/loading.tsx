export default function Loading() {
    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "1rem" }}>
            {/* Breadcrumb skeleton */}
            <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
                <div className="skeleton-line" style={{ width: 48, height: 10 }} />
                <div className="skeleton-line" style={{ width: 48, height: 10 }} />
                <div className="skeleton-line" style={{ width: 96, height: 10 }} />
            </div>

            {/* Header skeleton */}
            <div style={{ marginBottom: "2rem" }}>
                <div className="skeleton-circle" style={{ width: 56, height: 56, marginBottom: 12 }} />
                <div className="skeleton-line" style={{ width: "60%", height: 20, marginBottom: 10 }} />
                <div style={{ display: "flex", gap: 8 }}>
                    <div className="skeleton-line" style={{ width: 80, height: 24, borderRadius: 99 }} />
                    <div className="skeleton-line" style={{ width: 100, height: 24, borderRadius: 99 }} />
                    <div className="skeleton-line" style={{ width: 64, height: 24, borderRadius: 99 }} />
                </div>
            </div>

            {/* Section skeletons */}
            {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{ marginBottom: "2rem" }}>
                    <div className="skeleton-line" style={{ width: 160, height: 16, marginBottom: "0.75rem" }} />
                    {i === 2 ? (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {[1, 2, 3, 4].map((j) => (
                                <div key={j} className="skeleton-line" style={{ width: 80, height: 32, borderRadius: 8 }} />
                            ))}
                        </div>
                    ) : i === 3 ? (
                        <ol style={{ paddingLeft: "1.25rem" }}>
                            {[1, 2, 3].map((j) => (
                                <div key={j} className="skeleton-line" style={{ width: "90%", height: 14, marginBottom: 8 }} />
                            ))}
                        </ol>
                    ) : (
                        <div className="skeleton-premium" style={{ height: 120, borderRadius: 12 }} />
                    )}
                </div>
            ))}

            {/* CTA skeleton */}
            <div className="skeleton-premium" style={{ height: 120, borderRadius: 12, marginBottom: "2rem" }} />
        </div>
    );
}
