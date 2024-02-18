import React from "react";
import { useParams } from "react-router";
import useSWR from "swr";
import { ListGroup } from "react-bootstrap";

type Props = {};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ResidentDetails = (props: Props) => {
  const params = useParams();
  const { data } = useSWR(`/api/residents/${params.residentId}`, fetcher, {
    suspense: true,
  });

  return (
    <div>
      <ListGroup>
        <ListGroup.Item>
          First Name: <b>{data.firstName}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          Middle Name: <b>{data.middleName}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          Last Name: <b>{data.lastName}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          BirthDate: <b>{data.birthDate}</b>
        </ListGroup.Item>
        <ListGroup.Item>
          Gender: <b>{data.gender}</b>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default ResidentDetails;
