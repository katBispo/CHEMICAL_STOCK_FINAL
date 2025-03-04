import { Card, CardActionArea, CardContent, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Configurações de cor para os cards com fundo verde suave e sombra
const cardConfig = {
    reagentes: { bg: '#CEFE0BC', hover: '#C8E6C9' }, 
    amostrasAtrasadas: { bg: '#CEFE0BC', hover: '#C8E6C9' }, 
    reagentesVencidos: { bg: '#CEFE0BC', hover: '#C8E6C9' }, 
    amostrasProximas: { bg: '#CEFE0BC', hover: '#C8E6C9' }  
};

function InfoCard({ title, value, route, colorKey }) {
    const navigate = useNavigate();
    const { bg, hover } = cardConfig[colorKey] || cardConfig.reagentes;

    return (
        <Card 
            sx={{ 
                width: 160,  
                height: 120, 
                bgcolor: bg, 
                color: 'black', // Texto preto para contraste suave
                textAlign: 'center', 
                borderRadius: 2, 
                boxShadow: 3, // Sombra para profundidade
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: '0.3s',
                '&:hover': { 
                    transform: 'scale(1.05)', 
                    bgcolor: hover, 
                    boxShadow: 5 // Aumenta a sombra no hover
                }
            }}
        >
            <CardActionArea onClick={() => navigate(route)}>
                <CardContent sx={{ p: 1 }}>
                    <Box>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                            {title}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 1 }}>
                            {value}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default InfoCard;
