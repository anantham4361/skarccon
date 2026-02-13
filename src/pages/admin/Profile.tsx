import ProfileForm from "../../components/forms/ProfileForm";
import ProfileInfoForm from "../../components/forms/ProfileInfoForm";

export default function Profile() {
  return (
    <div className="space-y-10">
      {/* Company / Profile Info */}
      <ProfileInfoForm />
      {/* Password Change (existing) */}
      <ProfileForm />
    </div>
  );
}
