import { Row, Col, Typography, Card } from 'antd';
import SSO from '../SSO';

const { Title, Text } = Typography;

export default function LoginModule() {
    return (
        <Row justify="center" align="middle" style={{ minHeight: '70vh', backgroundColor: '#f0f2f5' }}>
            <Col xs={22} sm={16} md={12} lg={8}>
                <Card style={{ padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
                        Track Costs Better with TeamSpend
                    </Title>

                    <SSO />

                </Card>
            </Col>
        </Row>

    );
}
