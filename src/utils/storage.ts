import { ResumeData, defaultResumeData, TemplateName } from "./resumeTypes";

const STORAGE_KEY = "resume-builder-data";
const TEMPLATE_KEY = "resume-builder-template";

// Migrate old data format to new format
const migrateData = (data: any): ResumeData => {
  const migrated = { ...data };

  // Migrate fullName → firstName + lastName
  if (migrated.personalInfo?.fullName !== undefined) {
    const parts = (migrated.personalInfo.fullName || "").trim().split(" ");
    migrated.personalInfo.firstName = parts[0] || "";
    migrated.personalInfo.lastName = parts.slice(1).join(" ") || "";
    delete migrated.personalInfo.fullName;
  }

  // Migrate string skills/languages/certifications → arrays
  if (typeof migrated.skills === "string") {
    migrated.skills = migrated.skills ? migrated.skills.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  }
  if (typeof migrated.languages === "string") {
    migrated.languages = migrated.languages ? migrated.languages.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  }
  if (typeof migrated.certifications === "string") {
    migrated.certifications = migrated.certifications ? migrated.certifications.split(",").map((s: string) => s.trim()).filter(Boolean) : [];
  }

  return migrated as ResumeData;
};

export const saveResumeData = (data: ResumeData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Failed to save resume data", e);
  }
};

export const loadResumeData = (): ResumeData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return migrateData(JSON.parse(stored));
  } catch (e) {
    console.error("Failed to load resume data", e);
  }
  return defaultResumeData;
};

export const saveTemplate = (template: TemplateName) => {
  localStorage.setItem(TEMPLATE_KEY, template);
};

export const loadTemplate = (): TemplateName => {
  return (localStorage.getItem(TEMPLATE_KEY) as TemplateName) || "modern-minimal";
};
