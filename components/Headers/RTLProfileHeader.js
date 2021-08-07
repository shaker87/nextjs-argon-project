
import React from "react";

// reactstrap components
import { Button, Container, Row, Col } from "reactstrap";

function ProfileHeader() {
  return (
    <>
      <div
        className="header pb-6 d-flex align-items-center"
        style={{
          minHeight: "500px",
          backgroundImage:
            'url("' + require("assets/img/theme/profile-cover.jpg") + '")',
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        <span className="mask bg-gradient-dark opacity-8" />

        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">مرحبا جيسي</h1>
              <p className="text-white mt-0 mb-5">
                هذه هي صفحة ملفك الشخصي. يمكنك رؤية التقدم الذي أحرزته في عملك
                وإدارة مشاريعك أو المهام المعينة
              </p>
              <Button
                className="btn-neutral"
                color="default"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                تعديل الملف الشخصي
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default ProfileHeader;
