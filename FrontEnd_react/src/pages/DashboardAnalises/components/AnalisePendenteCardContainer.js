import { Card, CardContent, Typography, Box, Button, Chip, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaFlask, FaLink } from 'react-icons/fa';

function AnalisePendenteCardContainer({ analisesPendentes = [] }) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        p: 2,
        borderRadius: 3,
        boxShadow: 2,
        width: '100%',
        maxWidth: '350px',
        maxHeight: '400px',
        textAlign: 'center',
        transition: 'box-shadow 0.3s ease, transform 0.2s ease',
        '&:hover': { boxShadow: 4, transform: 'scale(1.02)' },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto',
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
          Análises Pendentes de Vinculação
        </Typography>

        <Divider sx={{ mb: 1 }} />

        <CardContent sx={{ p: 1 }}>
          {analisesPendentes.length > 0 ? (
            analisesPendentes.slice(0, 4).map((analise, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  p: 1.5,
                  borderRadius: 2,
                  boxShadow: 1,
                  backgroundColor: '#f9fafb',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <FaFlask style={{ marginRight: 8, color: '#1976d2' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {analise.nome}
                  </Typography>
                </Box>

                <Chip
                  label={`${analise.qtdPendentes} amostra${analise.qtdPendentes > 1 ? 's' : ''} pendente${analise.qtdPendentes > 1 ? 's' : ''}`}
                  color={analise.qtdPendentes > 0 ? 'warning' : 'success'}
                  size="small"
                  sx={{ mb: 1 }}
                />

                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    backgroundColor: '#4CAF50',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': { backgroundColor: '#43a047' },
                  }}
                  startIcon={<FaLink />}
                  component={Link}
                  to={`/analises/${analise.id}/vincular`}
                >
                  Vincular Amostras
                </Button>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Nenhuma análise pendente de vinculação.
            </Typography>
          )}
        </CardContent>

        <Button
          variant="text"
          sx={{ mt: 1, color: '#1976d2', textTransform: 'none', fontWeight: 600 }}
          component={Link}
          to="/analises"
        >
          Ver Todas as Análises
        </Button>
      </Box>
    </Box>
  );
}

export default AnalisePendenteCardContainer;
