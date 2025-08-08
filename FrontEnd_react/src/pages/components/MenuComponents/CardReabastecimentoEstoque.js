import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';

function CardReabastecimentoEstoque({ reagentes = [] }) {
  return (
    <Card
      sx={{
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 3,
        boxShadow: 3,
        width: { xs: '100%', sm: '400px' },
        textAlign: 'center',
        transition: 'box-shadow 0.3s ease',
        '&:hover': { boxShadow: 6 },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Reagentes com Estoque Baixo
      </Typography>
      <CardContent sx={{ p: 1 }}>
        {reagentes.length > 0 ? (
          reagentes
            .filter((reagente) => reagente.quantidade < reagente.limite)
            .map((reagente, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  p: 1,
                  mb: 1,
                  borderRadius: 2,
                  bgcolor: '#F9FAFB',
                  boxShadow: 2,
                  '&:hover': { bgcolor: '#F1F3F4', boxShadow: 4 },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <WarningIcon sx={{ color: '#EF5350', mr: 1 }} />
                  <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {reagente.nome}
                  </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary">
                  {reagente.quantidade}/{reagente.limite}
                </Typography>
              </Box>
            ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            Nenhum reagente com estoque baixo.
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ bgcolor: '#4CAF50', borderRadius: '12px', boxShadow: 2, '&:hover': { boxShadow: 4 }, mt: 2 }}
          startIcon={<AddCircleIcon />}
          component={Link}
          to="/reabastecer"
          aria-label="Reabastecer estoque"
        >
          Reabastecer Agora
        </Button>
      </CardContent>
    </Card>
  );
}

export default CardReabastecimentoEstoque;