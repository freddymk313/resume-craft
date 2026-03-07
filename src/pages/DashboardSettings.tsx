import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Shield, CreditCard, User, Bell, Check } from "lucide-react";

const DashboardSettings = () => {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-2xl font-bold tracking-tight mb-6">Account Settings</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-secondary p-1 rounded-lg">
            <TabsTrigger value="profile" className="gap-1.5 text-xs"><User className="w-3.5 h-3.5" /> Profile</TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5 text-xs"><CreditCard className="w-3.5 h-3.5" /> Billing</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5 text-xs"><Bell className="w-3.5 h-3.5" /> Notifications</TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5 text-xs"><Shield className="w-3.5 h-3.5" /> Security</TabsTrigger>
          </TabsList>

          {/* Profile */}
          <TabsContent value="profile">
            <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-card">
              <div className="flex items-center gap-4 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-display font-bold text-xl">
                  AJ
                </div>
                <div>
                  <h3 className="font-display font-semibold">Alex Johnson</h3>
                  <p className="text-sm text-muted-foreground">Product Designer · New York</p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto text-xs">Change Photo</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">First Name</Label>
                  <Input defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Last Name</Label>
                  <Input defaultValue="Johnson" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-medium">Email</Label>
                  <Input defaultValue="alex.johnson@email.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Phone</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Location</Label>
                  <Input defaultValue="New York, NY" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button className="gap-1.5"><Check className="w-3.5 h-3.5" /> Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <h3 className="font-display font-semibold text-base mb-1">Current Plan</h3>
                <div className="flex items-center justify-between mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div>
                    <p className="font-display font-bold text-primary">Premium Plan</p>
                    <p className="text-sm text-muted-foreground">$12/month · Renews March 15, 2026</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">Manage Plan</Button>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <h3 className="font-display font-semibold text-base mb-4">Payment Method</h3>
                <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 08/2027</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto text-xs">Update</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
              <h3 className="font-display font-semibold text-base">Notification Preferences</h3>
              {[
                { label: "Email notifications", desc: "Receive updates about your resumes", on: true },
                { label: "Job match alerts", desc: "Get notified about new job matches", on: true },
                { label: "Weekly report", desc: "Receive weekly resume performance report", on: false },
                { label: "Marketing emails", desc: "Product updates and tips", on: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch defaultChecked={item.on} />
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6">
              <h3 className="font-display font-semibold text-base">Security Settings</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Current Password</Label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">New Password</Label>
                    <Input type="password" placeholder="Enter new password" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Confirm Password</Label>
                    <Input type="password" placeholder="Confirm new password" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button className="gap-1.5"><Shield className="w-3.5 h-3.5" /> Update Password</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
