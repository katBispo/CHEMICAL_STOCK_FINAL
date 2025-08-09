import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import AmostraCardMenu from './AmostraCardMenu';
import { Link } from 'react-router-dom';

function AmostraCardContainer({ amostras = [] }) {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        padding: 2, // Reduzido de 3 para 2
        borderRadius: 3,
        boxShadow: 2,
        width: '100%',
        maxWidth: '300px', // Reduzido de 400px para 300px
        maxHeight: '350px', // Adicionada altura máxima
        textAlign: 'center',
        transition: 'box-shadow 0.3s ease',
        '&:hover': { boxShadow: 4 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'auto', // Adicionado para evitar transbordo de conteúdo
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1, fontSize: '1rem' }}>
          Amostras Próximas a Vencer
        </Typography>
        <CardContent sx={{ p: 1 }}>
          {amostras.length > 0 ? (
            amostras.slice(0, 3).map((amostra, index) => (
              <AmostraCardMenu key={index} {...amostra} />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Nenhuma amostra próxima ao vencimento.
            </Typography>
          )}
        </CardContent>
        <Button
          variant="text"
          sx={{ mt: 1, color: '#4CAF50', textTransform: 'none', fontWeight: 600 }}
          component={Link}
          to="/amostras"
          aria-label="Ver todas as amostras"
        >
          Ver Todas as Amostras
        </Button>
      </Box>
    </Box>
  );
}

export default AmostraCardContainer;