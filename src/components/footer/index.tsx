import React from 'react'
import { useAppStore } from '../../store';
import { ContainerFooter } from './styles';

const Footer: React.FC = () => {
    const user = useAppStore((state) => state.user);

    if (!user) return null;

    return (
        <ContainerFooter>
            <span>© 2025 Meu Financeiro. Todos os direitos reservados.</span>
        </ContainerFooter>
    );
}

export default Footer
