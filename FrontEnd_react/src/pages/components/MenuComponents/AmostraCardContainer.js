import { Card, CardContent, Typography, Box } from '@mui/material';
import AmostraCardMenu from './AmostraCardMenu';

function AmostraCardContainer({ amostras = [] }) {
    return (
        <Box
            sx={{
                backgroundColor: 'white',
                padding: 2,
                borderRadius: 3,
                boxShadow: 5,
                width: '400px', // Mesmo tamanho do gráfico
                textAlign: 'center',
            }}
        >
            {/* Título */}
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                AMOSTRAS PRÓXIMAS A VENCER
            </Typography>

            {/* Lista de Mini Cards (Máximo de 3) */}
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
        </Box>
    );
}

export default AmostraCardContainer;
