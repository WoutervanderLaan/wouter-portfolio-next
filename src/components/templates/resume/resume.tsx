import List from "@/components/atoms/list/list";
import Text from "@/components/atoms/text/text";
import { PropsWithChildren } from "react";

type TResumeItem = {
  startDate?: number;
  endDate: number;
  name: string;
};

const ResumeCategory = ({
  header,
  children,
}: PropsWithChildren<{ header: string }>) => (
  <div className="flex flex-col gap-4">
    <Text.Paragraph>{header}:</Text.Paragraph>
    {children}
  </div>
);

const ResumeList = ({ items }: { items: Array<TResumeItem> }) => {
  const sortedByDate = items.toSorted((a, b) => b.endDate - a.endDate);

  return (
    <List className="flex flex-col gap-4 sm:gap-0">
      {sortedByDate.map((item, i) => (
        <List.Item
          key={`category_item_${i}`}
          className="flex flex-col sm:flex-row"
        >
          <div className="flex">
            <Text.Paragraph className="w-10">
              {item.startDate ?? item.endDate}
            </Text.Paragraph>

            {items.some((item) => item.startDate) && (
              <Text.Paragraph className="w-10">
                {item.startDate ? item.endDate : null}
              </Text.Paragraph>
            )}
          </div>

          <div className="flex flex-row gap-2 md:ml-4">
            <div className="my-2 h-1 w-1 rounded-full bg-black dark:bg-white sm:hidden" />
            <Text.Paragraph>{item.name}</Text.Paragraph>
          </div>
        </List.Item>
      ))}
    </List>
  );
};

const Resume = {
  Category: ResumeCategory,
  List: ResumeList,
};

export default Resume;
