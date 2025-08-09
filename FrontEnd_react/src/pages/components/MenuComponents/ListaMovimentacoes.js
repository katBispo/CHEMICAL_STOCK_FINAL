import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Chip, Divider, Button } from '@mui/material';

const movimentacoes = [
  { data: '05/03', tipo: 'Entrada', reagente: 'Ácido Clorídrico', quantidade: 20 },
  { data: '04/03', tipo: 'Saída', reagente: 'Hidróxido de Sódio', quantidade: 5 },
  { data: '03/03', tipo: 'Entrada', reagente: 'Sulfato de Cobre', quantidade: 10 },
  { data: '02/03', tipo: 'Saída', reagente: 'Ácido Sulfúrico', quantidade: 7 },
];

const ListaMovimentacoes = () => {
  const [filtro, setFiltro] = useState('todos');
  const movimentacoesFiltradas = filtro === 'todos'
    ? movimentacoes
    : movimentacoes.filter((mov) => mov.tipo.toLowerCase() === filtro);

  return (
    <Card sx={{ minWidth: 300, maxWidth: 400, p: 2, boxShadow: 3, borderRadius: 3, transition: 'box-shadow 0.3s ease', '&:hover': { boxShadow: 6 } }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Últimas Movimentações de Estoque
      </Typography>
      <Box sx={{ mb: 2, display: 'flex', gap: 1, justifyContent: 'center' }}>
        {['todos', 'entrada', 'saida'].map((tipo) => (
          <Button
            key={tipo}
            variant="outlined"
            onClick={() => setFiltro(tipo)}
            sx={{
              borderColor: '#4CAF50',
              color: '#4CAF50',
              borderRadius: '12px',
              textTransform: 'capitalize',
              '&:hover': { bgcolor: '#E8F5E9', borderColor: '#4CAF50' },
            }}
            aria-label={`Filtrar por ${tipo}`}
          >
            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
          </Button>
        ))}
      </Box>
      {movimentacoesFiltradas.map((mov, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <Card sx={{ display: 'flex', justifyContent: 'space-between', padding: 1, boxShadow: 2 }}>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                {mov.reagente}
              </Typography>
              <Typography variant="caption" sx={{ color: 'gray' }}>
                {mov.data}
              </Typography>
            </Box>
            <Chip
              label={`${mov.tipo} (+${mov.quantidade})`}
              color={mov.tipo === 'Entrada' ? 'success' : 'error'}
              size="small"
              sx={{
                backgroundColor: mov.tipo === 'Entrada' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)',
                color: mov.tipo === 'Entrada' ? '#4CAF50' : '#F44336',
                fontWeight: 'bold',
              }}
            />
          </Card>
          {index !== movimentacoesFiltradas.length - 1 && <Divider sx={{ mt: 1 }} />}
        </Box>
      ))}
    </Card>
  );
};

export default ListaMovimentacoes;  