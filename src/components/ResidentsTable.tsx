import { Table } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useSWR from "swr";

type Props = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ResidentsTable = (props: Props) => {
  const { data } = useSWR(`/api/residents`, fetcher, { suspense: true });
  return (
    <>
      {data.length > 0 ? (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">Resident Name</th>
              <th scope="col">Birth Date</th>
              <th scope="col">Gender</th>
              <th scope="col">Nationality</th>
              <th scope="col">Street</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((resident: any) => {
                return (
                  <tr key={resident.id}>
                    <td>
                      <NavLink
                        to={`/residents/${resident.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {resident.firstName} {resident.middleName}{" "}
                        {resident.lastName} {resident.suffix}
                      </NavLink>
                    </td>
                    <td>{resident.birthDate}</td>
                    <td>{resident.gender}</td>
                    <td>{resident.nationality}</td>
                    <td>{resident.street}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      ) : (
        <p className="fw-bold text-center">No available residents</p>
      )}
    </>
  );
};

export default ResidentsTable;
