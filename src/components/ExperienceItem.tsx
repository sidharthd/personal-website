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
      <h4>{company}</h4>
      <p>{role}</p>
      <p>
        {startDate} - {endDate}
      </p>
    </>
  );
};
