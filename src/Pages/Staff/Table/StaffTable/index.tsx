import { memo } from "react";
import { MoreHorizontal } from "Icons/MoreHorizontal";
import type { Propless } from "Types/React";
import "./styles.scss";

const Headers = [{ key: "name", label: "Name" }];

const Data = [
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
  {
    name: "Alex Figliolia",
    access: "Grand Jersey, Georgica",
    edit: <MoreHorizontal />,
  },
];

export const StaffTable = memo(
  function StaffTable(_: Propless) {
    return (
      <table className="staff-table">
        <thead>
          <tr>
            {Headers.map(({ key, label }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Data.map((data, i) => {
            return (
              <tr key={i}>
                {Headers.map(({ key }) => {
                  // @ts-ignore
                  return <td key={key}>{data[key]}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  },
  () => true,
);
