import { ResumeData, TemplateName } from "@/utils/resumeTypes";
import ModernMinimal from "./templates/ModernMinimal";
import SidebarProfessional from "./templates/SidebarProfessional";
import CreativeAccent from "./templates/CreativeAccent";

interface Props {
  data: ResumeData;
  template: TemplateName;
}

const ResumePreview = ({ data, template }: Props) => {
  const TemplateComponent = {
    "modern-minimal": ModernMinimal,
    "sidebar-professional": SidebarProfessional,
    "creative-accent": CreativeAccent,
  }[template];

  return (
    <div className="resume-preview" id="resume-preview" style={{ width: "794px", minHeight: "1123px" }}>
      <TemplateComponent data={data} />
    </div>
  );
};

export default ResumePreview;
