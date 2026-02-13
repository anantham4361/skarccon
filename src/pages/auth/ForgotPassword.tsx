import { useState } from "react";
import { supabase } from "../../services/supabaseClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await supabase.auth.resetPasswordForEmail(email);
    setSent(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {sent ? (
        <p>Password reset email sent.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin email"
            className="border p-2"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="ml-2 bg-blue-600 text-white p-2">
            Send email
          </button>
        </form>
      )}
    </div>
  );
}
