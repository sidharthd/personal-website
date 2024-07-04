type ExperienceItemProps = {
  role: string;
  company: string;
  website?: string;
  startDate: string;
  endDate: string;
};

export const ExperienceItem = (props: ExperienceItemProps) => {
  const { role, company, startDate, endDate } = props;

  return (
    <>
      <p>{role}</p>
      <p className="font-display">{company}</p>
      <p>
        {startDate} - {endDate}
      </p>
    </>
  );
};
