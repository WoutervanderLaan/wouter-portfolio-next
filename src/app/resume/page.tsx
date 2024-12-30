import Text from "@/components/atoms/text/text";
import Resume from "@/components/templates/resume/resume";
import RESUME_ITEMS from "./resume-items";

const ResumePage = () => (
  <main className="flex flex-col mx-80 gap-10">
    <div>
      <Text.Paragraph>Wouter van der Laan (Huizen, NL, 1993)</Text.Paragraph>
      <Text.Paragraph>Lives and works in Amsterdam (NL)</Text.Paragraph>
    </div>

    {RESUME_ITEMS.map((list, index) => (
      <Resume.Category key={`category_${index}`} header={list.category}>
        <Resume.List items={list.items} />
      </Resume.Category>
    ))}
  </main>
);

export default ResumePage;
