import { NextRequest, NextResponse } from "next/server";

// In-memory sync store for active PPDT desktop <-> mobile upload sessions (TTL: 10 minutes)
interface PPDTSyncRecord {
  sessionId: string;
  imageBase64: string;
  mimeType: string;
  latencySeconds: number;
  uploadedAt: number;
}

const syncCache = new Map<string, PPDTSyncRecord>();

// Clean up stale sessions periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of syncCache.entries()) {
    if (now - record.uploadedAt > 10 * 60 * 1000) {
      syncCache.delete(key);
    }
  }
}, 60 * 1000);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, imageBase64, mimeType, latencySeconds } = body;

    if (!sessionId || !imageBase64) {
      return NextResponse.json(
        { error: "Missing sessionId or imageBase64 payload" },
        { status: 400 }
      );
    }

    syncCache.set(sessionId, {
      sessionId,
      imageBase64,
      mimeType: mimeType || "image/jpeg",
      latencySeconds: latencySeconds || 0,
      uploadedAt: Date.now()
    });

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    console.error("PPDT Sync POST error:", error);
    return NextResponse.json(
      { error: "Failed to store PPDT sync upload" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session parameter" }, { status: 400 });
  }

  const record = syncCache.get(sessionId);

  if (!record) {
    return NextResponse.json({ status: "waiting" });
  }

  // Once fetched by desktop, we can keep or delete it
  return NextResponse.json({
    status: "ready",
    imageBase64: record.imageBase64,
    mimeType: record.mimeType,
    latencySeconds: record.latencySeconds
  });
}
