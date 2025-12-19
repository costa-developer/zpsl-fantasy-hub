import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Globe, LogOut, Trash2, Mail, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [gameweekReminders, setGameweekReminders] = useState(true);
  const [transferAlerts, setTransferAlerts] = useState(true);
  const [leagueUpdates, setLeagueUpdates] = useState(true);

  // Display settings
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');

  // Account
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveNotifications = () => {
    toast({
      title: "Settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar isAuthenticated={true} />
      
      <main className="flex-1 container py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and notifications
          </p>
        </div>

        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
              <CardDescription>
                Choose what updates you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive updates via email</p>
                  </div>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive browser notifications</p>
                  </div>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Gameweek Reminders</Label>
                    <p className="text-xs text-muted-foreground">Before deadline</p>
                  </div>
                  <Switch checked={gameweekReminders} onCheckedChange={setGameweekReminders} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Transfer Alerts</Label>
                    <p className="text-xs text-muted-foreground">Price changes & injuries</p>
                  </div>
                  <Switch checked={transferAlerts} onCheckedChange={setTransferAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>League Updates</Label>
                    <p className="text-xs text-muted-foreground">New members & standings</p>
                  </div>
                  <Switch checked={leagueUpdates} onCheckedChange={setLeagueUpdates} />
                </div>
              </div>

              <Button onClick={handleSaveNotifications}>Save Preferences</Button>
            </CardContent>
          </Card>

          {/* Display */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Palette className="w-5 h-5 text-accent" />
                Display
              </CardTitle>
              <CardDescription>
                Customize the appearance of your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="sn">Shona</SelectItem>
                      <SelectItem value="nd">Ndebele</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Shield className="w-5 h-5 text-primary" />
                Security
              </CardTitle>
              <CardDescription>
                Manage your password and account security
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>

              <Button onClick={handleChangePassword}>Update Password</Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-destructive/50">
            <CardHeader>
              <CardTitle className="text-lg text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible actions for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                <div>
                  <p className="font-medium text-foreground">Log Out</p>
                  <p className="text-xs text-muted-foreground">Sign out of your account</p>
                </div>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Log Out
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-destructive/10 border border-destructive/30">
                <div>
                  <p className="font-medium text-foreground">Delete Account</p>
                  <p className="text-xs text-muted-foreground">Permanently delete your account and data</p>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive" className="gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove all your data including your team, leagues,
                        and history.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button variant="outline">Cancel</Button>
                      <Button variant="destructive">Delete Account</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
