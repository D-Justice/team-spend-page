import { Row, Col } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import Container from "../../common/Container";

import {
  FooterSection,
  Para,
  Large,
  Chat,
  Language,
} from "./styles";

const Footer = ({ t }: { t: TFunction }) => {
  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Language>{t("Contact")}</Language>
              <Large to="/">{t("Tell us everything")}</Large>
              <Para>
                {t(`Do you have any question? Feel free to reach out.`)}
              </Para>
              <a href="mailto:justice.damian96@gmail.com">
                <Chat>{t(`Let's Chat`)}</Chat>
              </a>
            </Col>
          </Row>
        </Container>
      </FooterSection>
    </>
  );
};

export default withTranslation()(Footer);
