import ProfileForm from '../components/settings/ProfileForm';
import PasswordForm from '../components/settings/PasswordForm';

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <ProfileForm />
      <PasswordForm />
    </div>
  );
};

export default SettingsPage;