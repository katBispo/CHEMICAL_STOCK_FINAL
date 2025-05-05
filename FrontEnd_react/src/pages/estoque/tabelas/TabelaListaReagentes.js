// src/components/TabelaListaReagentes.jsx
import React from 'react';
import { Paper } from '@mui/material';

const TabelaListaReagentes = ({ reagentes }) => (
    <Paper
    elevation={3}
    sx={{
        overflowX: 'auto',
        borderRadius: '10px',
        width: '600px',           // ou defina uma largura fixa, ex: '600px'
        maxWidth: 800,
        margin: '0 auto',       // centraliza horizontalmente
    }}
>
    <table style={{ width: '100%' }}>
        <thead style={{ backgroundColor: '#4CAF50' }}>
            <tr>
                {['Nome', 'Tipo', 'Quantidade Frascos', 'Lote'].map((header) => (
                    <th
                        key={header}
                        style={{
                            color: '#fff',
                            padding: '12px 24px',
                            textAlign: 'left',
                            fontWeight: 'bold',
                        }}
                    >
                        {header}
                    </th>
                ))}
            </tr>
        </thead>
        <tbody>
            {reagentes.map((r) => (
                <tr
                    key={r.id}
                    style={{ transition: 'background-color 0.3s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
                >
                    <td style={{ padding: '12px 24px' }}>{r.nome}</td>
                    <td style={{ padding: '12px 24px' }}>{r.tipo}</td>
                    <td style={{ padding: '12px 24px' }}>{r.quantidadeDeFrascos}</td>
                    <td style={{ padding: '12px 24px' }}>{r.lote}</td>
                </tr>
            ))}
        </tbody>
    </table>
</Paper>

);

export default TabelaListaReagentes;
