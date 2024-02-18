import { Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Spinner } from "react-bootstrap";
import ResidentDetails from "./ResidentDetails";

const ResidentPage = () => {
  const params = useParams();
  return (
    <>
      <Tabs
        defaultActiveKey="details"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="details" title="Details">
          <ErrorBoundary
            fallback={<p>Something went wrong in Resident details...</p>}
          >
            <Suspense
              fallback={
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              }
            >
              <ResidentDetails />
            </Suspense>
          </ErrorBoundary>
        </Tab>
        <Tab eventKey="related" title="Related">
          Tab content for Related {params.residentId}
        </Tab>
      </Tabs>
    </>
  );
};

export default ResidentPage;
