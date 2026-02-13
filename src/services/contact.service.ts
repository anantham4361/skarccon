import { supabase } from "./supabaseClient";

/**
 * Save contact message to database
 */
export async function sendContactMessage(payload: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  const { error } = await supabase
    .from("contact_messages")
    .insert(payload);

  if (error) {
    console.error("Failed to submit contact message", error);
    throw error;
  }

  // Email sending will be handled via Supabase Edge Function
}
