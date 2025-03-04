import { Card, Typography, Box } from '@mui/material';
import { CalendarMonth, LocationOn } from '@mui/icons-material';

function AmostraCardMenu({ dataVencimento, nome, diasParaVencer, endereco }) {
    return (
        <Card sx={{ display: 'flex', alignItems: 'center', p: 1, mb: 1, borderRadius: 2, boxShadow: 2, bgcolor: '#F8F9FA', height: 60 }}>
            {/* Ícone e Data */}
            <Box sx={{ textAlign: 'center', p: 1, bgcolor: '#A5D6A7', borderRadius: 2, mr: 1, width: 50 }}>
                <CalendarMonth sx={{ fontSize: 18, color: 'white' }} />
                <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'white' }}>
                    {new Date(dataVencimento).getDate()}
                </Typography>
            </Box>

            {/* Conteúdo */}
            <Box sx={{ flex: 1, textAlign: "left" }}>  {/* Alinhando tudo à esquerda */}
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                    {nome}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                    Vence em <strong>{diasParaVencer} dias</strong>
                </Typography>

                {/* Endereço */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOn sx={{ fontSize: 14, color: '#757575', mr: 0.5 }} />
                    <Typography variant="caption" color="textSecondary">
                        {endereco}
                    </Typography>
                </Box>
            </Box>

        </Card>
    );
}

export default AmostraCardMenu;
