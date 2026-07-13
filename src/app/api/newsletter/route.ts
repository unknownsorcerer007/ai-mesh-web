import { NextResponse } from "next/server";
import { z } from "zod";

/*
  Newsletter subscribe endpoint.
  Server is the source of truth (impeccable form-validation craft).
  Zod validates; a small artificial delay makes the loading state observable.
  In production this would push to the email provider. Here we acknowledge.
*/
const schema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("That doesn't look like an email."),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message ?? "Invalid email." }, { status: 400 });
  }

  // Simulate provider latency so the loading state is visible (≤ 2s).
  await new Promise((r) => setTimeout(r, 900));

  return NextResponse.json({ ok: true, email: parsed.data.email });
}
