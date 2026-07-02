import { v4 as uuidv4 } from "uuid";
import Skeleton from "@mui/material/Skeleton";
interface IProps {
  role:
    | "teacher"
    | "student"
    | "admin"
    | "course"
    | "studentFromTeacher"
    | "department";
}

const TableSkeleton = ({ role }: IProps) => {
  const personsHead =
    role == "course"
      ? [
          { id: uuidv4(), text: "id" },
          { id: uuidv4(), text: "course name" },
          { id: uuidv4(), text: "created by" },
          { id: uuidv4(), text: "" },
        ]
      : role == "department"
        ? [
            { id: uuidv4(), text: "id" },
            { id: uuidv4(), text: "departmemt" },
            { id: uuidv4(), text: "" },
          ]
        : [
            { id: uuidv4(), text: "id" },
            { id: uuidv4(), text: "photo" },
            { id: uuidv4(), text: "name" },
            { id: uuidv4(), text: "email" },
            { id: uuidv4(), text: "" },
          ];

  return (
    <>
      {/* DESKTOP TABLE */}
      <div className="hidden md:block w-[75%] mt-7 overflow-hidden rounded-2xl border border-blue-100/60">
        <table className="w-full table-fixed bg-card">
          <thead className="h-10 bg-surface">
            <tr>
              {personsHead.map((item) => (
                <th key={item.id} className="px-3 capitalize text-muted">
                  <Skeleton />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }, (_, idx) => (
              <tr className="h-15" key={idx}>
                {personsHead.map((item) => (
                  <th key={item.id} className="px-3 capitalize text-muted">
                    <Skeleton />
                  </th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:hidden mt-7">
        {Array.from({ length: 5 }, (_, idx) => (
          <Skeleton key={idx} />
        ))}
      </div>

      {/* DELETE MODAL */}
    </>
  );
};

export default TableSkeleton;
