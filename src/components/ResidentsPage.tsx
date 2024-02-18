import { Card, Spinner } from "react-bootstrap";
import ResidentsTable from "./ResidentsTable";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

type Props = {};

const ResidentsPage = (props: Props) => {
  return (
    <>
      <Card>
        <Card.Header>Residents</Card.Header>
        <Card.Body>
          <ErrorBoundary
            fallback={<p>Something went wrong in fetching Residents...</p>}
          >
            <Suspense
              fallback={
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              }
            >
              <ResidentsTable />
            </Suspense>
          </ErrorBoundary>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </>
  );
};

export default ResidentsPage;
