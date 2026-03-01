import { ResumeData, defaultResumeData, TemplateName } from "./resumeTypes";

const STORAGE_KEY = "resume-builder-data";
const TEMPLATE_KEY = "resume-builder-template";

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
    if (stored) return JSON.parse(stored);
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
