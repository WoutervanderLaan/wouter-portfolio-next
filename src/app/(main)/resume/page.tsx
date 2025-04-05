import Text from "@/components/atoms/text/text";
import Resume from "@/components/templates/resume/resume";
import RESUME_ITEMS from "@/components/resume-items";

const ResumePage = () => (
  <main className="my-10 flex flex-col gap-10 md:mx-20 lg:mx-32 xl:mx-80">
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
