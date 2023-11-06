import React, { useState } from 'react';
import styled from 'styled-components';


const ContForm = styled.div`
  width: 400px;
  margin: 0 auto;
  text-align: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const UserDataContainer = styled.div`
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
  margin-top: 20px;
  background-color: #f0f0f0;
  text-align: center;
`;

const UserDataField = styled.div`
  margin-bottom: 10px;
`;

const UserDataLabel = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;
const Image = styled.img`
width: 200px;
height: 200px;
border-radius: 16px;
padding:10px;
margin-right: 10px;
`;
const Campos = styled.div`
padding: 10px;
`;

const Entrada = styled.label`
padding: 5px;
`;
const Boton = styled.button`
background-color: #1bc2b7;
gap: px;
margin-left: 10px;
`;
export function DatosApi() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
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
        const responseData = await response.json();
        if (responseData.success) {
          setData(responseData.data);
        } else {
          setError(responseData.message);
        }
      } else {
        setError('Ocurrió un error al comunicarse con el servidor.');
      }
    } catch (error) {
      setError('Ocurrió un error al comunicarse con el servidor.');
    }
  };

  const handleSaveToLocalStorage = () => {
    if (data) {
      localStorage.setItem('userData', JSON.stringify(data));
      alert('Datos guardados en localStorage.');
    }
  };

  return (
    <div>
        <ContForm>
            <h1>Login Cliente</h1>
            <Campos>
                <Entrada>Email:</Entrada>
                <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </Campos>
            <Campos>
                <Entrada>Contraseña:</Entrada>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Campos>
      
            <Boton onClick={handleLogin}>Iniciar sesión</Boton>
            <Boton onClick={handleSaveToLocalStorage}>Guardar en localStorage</Boton>
      </ContForm>
      {data && (
         <UserDataContainer>
         <h2>Datos del usuario:</h2>
         <UserDataField>
           <UserDataLabel>Nombre:</UserDataLabel>
           {data.nombres}
         </UserDataField>
         <UserDataField>
           <UserDataLabel>Correo Electrónico:</UserDataLabel>
           {data.email}
         </UserDataField>
         <UserDataField>
           <UserDataLabel>Apellidos:</UserDataLabel>
           {data.apellidos}
         </UserDataField>
         <UserDataField>
           <UserDataLabel>Fecha de Nacimiento:</UserDataLabel>
           {data.fecha_nacimiento}
         </UserDataField>
         <UserDataField>
           <UserDataLabel>Foto de Perfil:</UserDataLabel>
           <Image src={data.foto_perfil} alt="Foto de perfil" />
         </UserDataField>
         <UserDataField>
           <UserDataLabel>Rol:</UserDataLabel>
           {data.rol}
         </UserDataField>
         <UserDataField>
           <UserDataLabel>Teléfono:</UserDataLabel>
           {data.telefono}
         </UserDataField>
         <UserDataField>
           <UserDataLabel>DNI:</UserDataLabel>
           {data.dni}
         </UserDataField>
         <UserDataField>
           <UserDataLabel>¿Es Mozo?</UserDataLabel>
           {data.is_mozo ? "Sí" : "No"}
         </UserDataField>
         <UserDataField>
           <UserDataLabel>Activo:</UserDataLabel>
           {data.active ? "Sí" : "No"}
         </UserDataField>
       </UserDataContainer>
      )}
      {error && <p>Error: {error}</p>}
    </div>
  );
}
