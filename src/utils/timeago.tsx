import ReactTimeago from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import englishStrings from "react-timeago/lib/language-strings/en";

export const formatter = buildFormatter(englishStrings);

export const TimeAgo = ({ date }: { date: string | number | Date }) => (
  <ReactTimeago date={date} formatter={formatter} />
);
