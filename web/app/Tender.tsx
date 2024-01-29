import { Tender } from "../types";
import { Fragment } from "react";

const chipClasses = `inline-block bg-blue-500 text-white px-2 py-1 rounded-full text-sm`;

function TenderDetails({ data }: { data: Tender }) {
  const { Title, ...details } = data;
  return (
    <table className="table-auto border rounded-md border-slate-600 border-separate border-spacing-2 w-11/12 mt-12">
      <tbody>
        <tr>
          <td colSpan={3}>
            <h1 className="text-2xl font-bold m-4">{Title}</h1>
          </td>
        </tr>

        {Object.keys(details).map((key) => {
          return Array.isArray(data[key]) ? (
            <Fragment key={key}>
              <tr key={key}>
                <td colSpan={2}>
                  <dt className="inline-flex items-center rounded-md px-2 py-1 text-md font-medium text-blue-200 ring-1 ring-inset ring-blue-200/20">
                    {key}
                  </dt>
                </td>
              </tr>

              {data[key].map((item: any, index: number) => {
                if (Object.keys(item)) {
                  return Object.keys(item).map((subkey) => {
                    return (
                      <tr key={subkey}>
                        <td className="w-1/12">{""}</td>
                        <td className="w-fit inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-blue-200 ring-1 ring-inset ring-blue-200/20 mr-2">
                          {subkey}
                        </td>
                        <td className="w-9/12">{item[subkey]}</td>
                      </tr>
                    );
                  });
                }
                <dd key={index}>{item.toString()}</dd>;
              })}
            </Fragment>
          ) : (
            <tr key={key}>
              <td className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-blue-200 ring-1 ring-inset ring-blue-200/20 mr-2">
                {key}
              </td>
              <td colSpan={2}>{data[key]}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TenderDetails;
