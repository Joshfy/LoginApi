import React, { useState } from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
`;

const SubmitButton = styled.button`
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticationError, setAuthenticationError] = useState(null);

  const handleLogin = async () => {
    try {
      // Realiza la autenticación utilizando la API y las credenciales email y password
      const response = await fetch('https://api-carta-virtual.planta-de-la-vida.com/api/loginCliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        // La solicitud fue exitosa, redirige al usuario a la ruta "datos" utilizando NavLink
        return (
            <DatosApi/>
        );
      } else {
        // La autenticación falló, muestra un mensaje de error
        setAuthenticationError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      // Ocurrió un error al comunicarse con el servidor, muestra un mensaje de error
      setAuthenticationError('Ocurrió un error al comunicarse con el servidor.');
    }
  };


  return (
    <LoginContainer>
      <Title>Login</Title>
      <Form>
        <Label>
          Email:
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Label>
        <Label>
          Password:
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Label>
        {authenticationError && <p style={{ color: 'red' }}>{authenticationError}</p>}
      </Form>
    </LoginContainer>
  );
};

export default Login;
