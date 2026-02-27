import React from "react";

/**
 * Renders text with line breaks: splits by newline (\n) or <br>/<br/> and renders <br /> between segments.
 * Use for CMS content (heading, description, body) so admin-entered line breaks display correctly.
 */
const ContentText = ({ text, tag: Tag = "span", className, ...rest }) => {
  if (text == null || text === "") return null;
  const str = String(text);
  const segments = str.split(/\n|<br\s*\/?>/gi).filter((s) => s !== undefined);
  if (segments.length === 0) return null;
  if (segments.length === 1) return <Tag className={className} {...rest}>{segments[0]}</Tag>;
  return (
    <Tag className={className} {...rest}>
      {segments.map((segment, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {segment}
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default ContentText;
