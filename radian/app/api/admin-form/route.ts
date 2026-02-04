import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const COLLECTION_NAME = "adminForms";

// 👇 adjust later if you want to restrict origin
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*", // or "http://localhost:3000"
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

type AdminFormPayload = {
  version: string;
  note: string;
  link: string;
  title: string;
};

function validatePayload(body: any): AdminFormPayload {
  const { version, note, link, title } = body ?? {};

  if (
    typeof version !== "string" ||
    typeof note !== "string" ||
    typeof link !== "string" ||
    typeof title !== "string"
  ) {
    throw new Error("All fields (version, note, link, title) are required.");
  }

  return { version, note, link, title };
}

/* -------------------- OPTIONS (CORS PREFLIGHT) -------------------- */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

/* -------------------- POST -------------------- */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = validatePayload(body);

    await addDoc(collection(db, COLLECTION_NAME), {
      ...payload,
      createdAt: serverTimestamp(),
    });

    return NextResponse.json(
      { success: true },
      { headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error("Error saving admin form data:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Failed to save data",
      },
      {
        status: 400,
        headers: CORS_HEADERS,
      }
    );
  }
}

/* -------------------- GET -------------------- */
export async function GET() {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { success: false, error: "No data found" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    const doc = snapshot.docs[0];
    const data = doc.data() as AdminFormPayload & {
      createdAt?: { seconds: number; nanoseconds: number };
    };

    return NextResponse.json(
      {
        success: true,
        id: doc.id,
        data,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error("Error fetching latest admin form data:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message ?? "Failed to fetch data",
      },
      {
        status: 500,
        headers: CORS_HEADERS,
      }
    );
  }
}
