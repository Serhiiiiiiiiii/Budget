import {Container } from "react-bootstrap";

function Layout({ children }) {
  return (
    <div>
      <Container fluid className="p-0">
            <main>{children}</main>
      </Container>
    </div>
  );
}

export default Layout;
