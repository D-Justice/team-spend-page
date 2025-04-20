import { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import axios from 'axios';
import { Row, Col, Input, Button, Typography, Spin, Alert, Card } from 'antd';

const { Title, Text } = Typography;

export default function LoginModule() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loadingSignUp, setLoadingSignUp] = useState(false);
    const [loadingLogIn, setLoadingLogIn] = useState(false);
    const [error, setError] = useState("");
    const [logInSuccessful, setLogInSuccessful] = useState(false);

    const handleSignUp = () => {
        if (!email || !password) {
            setError("Please provide both email and password.");
            return;
        }

        setLoadingSignUp(true);
        setError("");

        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const token = await user.getIdToken();
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setEmail("");
                setPassword("");
                setLoadingSignUp(false);
                window.location.href = "/dashboard"
            })
            .catch((error) => {
                setError(error.message);
                setLoadingSignUp(false);
            });
    };

    const handleLogIn = () => {
        if (!email || !password) {
            setError("Please provide both email and password.");
            return;
        }

        setLoadingLogIn(true);
        setError("");

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                const user = userCredential.user;
                const token = await user.getIdToken();
                axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                setLogInSuccessful(true);
                setEmail("");
                setPassword("");
                setLoadingLogIn(false);
                window.location.href = "/dashboard"
            })
            .catch((error) => {
                console.error("Error during log-in:", error.message);
                setError(error.message);
                setLoadingLogIn(false);
            });
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '70vh', backgroundColor: '#f0f2f5' }}>
            <Col xs={22} sm={16} md={12} lg={8}>
                <Card style={{ padding: '30px', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                    <Title level={3} style={{ textAlign: 'center', marginBottom: '24px' }}>
                        Track Costs Better with TeamSpend
                    </Title>

                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleLogIn();
                        }}
                    >
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            size="large"
                            style={{ marginBottom: '15px' }}
                        />
                        <Input.Password
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            size="large"
                            style={{ marginBottom: '15px' }}
                        />

                        {error && (
                            <Alert
                                message={error}
                                type="error"
                                showIcon
                                style={{ marginBottom: '15px' }}
                            />
                        )}

                        {logInSuccessful && (
                            <Alert
                                message="Logged in successfully!"
                                type="success"
                                showIcon
                                style={{ marginBottom: '15px' }}
                            />
                        )}

                        <Button
                            type="primary"
                            block
                            htmlType="submit"
                            disabled={loadingLogIn}
                            size="large"
                            style={{ marginBottom: '10px' }}
                        >
                            {loadingLogIn ? <Spin size="small" /> : "Log In"}
                        </Button>

                        <Button
                            block
                            onClick={handleSignUp}
                            disabled={loadingSignUp}
                            size="large"
                        >
                            {loadingSignUp ? <Spin size="small" /> : "Sign Up"}
                        </Button>
                    </form>
                </Card>
            </Col>
        </Row>

    );
}
