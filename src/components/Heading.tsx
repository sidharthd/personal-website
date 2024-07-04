type HeadingProps = {
  children: string;
};

export const Heading = (props: HeadingProps) => {
  const { children } = props;
  return <h3 className="font-display">{children}</h3>;
};
