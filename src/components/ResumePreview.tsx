import { ResumeData, TemplateName } from "@/utils/resumeTypes";
import ModernMinimal from "./templates/ModernMinimal";
import SidebarProfessional from "./templates/SidebarProfessional";
import CreativeAccent from "./templates/CreativeAccent";
import SimpleModel from "./templates/Crown";
import ClassicBordered from "./templates/ClassicBordered";
import CleanProfessional from "./templates/CleanProfessional";
import CorporateClassic from "./templates/CorporateClassic";
import ProfessionalDarkSidebar from "./templates/ProfessionalDarkSidebar";
import BlueCardProfessional from "./templates/BlueCardProfessional";
import MinimalistEngineer from "./templates/MinimalistEngineer";

interface Props {
  data: ResumeData;
  template: TemplateName;
}

const ResumePreview = ({ data, template }: Props) => {
  const TemplateComponent = {
    "modern-minimal": ModernMinimal,
    "sidebar-professional": SidebarProfessional,
    "creative-accent": CreativeAccent,
    "simple-accent": SimpleModel,
    "classic-bordered": ClassicBordered,
    "clean-professional": CleanProfessional,
    "corporate-classic": CorporateClassic,
    "professional-dark-sidebar": ProfessionalDarkSidebar,
    "blue-card-professional": BlueCardProfessional,
    "minimalist-engineer": MinimalistEngineer,
  }[template];

  return (
    <div className="resume-preview" id="resume-preview" style={{ width: "794px", minHeight: "1123px" }}>
      <TemplateComponent data={data} />
    </div>
  );
};

export default ResumePreview;
