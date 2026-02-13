import { useState } from "react";
import { updatePassword } from "../../services/auth.service";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/Card";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

import { Eye, EyeOff } from "lucide-react";
import Loader from "../ui/Loader";

export default function ProfileForm() {
  // Password states
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [passwordStatusType, setPasswordStatusType] = useState<
    "success" | "error" | ""
  >("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Reset password fields
  const resetPasswordFields = () => {
    setPassword("");
    setConfirm("");
    setPasswordStatus("");
    setPasswordStatusType("");
    setShowPassword(false);
    setShowConfirm(false);
  };

  // Password form submit
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordStatus("");
    setPasswordStatusType("");

    if (password.length < 6) {
      setPasswordStatus("Password must be at least 6 characters");
      setPasswordStatusType("error");
      return;
    }

    if (password !== confirm) {
      setPasswordStatus("Passwords do not match");
      setPasswordStatusType("error");
      return;
    }

    try {
      setIsSavingPassword(true);
      await updatePassword(password);
      setPasswordStatus("Password updated successfully");
      setPasswordStatusType("success");
      resetPasswordFields();
    } catch (err: any) {
      setPasswordStatus(err.message);
      setPasswordStatusType("error");
    } finally {
      setIsSavingPassword(false);
    }
  };

  

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your account information
        </p>
      </div>

      {/* Responsive layout: stacked on mobile, side-by-side on desktop */}
      <div className="flex max-w-96 flex-col gap-6 lg:flex-row lg:gap-4">
        {/* Password Card */}
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>
              Update your account password to keep your account secure.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              {passwordStatus && (
                <p
                  className={`text-sm px-2 py-1 rounded ${passwordStatusType === "error"
                      ? "text-red-600 bg-red-100"
                      : "text-green-700 bg-green-100"
                    }`}
                >
                  {passwordStatus}
                </p>
              )}

              {/* New Password */}
              <div className="relative">
                <label className="text-sm font-medium">New Password</label>
                <div className="flex gap-2">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10" 
                  />
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-700"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="flex gap-2">
                  <Input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="pr-10" // padding for eye icon
                  />
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-700"
                    onClick={() => setShowConfirm((prev) => !prev)}
                  >
                    {showConfirm ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  type="submit"
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={isSavingPassword}
                >
                  {isSavingPassword ? (
                    <>
                      <Loader size="sm" className="mr-2" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetPasswordFields}
                  disabled={isSavingPassword}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
