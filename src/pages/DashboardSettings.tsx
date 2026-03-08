import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Shield, CreditCard, User, Bell, Check } from "lucide-react";
import { useTranslation } from "@/contexts/LanguageContext";

const DashboardSettings = () => {
  const { t } = useTranslation();

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-2xl font-bold tracking-tight mb-6">{t("settings_title")}</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-secondary p-1 rounded-lg">
            <TabsTrigger value="profile" className="gap-1.5 text-xs"><User className="w-3.5 h-3.5" /> {t("settings_profile")}</TabsTrigger>
            <TabsTrigger value="billing" className="gap-1.5 text-xs"><CreditCard className="w-3.5 h-3.5" /> {t("settings_billing")}</TabsTrigger>
            <TabsTrigger value="notifications" className="gap-1.5 text-xs"><Bell className="w-3.5 h-3.5" /> {t("settings_notifications")}</TabsTrigger>
            <TabsTrigger value="security" className="gap-1.5 text-xs"><Shield className="w-3.5 h-3.5" /> {t("settings_security")}</TabsTrigger>
          </TabsList>

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
                <Button variant="outline" size="sm" className="ml-auto text-xs">{t("settings_change_photo")}</Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">{t("settings_first_name")}</Label>
                  <Input defaultValue="Alex" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">{t("settings_last_name")}</Label>
                  <Input defaultValue="Johnson" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-xs font-medium">{t("settings_email")}</Label>
                  <Input defaultValue="alex.johnson@email.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">{t("settings_phone")}</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">{t("settings_location")}</Label>
                  <Input defaultValue="New York, NY" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button className="gap-1.5"><Check className="w-3.5 h-3.5" /> {t("settings_save")}</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <h3 className="font-display font-semibold text-base mb-1">{t("settings_current_plan")}</h3>
                <div className="flex items-center justify-between mt-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <div>
                    <p className="font-display font-bold text-primary">Premium Plan</p>
                    <p className="text-sm text-muted-foreground">$12/month · Renews March 15, 2026</p>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">{t("settings_manage_plan")}</Button>
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-card">
                <h3 className="font-display font-semibold text-base mb-4">{t("settings_payment_method")}</h3>
                <div className="flex items-center gap-4 p-4 bg-secondary rounded-lg">
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Visa ending in 4242</p>
                    <p className="text-xs text-muted-foreground">Expires 08/2027</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto text-xs">{t("settings_update")}</Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="notifications">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-5">
              <h3 className="font-display font-semibold text-base">{t("settings_notif_prefs")}</h3>
              {[
                { label: t("settings_email_notif"), desc: t("settings_email_notif_desc"), on: true },
                { label: t("settings_job_alerts"), desc: t("settings_job_alerts_desc"), on: true },
                { label: t("settings_weekly"), desc: t("settings_weekly_desc"), on: false },
                { label: t("settings_marketing"), desc: t("settings_marketing_desc"), on: false },
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

          <TabsContent value="security">
            <div className="bg-card border border-border rounded-xl p-6 shadow-card space-y-6">
              <h3 className="font-display font-semibold text-base">{t("settings_security_title")}</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">{t("settings_current_password")}</Label>
                  <Input type="password" placeholder={t("settings_current_password")} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">{t("settings_new_password")}</Label>
                    <Input type="password" placeholder={t("settings_new_password")} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">{t("settings_confirm_password")}</Label>
                    <Input type="password" placeholder={t("settings_confirm_password")} />
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button className="gap-1.5"><Shield className="w-3.5 h-3.5" /> {t("settings_update_password")}</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardSettings;
