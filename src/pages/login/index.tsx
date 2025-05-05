import React, { useState } from 'react'
import { Card, Container, ContainerIntegrations, Front, Title } from './styles'

import GoogleLoginButton from '../../components/google-login'

const Login: React.FC = () => {
  const [isRegistering,] = useState<boolean>(false);
  return (
    <Container>

      <Card flipped={isRegistering}>
        <Front>
          {/* <InputField placeholder="Email" />
          <InputField type="password" placeholder="Password" />
          <Button>Login</Button> */}
          <Title>
            <span>🛡️</span> FinanceSecure
          </Title>

          <ContainerIntegrations>
            <GoogleLoginButton />
          </ContainerIntegrations>

          {/* <SwitchText>
            Não tem uma conta? <a onClick={() => setIsRegistering(true)}>Crie uma</a>
          </SwitchText> */}
        </Front>
        {/* <Back>
          <InputField placeholder="Name" />
          <InputField placeholder="Email" />
          <InputField type="password" placeholder="Password" />
          <Button>Criar conta</Button>
          <SwitchText>
            Já tem uma conta?
            <a onClick={() => setIsRegistering(false)}>Login</a>
          </SwitchText>
        </Back> */}
      </Card>
    </Container>
  )
}

export default Login
